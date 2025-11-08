import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateDecoration } from "@/lib/ai/generate-decoration";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const formData = await request.formData();
    const projectId = formData.get("projectId") as string;
    const roomId = formData.get("roomId") as string;
    const image = formData.get("image") as File;
    const styles = JSON.parse(formData.get("styles") as string) as string[];

    if (!projectId || !roomId || !image || !styles || styles.length === 0) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 },
      );
    }

    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 },
      );
    }

    const fileName = `${user.id}/${projectId}/${roomId}/${Date.now()}-${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("room-images")
      .upload(fileName, image, {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError || !uploadData) {
      console.error("Erro ao fazer upload:", uploadError);
      return NextResponse.json(
        { error: "Erro ao fazer upload da imagem" },
        { status: 500 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("room-images").getPublicUrl(uploadData.path);

    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .update({
        original_image_url: publicUrl,
        styles,
        status: "processing",
      })
      .eq("id", roomId)
      .eq("project_id", projectId)
      .select()
      .single();

    if (roomError || !room) {
      console.error("Erro ao atualizar room:", roomError);
      return NextResponse.json(
        { error: "Erro ao atualizar ambiente" },
        { status: 500 },
      );
    }

    try {
      const resultImageDataUrl = await generateDecoration({
        imageFile: image,
        styleIds: styles,
      });

      const base64Data = resultImageDataUrl.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");
      const resultFileName = `${user.id}/${projectId}/${roomId}/result-${Date.now()}.png`;

      const { data: resultUploadData, error: resultUploadError } =
        await supabase.storage
          .from("room-images")
          .upload(resultFileName, buffer, {
            contentType: "image/png",
            upsert: false,
          });

      if (resultUploadError || !resultUploadData) {
        throw new Error("Erro ao fazer upload do resultado");
      }

      const {
        data: { publicUrl: resultPublicUrl },
      } = supabase.storage
        .from("room-images")
        .getPublicUrl(resultUploadData.path);

      await supabase.from("previews").insert({
        room_id: room.id,
        result_image_url: resultPublicUrl,
      });

      await supabase
        .from("rooms")
        .update({ status: "completed" })
        .eq("id", room.id);

      return NextResponse.json({
        success: true,
        roomId: room.id,
        originalImageUrl: publicUrl,
        resultImageUrl: resultPublicUrl,
      });
    } catch (error) {
      console.error("Erro ao gerar decoração:", error);

      await supabase
        .from("rooms")
        .update({
          status: "error",
          error_message:
            error instanceof Error ? error.message : "Erro desconhecido",
        })
        .eq("id", room.id);

      return NextResponse.json(
        {
          error: "Erro ao gerar decoração",
          roomId: room.id,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Erro ao processar request:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

