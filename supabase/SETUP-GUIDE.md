# 🚀 Guia de Setup do Supabase - Decorize AI

## 📋 Passo a Passo Completo

### 1️⃣ Acesse o Supabase Dashboard

1. Vá para [https://supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Selecione ou crie um novo projeto

---

### 2️⃣ Execute o SQL no SQL Editor

1. No menu lateral, clique em **SQL Editor**
2. Clique em **New query**
3. Abra o arquivo `supabase/setup-complete.sql` deste projeto
4. **Copie TODO o conteúdo** do arquivo
5. **Cole no SQL Editor**
6. Clique em **Run** (ou pressione `Ctrl+Enter` / `Cmd+Enter`)

⏱️ A execução deve levar alguns segundos e você verá uma mensagem de sucesso.

---

### 3️⃣ Copie as Credenciais do Projeto

1. No menu lateral, vá em **Settings** → **API**
2. Você verá as seguintes informações:

#### Project URL
```
https://seu-projeto-id.supabase.co
```

#### Project API keys

**anon / public** (chave pública - pode ser exposta no frontend)
```
eyJhbGc...
```

**service_role** (chave privada - NUNCA exponha no frontend!)
```
eyJhbGc...
```

---

### 4️⃣ Configure as Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env.local`
2. Cole este template e preencha com suas credenciais:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui

# Google Gemini API (se já tiver)
GEMINI_API_KEY=sua_chave_gemini_aqui
```

3. **Salve o arquivo**

⚠️ **IMPORTANTE**: O arquivo `.env.local` NÃO deve ser commitado no git (já está no `.gitignore`)

---

### 5️⃣ Verifique se Funcionou

#### Opção A: No Supabase Dashboard

1. Vá em **Table Editor**
2. Você deve ver duas tabelas:
   - ✅ `profiles`
   - ✅ `projects`

3. Vá em **Storage**
4. Você deve ver dois buckets:
   - ✅ `original-images`
   - ✅ `generated-images`

#### Opção B: No SQL Editor

Execute este query para verificar:

```sql
-- Verificar tabelas
select table_name 
from information_schema.tables 
where table_schema = 'public';

-- Verificar storage buckets
select * from storage.buckets;
```

---

### 6️⃣ Teste a Aplicação

1. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

2. Acesse [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)

3. Crie uma conta de teste

4. Verifique no Supabase Dashboard:
   - Vá em **Authentication** → **Users**
   - Seu usuário deve estar lá
   - Vá em **Table Editor** → **profiles**
   - Um perfil deve ter sido criado automaticamente!

---

## ✅ Checklist de Verificação

Marque conforme completa:

- [ ] SQL executado com sucesso no SQL Editor
- [ ] Tabelas `profiles` e `projects` criadas
- [ ] Buckets `original-images` e `generated-images` criados
- [ ] Arquivo `.env.local` criado e configurado
- [ ] Servidor de desenvolvimento funcionando
- [ ] Consegui criar uma conta
- [ ] Profile foi criado automaticamente

---

## 🔍 Estrutura Criada

### Tabelas

#### `public.profiles`
- Perfis de usuários
- Criado automaticamente via trigger quando usuário se registra
- Campos: id, full_name, avatar_url, created_at, updated_at

#### `public.projects`
- Projetos de decoração
- Campos: id, user_id, name, description, location, original_image_url, result_image_url, selected_styles, ai_prompt, is_favorite, status, error_message, created_at, updated_at

### Storage Buckets

#### `original-images`
- Imagens originais enviadas pelos usuários
- Público para leitura
- Limite: 50MB por arquivo
- Tipos permitidos: JPEG, PNG, WebP

#### `generated-images`
- Imagens geradas pela IA
- Público para leitura
- Limite: 50MB por arquivo
- Tipos permitidos: JPEG, PNG, WebP

### Segurança (RLS)

✅ Row Level Security habilitado em todas as tabelas
✅ Usuários só podem ver/editar seus próprios dados
✅ Policies configuradas para storage (upload, visualização, deleção)

---

## 🚨 Troubleshooting

### Erro: "relation already exists"

Isso significa que já existem tabelas com esses nomes. O script `setup-complete.sql` já tem comandos `DROP TABLE` no início para limpar tudo.

### Erro: "permission denied"

Certifique-se de que está usando uma conta de admin no Supabase.

### Usuário criado mas profile não foi criado

1. Vá no SQL Editor
2. Execute:
```sql
-- Verificar se o trigger existe
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
```

Se não aparecer nada, execute novamente a parte do trigger do `setup-complete.sql`.

### Não consigo fazer upload de imagens

Verifique se:
1. Os buckets foram criados
2. As policies de storage foram aplicadas
3. O tipo de arquivo é permitido (JPEG, PNG, WebP)

---

## 📞 Precisa de Ajuda?

Se encontrar algum problema:
1. Verifique os logs do Supabase Dashboard
2. Verifique o console do navegador (F12)
3. Verifique os logs do Next.js no terminal

---

## 🎉 Pronto!

Agora você tem um banco de dados Supabase totalmente configurado para o Decorize AI! 🚀

