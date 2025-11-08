# Feature: Projetos Completos de Decoração

## Visão Geral

A feature de Projetos Completos permite aos usuários criar projetos de decoração com múltiplos ambientes, processamento paralelo de previews e visualização em galeria ou carousel.

## Arquitetura

### 1. Modelo de Dados

#### Tabelas

- **projects**: Projetos de decoração do usuário
  - `id`: UUID (PK)
  - `user_id`: UUID (FK → auth.users)
  - `name`: Nome do projeto
  - `place_type`: house | apartment
  - `status`: draft | processing | completed | error
  - `created_at`, `updated_at`: Timestamps

- **rooms**: Ambientes dentro de um projeto
  - `id`: UUID (PK)
  - `project_id`: UUID (FK → projects)
  - `room_type`: Tipo do ambiente (living_room, kitchen, etc)
  - `name`: Nome do ambiente
  - `original_image_url`: URL da imagem original
  - `styles`: Array de IDs de estilos selecionados
  - `status`: pending | processing | completed | error
  - `error_message`: Mensagem de erro (se houver)
  - `created_at`, `updated_at`: Timestamps

- **previews**: Resultados gerados para cada ambiente
  - `id`: UUID (PK)
  - `room_id`: UUID (FK → rooms)
  - `result_image_url`: URL da imagem resultado
  - `metadata`: JSON com metadados adicionais
  - `created_at`: Timestamp

#### Storage

- **room-images**: Bucket para armazenar imagens originais e resultados
  - Estrutura: `{user_id}/{project_id}/{room_id}/{filename}`
  - Políticas RLS para acesso restrito por usuário

### 2. Fluxo de Criação de Projeto

#### Passo 1: Tipo de Local
- Usuário escolhe entre Casa ou Apartamento
- Cada tipo tem lista diferente de ambientes disponíveis

#### Passo 2: Seleção de Ambientes
- Grid com cards para cada tipo de ambiente
- Seleção múltipla via checkboxes
- Ambientes variam conforme o tipo de local

#### Passo 3: Upload de Fotos
- Upload individual para cada ambiente selecionado
- Suporte para drag & drop
- Validação de formato e tamanho (máx 10MB)
- Preview da imagem antes do envio

#### Passo 4: Seleção de Estilos
- Para cada ambiente, selecionar estilos de decoração
- Suporte para múltiplos estilos por ambiente
- Visual feedback dos estilos selecionados

#### Passo 5: Processamento
- Criação do projeto no banco de dados
- Upload das imagens para Supabase Storage
- Processamento paralelo dos previews via API
- Atualizações em tempo real via Server-Sent Events (SSE)

### 3. Endpoints da API

#### Projetos

```typescript
POST /api/projects
- Cria novo projeto
- Body: { name, placeType, rooms: string[] }
- Retorna: { projectId }

GET /api/projects
- Lista projetos do usuário
- Retorna: { projects: Project[] }

GET /api/projects/[id]
- Busca projeto específico com rooms e previews
- Retorna: { project, rooms }

DELETE /api/projects/[id]
- Deleta projeto e todos os dados relacionados
```

#### Previews

```typescript
POST /api/previews/batch
- Processa preview de um ambiente
- FormData: projectId, roomId, image, styles
- Retorna: { roomId, originalImageUrl, resultImageUrl }
```

#### Atualizações em Tempo Real

```typescript
GET /api/projects/[id]/updates
- Server-Sent Events para updates de status dos rooms
- Polling a cada 2 segundos
- Retorna: stream de { rooms: Room[] }
```

### 4. Componentes Principais

#### ProjectWizard
- Stepper com 4 etapas
- Gerencia estado do fluxo de criação
- Validações em cada etapa

#### PlaceSelector
- Grid de cards para Casa vs Apartamento
- Visual feedback da seleção

#### RoomSelector
- Grid responsivo com ambientes disponíveis
- Toggle de seleção múltipla
- Ícones e descrições para cada tipo

#### BatchImageUpload
- Upload individual por ambiente
- Preview das imagens
- Drag & drop support

#### BatchStyleSelector
- Seleção de estilos por ambiente
- Grid de estilos com preview
- Contagem de selecionados

#### ProjectGallery
- Visualização em grid dos resultados
- Toggle entre original e resultado
- Status individual por ambiente
- Botões de download e zoom

#### ProjectCarousel
- Navegação horizontal pelos ambientes
- Thumbnails para navegação rápida
- Comparação lado a lado (original vs resultado)
- Controles de navegação

#### ProjectDashboard
- Lista de projetos do usuário
- Cards com informações resumidas
- Ações: visualizar, deletar
- Estados visuais (draft, processing, completed, error)

### 5. Features Técnicas

#### Processamento Paralelo
- Múltiplos previews processados simultaneamente
- Status individual por ambiente
- Retry automático em caso de falha (futuro)

#### Atualizações em Tempo Real
- Server-Sent Events (SSE)
- Atualização automática de status
- Feedback visual durante processamento

#### Upload de Imagens
- Supabase Storage para persistência
- URLs públicas para acesso
- Organização por usuário/projeto/room

#### Visualização
- **Modo Galeria**: Grid responsivo com cards
- **Modo Carousel**: Navegação horizontal
- Comparação antes/depois
- Download individual ou em batch

### 6. RLS (Row Level Security)

Todas as tabelas têm políticas RLS configuradas:

- **SELECT**: Usuário só vê seus próprios dados
- **INSERT**: Usuário só pode criar em seus projetos
- **UPDATE**: Usuário só pode atualizar seus dados
- **DELETE**: Usuário só pode deletar seus dados

Storage também usa políticas RLS para controlar acesso às imagens.

## Tipos de Local e Ambientes

### Casa
- Sala de Estar
- Sala de Jantar
- Cozinha
- Quarto Principal
- Quarto
- Banheiro
- Lavanderia
- Garagem
- Quintal
- Home Office

### Apartamento
- Sala de Estar
- Sala de Jantar
- Cozinha
- Quarto
- Banheiro
- Área de Serviço
- Varanda
- Home Office

## Próximos Passos

### Melhorias Futuras
1. Download em batch (ZIP) de todos os previews
2. Templates de projetos pré-configurados
3. Possibilidade de adicionar ambientes depois
4. Histórico de versões de previews
5. Compartilhamento de projetos
6. Exportação de relatório do projeto
7. Integração com redes sociais
8. Comparação entre diferentes estilos

### Otimizações
1. Cache de previews gerados
2. Compressão de imagens
3. Progressive loading
4. Lazy loading de componentes
5. Otimização de queries ao banco

