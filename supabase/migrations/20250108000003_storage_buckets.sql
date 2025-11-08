-- Cria buckets de storage para imagens
insert into storage.buckets (id, name, public)
values 
  ('original-images', 'original-images', true),
  ('generated-images', 'generated-images', true)
on conflict do nothing;

-- Policies para ORIGINAL IMAGES bucket
-- Usuários autenticados podem fazer upload de imagens originais
create policy "Authenticated users can upload original images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'original-images' and auth.uid()::text = (storage.foldername(name))[1]);

-- Qualquer pessoa pode ver imagens originais (bucket público)
create policy "Anyone can view original images"
  on storage.objects for select
  to public
  using (bucket_id = 'original-images');

-- Usuários podem deletar apenas suas próprias imagens originais
create policy "Users can delete own original images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'original-images' and auth.uid()::text = (storage.foldername(name))[1]);

-- Policies para GENERATED IMAGES bucket
-- Usuários autenticados podem fazer upload de imagens geradas
create policy "Authenticated users can upload generated images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'generated-images' and auth.uid()::text = (storage.foldername(name))[1]);

-- Qualquer pessoa pode ver imagens geradas (bucket público)
create policy "Anyone can view generated images"
  on storage.objects for select
  to public
  using (bucket_id = 'generated-images');

-- Usuários podem deletar apenas suas próprias imagens geradas
create policy "Users can delete own generated images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'generated-images' and auth.uid()::text = (storage.foldername(name))[1]);


