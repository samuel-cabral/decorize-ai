import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Lista modelos disponíveis na API do Google Generative AI
 * Útil para descobrir quais modelos estão disponíveis
 */
export async function listAvailableModels(): Promise<string[]> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error(
      "GOOGLE_API_KEY não configurado. Configure no arquivo .env.local",
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Tentar listar modelos via API
    // Nota: A API pode não suportar listagem direta, mas podemos tentar modelos conhecidos
    const knownModels = [
      "gemini-2.5-flash-image-exp",
      "gemini-2.0-flash-exp",
      "gemini-1.5-flash-latest",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
    ];

    const availableModels: string[] = [];

    for (const modelName of knownModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        // Tentar fazer uma chamada simples para verificar se o modelo existe
        // Se não der erro, o modelo está disponível
        await model.generateContent("test");
        availableModels.push(modelName);
      } catch {
        // Modelo não disponível ou erro
        continue;
      }
    }

    return availableModels;
  } catch (error) {
    console.error("Erro ao listar modelos:", error);
    throw error;
  }
}
