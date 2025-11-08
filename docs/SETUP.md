# Guia de Configuração - Decorize AI

## Pré-requisitos

- Node.js 18+ 
- npm, pnpm ou yarn
- Conta no Google AI Studio (para API de geração de imagens)
- Conta no Supabase

## 1. Configurar Projeto Supabase

### 1.1. Criar Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova organização (se necessário)
3. Crie um novo projeto
   - Nome do projeto: `decorize-ai` (ou outro nome)
   - Database Password: **salve essa senha**
   - Região: escolha a mais próxima

### 1.2. Executar Migrations

1. No painel do Supabase, vá em **SQL Editor**
2. Execute os seguintes scripts na ordem:

**Script 1: Schema Inicial**
- Copie o conteúdo de `supabase/migrations/20240101000000_initial_schema.sql`
- Cole no SQL Editor e execute

**Script 2: Storage Setup**
- Copie o conteúdo de `supabase/migrations/20240101000001_storage_setup.sql`
- Cole no SQL Editor e execute

### 1.3. Verificar Configuração

1. Vá em **Table Editor** e verifique se as tabelas foram criadas:
   - `projects`
   - `rooms`
   - `previews`

2. Vá em **Storage** e verifique se o bucket foi criado:
   - `room-images`

3. Vá em **Authentication** > **Providers** e ative:
   - Email (deve estar ativo por padrão)

### 1.4. Obter Credenciais

1. Vá em **Settings** > **API**
2. Copie:
   - **Project URL** (será `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (será `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 2. Configurar Google AI Studio

### 2.1. Obter API Key

1. Acesse [aistudio.google.com](https://aistudio.google.com/)
2. Faça login com sua conta Google
3. No painel de navegação à esquerda, clique em **"Get API Key"**
4. Crie uma nova chave de API associada a um projeto do Google Cloud
5. **⚠️ Importante:** O uso da API requer ativação de cobrança no projeto Google Cloud
6. Copie sua API key

## 3. Configurar Variáveis de Ambiente

### 3.1. Criar arquivo .env.local

Na raiz do projeto, crie o arquivo `.env.local`:

```bash
cp .env.example .env.local
```

### 3.2. Adicionar Credenciais

Edite `.env.local` e adicione suas credenciais:

```env
# Google AI Studio API Key
GOOGLE_API_KEY=sua_chave_api_do_google_aqui

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

## 4. Instalar Dependências

```bash
pnpm install
# ou
npm install
# ou
yarn install
```

## 5. Executar em Desenvolvimento

```bash
pnpm dev
# ou
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

## 6. Fluxo de Uso

### 6.1. Criar Conta

1. Acesse http://localhost:3000
2. Será redirecionado para `/projects`
3. Clique em **"Criar Conta"**
4. Preencha email e senha (mínimo 6 caracteres)
5. Faça login

### 6.2. Criar Primeiro Projeto

1. Na página de projetos, clique em **"Novo Projeto"**
2. Siga o wizard:
   - **Passo 1**: Nome do projeto e tipo de local (Casa/Apartamento)
   - **Passo 2**: Selecione os ambientes que deseja decorar
   - **Passo 3**: Faça upload das fotos dos ambientes
   - **Passo 4**: Selecione estilos de decoração para cada ambiente
3. Clique em **"Gerar Previews"**
4. Aguarde o processamento (pode levar 10-30s por ambiente)

### 6.3. Visualizar Resultados

1. Você será redirecionado para a página do projeto
2. Acompanhe o progresso em tempo real
3. Alterne entre visualização **Galeria** e **Carousel**
4. Compare original vs resultado
5. Faça download dos previews

## 7. Estrutura de Rotas

- `/` → Redireciona para `/projects`
- `/auth/login` → Login
- `/auth/signup` → Criar conta
- `/auth/callback` → Callback de autenticação
- `/projects` → Dashboard de projetos
- `/projects/new` → Criar novo projeto
- `/projects/[id]` → Visualizar projeto
- `/demo` → Demo do fluxo antigo (1 preview por vez)

## 8. Troubleshooting

### Erro: "Não autenticado"
- Verifique se fez login
- Limpe cookies e tente novamente
- Verifique as variáveis de ambiente do Supabase

### Erro: "API key não configurada"
- Verifique se `GOOGLE_API_KEY` está no `.env.local`
- Reinicie o servidor de desenvolvimento

### Erro: "Erro ao fazer upload"
- Verifique se o bucket `room-images` existe no Supabase
- Verifique as políticas RLS do storage
- Certifique-se que o arquivo tem no máximo 10MB

### Erro: "Erro ao gerar preview"
- Verifique se a API Key do Google está válida
- Verifique se o billing está ativo no Google Cloud
- Tente com uma imagem menor

### Previews não atualizam
- Verifique se o SSE está funcionando (console do navegador)
- Recarregue a página
- Verifique se o projeto/room existe no banco

## 9. Deploy em Produção

### 9.1. Vercel (Recomendado)

1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente:
   - `GOOGLE_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy!

### 9.2. Outras Plataformas

Certifique-se de:
- Configurar variáveis de ambiente
- Habilitar Server-Side Rendering (SSR)
- Configurar domínio personalizado (se necessário)
- Atualizar URLs permitidas no Supabase Auth

## 10. Limites e Considerações

### Google AI Studio
- Rate limits da API (varia por plano)
- Custo por geração de imagem
- Tempo de processamento: 10-30s por preview

### Supabase
- Free tier: 500MB storage, 50k auth users
- Limites de largura de banda
- Limites de requisições por segundo

### Performance
- Upload de imagens grandes pode ser lento
- Processamento paralelo consome mais recursos
- SSE mantém conexões abertas (use com moderação)

## 11. Suporte

Para problemas ou dúvidas:
1. Verifique a documentação em `/docs`
2. Revise os logs do console
3. Verifique o status do Supabase
4. Verifique o status da Google AI API

