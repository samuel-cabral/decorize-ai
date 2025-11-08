# Análise do RoomSketch - Referência de Design para Decorize AI

## Fonte
[RoomSketch – Interior Design SaaS Web App no Dribbble](https://dribbble.com/shots/26523370-RoomSketch-Interior-Design-SaaS-Web-App)

**Designer:** Phenomenon Studio  
**Data de Análise:** 08/11/2025

---

## 📋 Visão Geral

O **RoomSketch** é uma aplicação web SaaS que transforma ambientes em designs de interiores completos usando IA. A plataforma permite upload de fotos, plantas baixas ou descrição textual para gerar layouts fotorrealísticos com móveis, iluminação e decoração personalizados.

---

## 🎨 Elementos de Design Identificados

### 1. Dashboard Principal

#### Componentes Principais:
- **Saudação Personalizada**: "Hello, [Nome]!" no topo
- **Barra de Busca**: Centralizada no header
- **Botão CTA Principal**: "New project" em destaque (verde escuro)
  
#### Quick Start Section:
Cards para ações principais:
1. **Build with AI** - Criar designs personalizados com IA
2. **Upload Floor Plan** - Upload de planta do ambiente
3. **Browse Templates** - Explorar templates e estilos de design
4. **Saved Objects** - Acessar móveis e decoração salvos
5. **Tutorials** - Aprender a usar a aplicação

#### Recent Projects:
- Grid de projetos com:
  - Thumbnail visual (foto ou planta)
  - Nome do projeto
  - Localização (cidade, estado)
  - Status visual claro
- Exemplos vistos: "Flat Redesign", "2BR Apartment Makeover", "Scandinavian Apartment", "Family Home Renovation"

#### AI Room Refiner (Destaque):
- Badge "New!" para feature recente
- Descrição: "AI-powered room design enhancement"
- CTA "Try now"
- Preview visual Before/After

#### Items You Love:
- Carrossel horizontal de produtos
- Filtros por categoria (Chairs, Boho, etc.)
- Ícones de favorito em cada item
- Link "View more"

#### Sidebar de Navegação:
- Logo "RoomSketch" no topo
- Navegação principal:
  - Home (ícone casa)
  - My Projects (ícone grid)
  - Templates (ícone documentos)
  - Favorites (ícone coração)
  - Assets (ícone banco de dados)
  - Trash (ícone lixeira)
  - Notifications (ícone sino)
- **Spaces** (seção especial):
  - "+ New" para adicionar
  - Lista de localizações (Brooklyn NY, Los Angeles CA, Austin TX, Denver CO)
- User profile no rodapé:
  - Avatar
  - Nome "Simona Green"
  - Link "Log out"

---

### 2. Interface de Geração com IA

#### Fluxo de Trabalho (Wizard):
**Stepper de 3 etapas:**
1. **Photo** - Upload da imagem do ambiente
2. **Basic Info** - Informações básicas sobre o projeto
3. **AI prompt** - Descrição detalhada do design desejado

#### Modal "Build interior with AI":
- Campo de texto grande para prompt detalhado
- Exemplo de prompt:
  ```
  Transform a realistic, lived-in contemporary living room into boho chic 
  interior design. L-shaped sofa covered with patterned throws and textured 
  pillows, a jute rug on the floor, macrame wall art, warm terracotta and 
  beige color palette, hanging plants and pampas grass in vases, rattan 
  side chair, low wooden table with vintage books and candles, fairy lights 
  or lanterns for soft lighting, cozy and lived-in, layered textiles, 
  photorealistic rendering, ultra-realistic lighting, cinematic mood, 
  extremely high resolution
  ```
- Preview da imagem gerada (render fotorrealístico de alta qualidade)
- Botões de ação: "Back", "Cancel", "Submit"

#### Modal "Export this file":
**File settings:**
- Formatos disponíveis: PDF, JPG, PNG, TIFF, WebP (radio buttons)
- Resoluções: 1920×1080, 3840×2160, Custom

**Overlay product tags on image:**
- ☑ Show clickable product markers
- ☐ Hide all markers

**Additional exports:**
- ☑ Include furniture list (.PDF)
- ☑ Include AI prompt used for generation (.TXT)
- ☑ Include visually similar alternatives in export pack

Botões: "Cancel", "Download Pack" (verde)

#### Modal "Share this file":
- Campo de email com chips para múltiplos destinatários
- Sugestões de contatos ("Ozzy Osborn", "Hugh Grant")
- Controle de permissões:
  - "View only" dropdown
  - "Only those invited"
  - "Anyone in Austin, TX" (6 people)
- Lista de pessoas com acesso (ex: "Simona Green (you) - owner")
- Botões: "Copy link", "Invite" (verde)

---

### 3. Before/After Comparison View

**Características (descritas no site, não totalmente visualizadas):**
- Slider interativo para comparação lado a lado
- Visualização em tela cheia
- Foco total no ambiente (sem distrações)
- Acesso rápido a ações: salvar, compartilhar, explorar móveis/decoração
- Comparação imersiva para tomada de decisão

---

### 4. Floor Plan View

**Características (descritas no site, não visualizadas em detalhe):**
- Mapa editável e intuitivo do layout
- Posicionamento visual de móveis e decoração
- Ajuste de posições em tempo real
- Highlights interativos e tooltips
- Indicações de dimensões
- Sugestões da IA para posicionamento ótimo
- Foco em estilo, fluxo e funcionalidade

---

### 5. Furniture & Decor Recommendations

**Características (descritas no site, não visualizadas em detalhe):**
- Recomendações alinhadas visualmente e estilisticamente
- Detalhes do produto
- Preços
- Links diretos para compra
- Comparação de estilos
- Opções dentro do orçamento
- Descoberta de novas marcas
- Integração com catálogos reais

---

## 🎨 Paleta de Cores

**Cores Principais (terrosas e naturais):**
- `#1A120D` - Marrom escuro muito profundo (quase preto)
- `#4C301C` - Marrom chocolate
- `#685741` - Marrom acinzentado médio
- `#916E4A` - Marrom caramelo
- `#778573` - Verde-acinzentado (sage)
- `#B2AF9B` - Bege esverdeado
- `#F9F9F7` - Off-white/creme claro
- `#A98E6A` - Bege dourado

**Cor de Destaque:**
- Verde escuro (similar ao #2D5016) para CTAs e elementos interativos

---

## ✨ Funcionalidades Principais do RoomSketch

1. ✨ **Geração com IA** - A partir de foto, planta ou prompt de texto
2. ✨ **Seletor de Estilos** - Múltiplos temas de interior (Scandinavian, Modern, Boho, Japandi)
3. ✨ **Renders Fotorrealísticos** - Alta resolução
4. ✨ **Layouts Editáveis** - Trocar elementos ou regenerar seções
5. ✨ **Posicionamento Automático** - Móveis e decoração de catálogos reais
6. ✨ **Slider Before/After** - Comparação interativa
7. ✨ **Save & Share** - Boards de design
8. ✨ **Download** - Renders em alta resolução ou modelos 3D
9. ✨ **Product Links** - Sugestões de compra integradas

---

## 🔍 Comparação com Decorize AI (Estado Atual)

### ✅ Já Implementado no Decorize AI:
- Upload de imagem
- Seleção de estilos de decoração
- Geração de preview com IA
- Loading state durante processamento
- Visualização do resultado
- Download de imagem

### 🆕 Oportunidades de Melhoria Inspiradas no RoomSketch:

#### 1. **Dashboard & Navegação**
- Adicionar dashboard com projetos recentes
- Sidebar de navegação com seções organizadas
- Sistema de "Spaces" para organizar por localização/cômodo
- Quick start cards para guiar o usuário

#### 2. **Experiência do Usuário**
- Saudação personalizada após login
- Tutorial/onboarding para novos usuários
- Sistema de favoritos para estilos/resultados
- Histórico de projetos com thumbnails

#### 3. **Geração com IA - Aprimoramentos**
- Wizard de 3 etapas mais estruturado
- Campo de prompt customizável (text-to-image)
- Upload de planta baixa (além de foto)
- Preview em tempo real durante edição

#### 4. **Exportação & Compartilhamento**
- Múltiplos formatos de export (não só download)
- Opções de resolução personalizadas
- Sistema de compartilhamento com controle de permissões
- Export pack com extras (lista de móveis, prompt usado, alternativas)

#### 5. **Visualização de Resultados**
- Slider Before/After interativo
- Visualização em tela cheia
- Comparação lado a lado
- Zoom para detalhes

#### 6. **Recursos Avançados (Futuro)**
- Floor plan view editável
- Recomendações de móveis e decoração
- Links para compra de produtos
- Sistema de "Assets" para reutilizar elementos
- Modelos 3D downloadable

---

## 💡 Recomendações de Implementação por Prioridade

### 🔴 **Prioridade Alta** (MVP Imediato)
1. **Sistema de Autenticação** (Supabase Auth)
   - Login/Signup
   - Perfil de usuário
   - Saudação personalizada

2. **Banco de Dados** (Supabase)
   - Salvar histórico de decorações geradas
   - Tabela de usuários (profiles)
   - Tabela de projects/decorations
   - Storage para imagens (original + resultado)

3. **Página de Histórico/Dashboard**
   - Lista de projetos anteriores
   - Thumbnails visuais
   - Data de criação
   - Re-download de resultados

4. **Slider Before/After**
   - Componente interativo para comparar original vs resultado
   - Visualização em tela cheia

### 🟡 **Prioridade Média** (Próximas Iterações)
1. **Sistema de Favoritos**
   - Marcar estilos favoritos
   - Salvar decorações preferidas
   - Seção "My Favorites"

2. **Compartilhamento**
   - Gerar link público para resultado
   - Compartilhar via redes sociais
   - Opções de privacidade

3. **Múltiplos Formatos de Export**
   - PDF, PNG, JPG
   - Opções de resolução

4. **Prompt Customizável**
   - Campo opcional para descrever preferências
   - Combinar estilos selecionados + texto livre

### 🟢 **Prioridade Baixa** (Funcionalidades Avançadas)
1. **Floor Plan Support**
   - Upload de plantas baixas
   - Geração a partir de layout 2D

2. **Product Recommendations**
   - Integração com catálogos de móveis
   - Links de compra

3. **Spaces & Organization**
   - Organizar por localização/cômodo
   - Tags e categorias

4. **3D Models**
   - Export de modelos 3D
   - Visualização interativa

---

## 📐 Arquitetura de Dados Sugerida (Supabase)

### Tabela: `profiles`
```sql
- id (uuid, FK para auth.users)
- full_name (text)
- avatar_url (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### Tabela: `projects`
```sql
- id (uuid, PK)
- user_id (uuid, FK para profiles)
- name (text)
- description (text, nullable)
- location (text, nullable) // Ex: "Brooklyn, NY"
- original_image_url (text)
- result_image_url (text)
- selected_styles (text[])
- ai_prompt (text, nullable)
- is_favorite (boolean, default false)
- status (text) // 'processing', 'completed', 'failed'
- created_at (timestamp)
- updated_at (timestamp)
```

### Storage Buckets:
- `original-images/` - Imagens originais enviadas pelos usuários
- `generated-images/` - Resultados gerados pela IA

### Tabela: `favorites` (futura)
```sql
- id (uuid, PK)
- user_id (uuid, FK para profiles)
- project_id (uuid, FK para projects)
- created_at (timestamp)
```

---

## 🎯 Conclusão

O **RoomSketch** oferece uma experiência completa e profissional para design de interiores com IA. Os principais diferenciais são:

1. **Dashboard organizado** com acesso rápido a todas as funcionalidades
2. **Fluxo de trabalho estruturado** em etapas claras
3. **Múltiplas formas de input** (foto, planta, texto)
4. **Visualização rica** com comparação Before/After
5. **Compartilhamento e colaboração** facilitados
6. **Exportação profissional** com múltiplos formatos e extras

Para o **Decorize AI**, o foco inicial deve ser em:
- ✅ Implementar autenticação e banco de dados (Supabase)
- ✅ Criar dashboard com histórico de projetos
- ✅ Adicionar comparação Before/After interativa
- ✅ Melhorar a experiência de exportação

Com essas melhorias, o Decorize AI terá uma base sólida para competir no mercado de SaaS de design de interiores com IA.

