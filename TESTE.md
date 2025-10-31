# Guia de Teste - Decorize AI

## Passo 1: Configurar API Key do Google AI Studio

1. **Obter API Key:**
   - Acesse: https://aistudio.google.com/
   - Faça login com sua conta Google
   - No painel de navegação à esquerda, clique em "Get API Key"
   - Crie uma nova chave de API associada a um projeto do Google Cloud
   - ⚠️ **Importante:** O uso da API requer ativação de cobrança no projeto Google Cloud
   - Copie sua API key

2. **Criar arquivo .env.local:**
   ```bash
   cp .env.example .env.local
   ```

3. **Editar .env.local e adicionar sua chave:**
   ```bash
   # Abra o arquivo .env.local e substitua "your_google_api_key_here" pela sua chave
   GOOGLE_API_KEY=sua_chave_api_aqui
   ```

## Passo 2: Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor iniciará em: http://localhost:3000

## Passo 3: Testar a Aplicação

### Fluxo de Teste:

1. **Acesse a aplicação:**
   - Abra http://localhost:3000 no navegador

2. **Upload de Imagem:**
   - Clique na área de upload ou arraste uma imagem
   - Use uma foto de um ambiente interno (sala, quarto, cozinha, etc.)
   - Formatos aceitos: JPG, PNG, WebP (máx. 10MB)
   - ✅ **Dica:** Use imagens de interiores para melhores resultados

3. **Selecionar Estilos:**
   - Clique em "Continuar" após o upload
   - Selecione um ou mais estilos de decoração
   - Estilos disponíveis:
     - Moderno, Minimalista, Escandinavo, Contemporâneo
     - Clássico, Romântico
     - Industrial
     - Rústico
     - Bohêmio

4. **Gerar Preview:**
   - Clique em "Gerar Preview"
   - ⏳ **Aguarde:** O processamento pode levar 10-30 segundos
   - Você verá um spinner de loading durante o processamento

5. **Visualizar Resultado:**
   - Após o processamento, você verá a imagem decorada
   - Use os controles de zoom para examinar detalhes
   - Toggle entre "Ver Original" e "Ver Resultado"
   - Opção de download disponível

## Possíveis Erros e Soluções

### Erro: "API key não configurada"
- **Causa:** Arquivo `.env.local` não existe ou não tem a chave
- **Solução:** 
  1. Crie o arquivo `.env.local` na raiz do projeto
  2. Adicione `GOOGLE_API_KEY=sua_chave_aqui`
  3. Reinicie o servidor (`pnpm dev`)

### Erro: "O processamento está demorando mais que o esperado"
- **Causa:** Timeout da API (pode acontecer em primeira execução)
- **Solução:** Tente novamente, o primeiro request pode ser mais lento

### Erro: "Nenhuma imagem foi gerada pela IA"
- **Causa:** Problema na API do Google ou modelo indisponível
- **Solução:** 
  1. Verifique se sua conta Google Cloud tem cobrança ativada e créditos
  2. Verifique os logs do servidor para mais detalhes
  3. Verifique se a API key está correta
  4. Tente novamente

### Imagem não aparece após geração
- **Causa:** Problema ao converter URL para base64
- **Solução:** A aplicação tenta retornar a URL diretamente, mas pode haver problemas com CORS
- **Workaround:** Verifique o console do navegador para erros

## Verificar Logs

Para ver logs detalhados durante o processamento:

1. **No Terminal:**
   - Os logs do servidor aparecerão no terminal onde `pnpm dev` está rodando
   - Erros da API aparecerão aqui

2. **No Navegador:**
   - Abra o DevTools (F12)
   - Vá na aba "Console"
   - Erros do frontend aparecerão aqui
   - Vá na aba "Network" para ver requisições

## Testes Recomendados

### Teste 1: Upload e Estilo Único
- Faça upload de uma imagem de sala
- Selecione apenas "Moderno"
- Verifique se a decoração ficou moderna

### Teste 2: Múltiplos Estilos
- Use a mesma imagem
- Selecione "Escandinavo" + "Minimalista"
- Verifique combinação dos estilos

### Teste 3: Diferentes Ambientes
- Teste com diferentes tipos de ambiente:
  - Sala de estar
  - Quarto
  - Cozinha
  - Escritório

### Teste 4: Validações
- Tente fazer upload sem selecionar estilo (deve mostrar erro)
- Tente gerar preview sem imagem (deve mostrar erro)
- Tente arquivo muito grande (deve rejeitar)

## Limitações Conhecidas

1. **Tempo de Processamento:**
   - Pode levar 10-30 segundos para gerar a imagem
   - Primeiro request pode ser mais lento (cold start)

2. **Custos:**
   - Google AI requer projeto com cobrança ativada
   - Cobrança por uso baseada no modelo usado
   - Verifique seu uso em: https://console.cloud.google.com/

3. **Qualidade:**
   - Depende da qualidade da imagem original
   - Funciona melhor com interiores bem iluminados
   - Imagens muito escuras ou borradas podem não gerar bons resultados

## Próximos Passos Após Teste

Se tudo funcionar corretamente:
- ✅ Integração com IA está funcionando
- ✅ Pronto para usar localmente
- ✅ Pode fazer deploy quando quiser

Se encontrar problemas:
- Verifique os logs
- Verifique se o token está correto
- Teste com diferentes imagens
- Verifique se tem créditos na conta Replicate

