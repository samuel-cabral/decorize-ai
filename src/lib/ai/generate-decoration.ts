import { GoogleGenAI } from "@google/genai";
import { decorationStyles } from "../styles";

// Biblioteca correta conforme documentação oficial:
// https://ai.google.dev/gemini-api/docs/image-generation#javascript
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

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
  boho:
    "boho chic interior with layered textures, natural fibers, indoor plants, warm earthy palette, artisanal decor, relaxed and inviting atmosphere",
  africano:
    "African style with tribal patterns, earthy colors, handcrafted artifacts, natural textures, warm terracotta and brown tones",
  japones:
    "Japanese style with zen design, natural elements, neutral colors, traditional minimalism, tatami mats, shoji screens, clean lines",
  chines:
    "Chinese style with elegant wooden furniture, feng shui elements, traditional colors like red and gold, ornate details, calligraphy art",
  indiano:
    "Indian style with vibrant colors, rich fabrics, elaborate patterns, ornamental details, silk textiles, traditional rugs, intricate designs",
  marroquino:
    "Moroccan style with colorful tiles, decorative lanterns, traditional cushions, patterned rugs, arched doorways, rich textures, warm colors",
  mexicano:
    "Mexican style with vibrant colors, handcrafted textiles, colorful ceramics, folkloric elements, traditional patterns, warm and inviting atmosphere",
  mediterraneo:
    "Mediterranean style with blues and whites, natural textures, decorative tiles, coastal inspiration, rustic charm, terracotta accents, light and airy",
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

    // Usar a biblioteca @google/genai conforme documentação oficial:
    // https://ai.google.dev/gemini-api/docs/image-generation#javascript
    // Modelo: gemini-2.5-flash-image (Nano Banana)
    // Image editing (text-and-image-to-image) conforme documentação

    console.log("Gerando imagem decorada com Gemini 2.5 Flash Image...");

    const contents = [
      {
        text: prompt,
      },
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents,
      config: {
        imageConfig: {
          aspectRatio: "4:3", // Manter proporção próxima da imagem original
        },
      },
    });

    // Processar resposta conforme documentação
    if (
      !response.candidates ||
      response.candidates.length === 0 ||
      !response.candidates[0].content?.parts
    ) {
      throw new Error("Nenhuma imagem foi gerada pela IA");
    }

    // Buscar a parte que contém a imagem
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        // Retornar a imagem em base64 conforme documentação
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Imagem não encontrada na resposta da IA");
  } catch (error) {
    console.error("Erro ao gerar decoração:", error);
    if (error instanceof Error) {
      throw new Error(`Erro ao gerar decoração: ${error.message}`);
    }
    throw new Error("Erro desconhecido ao gerar decoração");
  }
}
