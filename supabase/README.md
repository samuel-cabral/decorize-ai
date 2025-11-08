# Supabase Migrations

Este diretório contém as migrations do banco de dados para o Decorize AI.

## Como aplicar as migrations

### 1. No Supabase Dashboard (Recomendado para desenvolvimento)

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **SQL Editor**
3. Clique em **New query**
4. Copie e cole o conteúdo de cada arquivo na ordem:
   - `20250108000001_initial_schema.sql`
   - `20250108000002_rls_policies.sql`
   - `20250108000003_storage_buckets.sql`
5. Clique em **Run** para executar cada migration

### 2. Via Supabase CLI (Para produção)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login no Supabase
supabase login

# Link com seu projeto
supabase link --project-ref seu-project-ref

# Aplicar migrations
supabase db push
```

## Estrutura do Banco de Dados

### Tabelas

#### `profiles`
Perfis de usuários (estende `auth.users`)
- `id` (uuid, PK) - ID do usuário (referência para auth.users)
- `full_name` (text) - Nome completo
- `avatar_url` (text) - URL do avatar
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `projects`
Projetos de decoração gerados
- `id` (uuid, PK)
- `user_id` (uuid, FK) - ID do usuário
- `name` (text) - Nome do projeto
- `description` (text) - Descrição opcional
- `location` (text) - Localização (ex: "Brooklyn, NY")
- `original_image_url` (text) - URL da imagem original
- `result_image_url` (text) - URL da imagem gerada
- `selected_styles` (text[]) - Estilos selecionados
- `ai_prompt` (text) - Prompt usado na geração
- `is_favorite` (boolean) - Marcado como favorito
- `status` (text) - Status: pending, processing, completed, failed
- `error_message` (text) - Mensagem de erro (se houver)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Storage Buckets

#### `original-images`
Armazena as imagens originais enviadas pelos usuários
- Público para leitura
- Apenas usuários autenticados podem fazer upload
- Usuários só podem deletar suas próprias imagens

#### `generated-images`
Armazena as imagens geradas pela IA
- Público para leitura
- Apenas usuários autenticados podem fazer upload
- Usuários só podem deletar suas próprias imagens

### Row Level Security (RLS)

Todas as tabelas têm RLS habilitado para garantir que:
- Usuários só podem ver seus próprios dados
- Usuários só podem modificar seus próprios dados
- Sem acesso não autorizado a dados de outros usuários

### Triggers Automáticos

- **Criação automática de profile**: Quando um usuário se registra, um profile é criado automaticamente
- **Atualização de timestamps**: Campos `updated_at` são atualizados automaticamente


