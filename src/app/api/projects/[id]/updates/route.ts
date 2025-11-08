import { createClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Não autenticado", { status: 401 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = async () => {
        try {
          const { data: rooms } = await supabase
            .from("rooms")
            .select("id, status, error_message")
            .eq("project_id", id);

          if (rooms) {
            const data = `data: ${JSON.stringify(rooms)}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        } catch (error) {
          console.error("Erro ao buscar updates:", error);
        }
      };

      await sendUpdate();

      const interval = setInterval(sendUpdate, 2000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

