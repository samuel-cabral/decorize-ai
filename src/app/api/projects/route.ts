import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { name, placeType, rooms } = await request.json();

    if (!name || !placeType || !Array.isArray(rooms) || rooms.length === 0) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 },
      );
    }

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        name,
        place_type: placeType,
        status: "draft",
      })
      .select()
      .single();

    if (projectError || !project) {
      console.error("Erro ao criar projeto:", projectError);
      return NextResponse.json(
        { error: "Erro ao criar projeto" },
        { status: 500 },
      );
    }

    const roomsData = rooms.map((roomId: string) => ({
      project_id: project.id,
      room_type: roomId,
      name: roomId,
      status: "pending",
    }));

    const { error: roomsError } = await supabase
      .from("rooms")
      .insert(roomsData);

    if (roomsError) {
      console.error("Erro ao criar rooms:", roomsError);
      return NextResponse.json(
        { error: "Erro ao criar ambientes" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      projectId: project.id,
      message: "Projeto criado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao processar request:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar projetos:", error);
      return NextResponse.json(
        { error: "Erro ao buscar projetos" },
        { status: 500 },
      );
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Erro ao processar request:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

