import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { generateDecoration } from "@/lib/ai/generate-decoration";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const styles = formData.get("styles") as string;

    if (!image) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 },
      );
    }

    if (!styles) {
      return NextResponse.json(
        { error: "Estilos não fornecidos" },
        { status: 400 },
      );
    }

    const selectedStyles = JSON.parse(styles) as string[];

    if (selectedStyles.length === 0) {
      return NextResponse.json(
        { error: "Selecione pelo menos um estilo" },
        { status: 400 },
      );
    }

    // Verificar se a API key está configurada
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        {
          error:
            "API key não configurada. Configure GOOGLE_API_KEY no arquivo .env.local",
        },
        { status: 500 },
      );
    }

    // Gerar decoração usando IA
    // O Google Nano Banana retorna a imagem já em base64
    const generatedImageDataUrl = await generateDecoration({
      imageFile: image,
      styleIds: selectedStyles,
    });

    return NextResponse.json({
      success: true,
      imageUrl: generatedImageDataUrl,
      styles: selectedStyles,
      message: "Preview gerado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao processar preview:", error);

    // Mensagens de erro mais específicas
    if (error instanceof Error) {
      if (error.message.includes("API token")) {
        return NextResponse.json(
          {
            error:
              "Configuração da API: " +
              error.message +
              ". Verifique o arquivo .env.local",
          },
          { status: 500 },
        );
      }

      if (error.message.includes("timeout") || error.message.includes("time")) {
        return NextResponse.json(
          {
            error:
              "O processamento está demorando mais que o esperado. Tente novamente.",
          },
          { status: 504 },
        );
      }

      return NextResponse.json(
        { error: `Erro ao processar a imagem: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Erro desconhecido ao processar a imagem" },
      { status: 500 },
    );
  }
}
