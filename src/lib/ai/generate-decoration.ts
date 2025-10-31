import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { decorationStyles } from "../styles";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

interface GenerateDecorationParams {
  imageFile: File;
  styleIds: string[];
}

const stylePromptMap: Record<string, string> = {
  moderno:
    "modern minimalist design with clean lines, contemporary furniture, sleek surfaces, neutral colors",
  minimalista:
    "ultra minimal design, clean spaces, very few decorative elements, simple and uncluttered",
  escandinavo:
    "Scandinavian style with light color palette, light wood, natural textures, hygge atmosphere, cozy and warm",
  contemporaneo:
    "contemporary design, mixing modern styles with current elements, trendy and up-to-date",
  classico:
    "classic elegant design, traditional furniture, refined details, sophisticated colors, timeless elegance",
  romantico:
    "romantic design with delicate touches, soft pastel colors, cozy atmosphere, floral patterns, gentle and warm",
  industrial:
    "industrial design with raw materials, exposed metals, urban aesthetic, brick walls, concrete surfaces",
  rustico:
    "rustic design with rustic wood, natural textures, country charm, warm earth tones, cozy farmhouse style",
  bohemio:
    "bohemian style with vibrant colors, ethnic patterns, eclectic decoration, artistic and free-spirited",
};

function buildPrompt(styleIds: string[]): string {
  const styles = decorationStyles.filter((style) =>
    styleIds.includes(style.id),
  );
  const styleDescriptions = styles
    .map((style) => stylePromptMap[style.id] || style.description.toLowerCase())
    .join(", ");

  return `Transform this interior space into a beautifully decorated room with ${styleDescriptions}. High quality interior design, professional photography, detailed and realistic, 4k resolution. Keep the same room layout and structure, only change the decoration style, furniture, and color scheme.`;
}

export async function generateDecoration({
  imageFile,
  styleIds,
}: GenerateDecorationParams): Promise<string> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error(
      "GOOGLE_API_KEY não configurado. Configure no arquivo .env.local",
    );
  }

  try {
    // Converter File para base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Determinar tipo MIME
    const mimeType = imageFile.type || "image/jpeg";

    // Construir prompt baseado nos estilos
    const prompt = buildPrompt(styleIds);

    // IMPORTANTE: O Google Gemini via API padrão NÃO gera imagens!
    // A API padrão apenas analisa imagens e gera texto, não cria novas imagens.
    // 
    // O "Nano Banana" (Gemini 2.5 Flash Image) está disponível apenas via:
    // - Firebase AI Logic (requer plano Blaze)
    // - Não via API padrão do @google/generative-ai
    //
    // Este código tenta usar modelos disponíveis, mas provavelmente falhará
    // porque esses modelos não retornam imagens.
    //
    // Para geração de imagens real, considere usar:
    // - Replicate (Flux, Stable Diffusion)
    // - Hugging Face Inference API
    // - Ou implementar Firebase AI Logic
    const modelNames = [
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash",
      "gemini-pro",
    ];

    let lastError: Error | null = null;

    for (const modelName of modelNames) {
      try {
        const model: GenerativeModel = genAI.getGenerativeModel({
          model: modelName,
        });

        // Gerar conteúdo com imagem e prompt
        const result = await model.generateContent([
          {
            inlineData: {
              data: base64Image,
              mimeType,
            },
          },
          prompt,
        ]);

        const response = await result.response;

        // Verificar se a resposta contém imagem
        if (response.candidates && response.candidates.length > 0) {
          const candidate = response.candidates[0];

          if (candidate.content && candidate.content.parts) {
            // Buscar a parte que contém a imagem
            const imagePart = candidate.content.parts.find(
              (part) => part.inlineData,
            );

            if (imagePart && imagePart.inlineData) {
              // Retornar a imagem em base64
              return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
            }
          }
        }

        // Se chegou aqui, o modelo não retornou imagem
        // Tenta próximo modelo
        console.log(`Modelo ${modelName} não retornou imagem, tentando próximo...`);
      } catch (error) {
        console.log(`Erro com modelo ${modelName}:`, error);
        lastError =
          error instanceof Error ? error : new Error(String(error));
        // Continua para o próximo modelo
      }
    }

    // Se nenhum modelo funcionou, informa sobre a limitação
    throw new Error(
      "A API padrão do Google Gemini não suporta geração de imagens. " +
        "Os modelos do Gemini apenas analisam imagens e geram texto. " +
        "Para geração de imagens, é necessário usar Firebase AI Logic ou outra API como Replicate/Hugging Face. " +
        `Último erro: ${lastError?.message || "Desconhecido"}`,
    );
  } catch (error) {
    console.error("Erro ao gerar decoração:", error);
    if (error instanceof Error) {
      throw new Error(`Erro ao gerar decoração: ${error.message}`);
    }
    throw new Error("Erro desconhecido ao gerar decoração");
  }
}
