# Limitações da API do Google Gemini para Geração de Imagens

## Problema

O **Google Gemini via API padrão (`@google/generative-ai`)** **NÃO suporta geração de imagens**. A API padrão do Gemini apenas:
- ✅ Analisa imagens (visão de imagem)
- ✅ Gera texto baseado em prompts
- ❌ **NÃO gera novas imagens**

## O "Nano Banana" (Gemini 2.5 Flash Image)

O modelo "Nano Banana" (oficialmente Gemini 2.5 Flash Image) **existe**, mas está disponível apenas através de:
- **Firebase AI Logic** (requer plano Blaze - pay-as-you-go)
- Não está disponível na API padrão do Google Generative AI

## Soluções Possíveis

### Opção 1: Usar Firebase AI Logic (Recomendado para Gemini)

Se você realmente quer usar o Nano Banana/Gemini para gerar imagens, você precisa:

1. Configurar um projeto Firebase
2. Ativar o Firebase AI Logic
3. Ter um plano Blaze (pay-as-you-go)
4. Usar o SDK do Firebase AI Logic em vez da API padrão

Documentação: https://firebase.google.com/docs/ai-logic/generate-images-gemini

### Opção 2: Usar outra API de geração de imagens

Para image-to-image (transformar uma imagem existente), considere:
- **Replicate** (Flux, Stable Diffusion)
- **Hugging Face Inference API**
- **Stability AI**
- **Midjourney API** (quando disponível)

### Opção 3: Workaround com Gemini

Você poderia usar o Gemini para:
1. Analisar a imagem original
2. Gerar uma descrição detalhada da decoração desejada
3. Usar essa descrição como prompt para outra API de geração de imagens

Mas isso não é verdadeiramente "image-to-image", seria mais um "text-to-image" baseado na análise.

## Próximos Passos

Atualmente, o código tenta usar modelos do Gemini que não retornam imagens. Recomendamos:
1. Escolher uma API que realmente suporte geração de imagens (Replicate, Hugging Face, etc.)
2. Ou implementar Firebase AI Logic se você realmente precisa do Nano Banana

