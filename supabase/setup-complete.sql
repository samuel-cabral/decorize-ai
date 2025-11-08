-- ============================================================================
-- DECORIZE AI - SETUP COMPLETO DO BANCO DE DADOS
-- ============================================================================
-- Execute este script no SQL Editor do Supabase Dashboard
-- Ele irá criar todas as tabelas, policies, triggers e storage buckets
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. EXTENSÕES
-- ----------------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 2. REMOVER TABELAS E FUNCTIONS ANTIGAS (SE EXISTIREM)
-- ----------------------------------------------------------------------------
-- IMPORTANTE: Isso irá deletar TODOS os dados existentes!
-- Remova este bloco se quiser preservar dados

drop table if exists public.projects cascade;
drop table if exists public.profiles cascade;
drop function if exists public.handle_updated_at() cascade;
drop function if exists public.handle_new_user() cascade;

-- ----------------------------------------------------------------------------
-- 3. CRIAR TABELAS
-- ----------------------------------------------------------------------------

-- Tabela de profiles (estende auth.users do Supabase)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.profiles is 'Perfis de usuários que estendem auth.users';

-- Tabela de projects (decorações geradas)
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  location text,
  original_image_url text not null,
  result_image_url text,
  selected_styles text[] not null default '{}',
  ai_prompt text,
  is_favorite boolean default false,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.projects is 'Projetos de decoração gerados pelos usuários';
comment on column public.projects.status is 'Status do projeto: pending, processing, completed, failed';
comment on column public.projects.selected_styles is 'Array de estilos selecionados pelo usuário';

-- ----------------------------------------------------------------------------
-- 4. CRIAR ÍNDICES
-- ----------------------------------------------------------------------------

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists projects_status_idx on public.projects(status);
create index if not exists projects_created_at_idx on public.projects(created_at desc);
create index if not exists projects_is_favorite_idx on public.projects(is_favorite) where is_favorite = true;

-- ----------------------------------------------------------------------------
-- 5. CRIAR FUNCTIONS E TRIGGERS
-- ----------------------------------------------------------------------------

-- Função para atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para profiles
drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();

-- Trigger para projects
drop trigger if exists on_projects_updated on public.projects;
create trigger on_projects_updated
  before update on public.projects
  for each row
  execute procedure public.handle_updated_at();

-- Função para criar profile automaticamente quando um usuário se registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para criar profile automaticamente
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 6. HABILITAR ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.projects enable row level security;

-- ----------------------------------------------------------------------------
-- 7. CRIAR POLICIES PARA PROFILES
-- ----------------------------------------------------------------------------

-- Remover policies antigas se existirem
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

-- Usuários podem ver apenas seu próprio perfil
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Usuários podem atualizar apenas seu próprio perfil
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- 8. CRIAR POLICIES PARA PROJECTS
-- ----------------------------------------------------------------------------

-- Remover policies antigas se existirem
drop policy if exists "Users can view own projects" on public.projects;
drop policy if exists "Users can create own projects" on public.projects;
drop policy if exists "Users can update own projects" on public.projects;
drop policy if exists "Users can delete own projects" on public.projects;

-- Usuários podem ver apenas seus próprios projetos
create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

-- Usuários podem criar seus próprios projetos
create policy "Users can create own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

-- Usuários podem atualizar apenas seus próprios projetos
create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

-- Usuários podem deletar apenas seus próprios projetos
create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 9. CONFIGURAR STORAGE BUCKETS
-- ----------------------------------------------------------------------------

-- Remover buckets antigos se existirem
delete from storage.buckets where id in ('original-images', 'generated-images');

-- Criar buckets de storage para imagens
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values 
  ('original-images', 'original-images', true, 52428800, array['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
  ('generated-images', 'generated-images', true, 52428800, array['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ----------------------------------------------------------------------------
-- 10. POLICIES PARA STORAGE - ORIGINAL IMAGES
-- ----------------------------------------------------------------------------

-- Remover policies antigas
drop policy if exists "Authenticated users can upload original images" on storage.objects;
drop policy if exists "Anyone can view original images" on storage.objects;
drop policy if exists "Users can delete own original images" on storage.objects;

-- Usuários autenticados podem fazer upload de imagens originais
create policy "Authenticated users can upload original images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'original-images' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Qualquer pessoa pode ver imagens originais (bucket público)
create policy "Anyone can view original images"
  on storage.objects for select
  to public
  using (bucket_id = 'original-images');

-- Usuários podem deletar apenas suas próprias imagens originais
create policy "Users can delete own original images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'original-images' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ----------------------------------------------------------------------------
-- 11. POLICIES PARA STORAGE - GENERATED IMAGES
-- ----------------------------------------------------------------------------

-- Remover policies antigas
drop policy if exists "Authenticated users can upload generated images" on storage.objects;
drop policy if exists "Anyone can view generated images" on storage.objects;
drop policy if exists "Users can delete own generated images" on storage.objects;

-- Usuários autenticados podem fazer upload de imagens geradas
create policy "Authenticated users can upload generated images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'generated-images' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Qualquer pessoa pode ver imagens geradas (bucket público)
create policy "Anyone can view generated images"
  on storage.objects for select
  to public
  using (bucket_id = 'generated-images');

-- Usuários podem deletar apenas suas próprias imagens geradas
create policy "Users can delete own generated images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'generated-images' 
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================================
-- SETUP COMPLETO! 
-- ============================================================================
-- 
-- ✅ Tabelas criadas: profiles, projects
-- ✅ RLS habilitado e configurado
-- ✅ Triggers automáticos configurados
-- ✅ Storage buckets criados: original-images, generated-images
-- ✅ Políticas de segurança aplicadas
--
-- Próximos passos:
-- 1. Copie as credenciais do Supabase para seu .env.local
-- 2. Teste criando um usuário no /auth/signup
-- 3. Verifique se o profile foi criado automaticamente
-- ============================================================================

