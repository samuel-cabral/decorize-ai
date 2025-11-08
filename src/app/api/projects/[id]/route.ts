import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 },
      );
    }

    const { data: rooms, error: roomsError } = await supabase
      .from("rooms")
      .select("*, previews(*)")
      .eq("project_id", id)
      .order("created_at", { ascending: true });

    if (roomsError) {
      console.error("Erro ao buscar rooms:", roomsError);
      return NextResponse.json(
        { error: "Erro ao buscar ambientes" },
        { status: 500 },
      );
    }

    return NextResponse.json({ project, rooms });
  } catch (error) {
    console.error("Erro ao processar request:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Erro ao deletar projeto:", error);
      return NextResponse.json(
        { error: "Erro ao deletar projeto" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao processar request:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

