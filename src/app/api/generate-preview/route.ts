import { NextRequest, NextResponse } from "next/server";

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

    // Simular processamento (delay de 2-3 segundos)
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 1000),
    );

    // Para MVP: converter a imagem para base64 e retornar
    // Em produção, aqui seria feita a integração com API de IA
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const mimeType = image.type;
    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    // Simular processamento aplicando um filtro simples via canvas
    // Por enquanto, retornamos a imagem original
    // TODO: Integrar com API de IA real para processamento de imagem

    return NextResponse.json({
      success: true,
      imageUrl: dataUrl,
      styles: selectedStyles,
      message: "Preview gerado com sucesso (modo mock)",
    });
  } catch (error) {
    console.error("Erro ao processar preview:", error);
    return NextResponse.json(
      { error: "Erro ao processar a imagem" },
      { status: 500 },
    );
  }
}
