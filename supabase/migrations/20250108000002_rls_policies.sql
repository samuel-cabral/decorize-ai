-- Habilita Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.projects enable row level security;

-- Policies para PROFILES
-- Usuários podem ver apenas seu próprio perfil
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Usuários podem atualizar apenas seu próprio perfil
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Policies para PROJECTS
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


