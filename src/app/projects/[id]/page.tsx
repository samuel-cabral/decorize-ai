"use client";

import { useEffect, useState, use } from "react";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { ProjectGallery } from "@/app/components/ProjectGallery";
import { ProjectCarousel } from "@/app/components/ProjectCarousel";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Grid3x3, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

interface Preview {
  id: string;
  result_image_url: string;
}

interface Room {
  id: string;
  room_type: string;
  name: string;
  original_image_url: string | null;
  status: "pending" | "processing" | "completed" | "error";
  error_message: string | null;
  previews: Preview[];
}

interface Project {
  id: string;
  name: string;
  place_type: "house" | "apartment";
  status: "draft" | "processing" | "completed" | "error";
  created_at: string;
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"gallery" | "carousel">("gallery");

  useEffect(() => {
    loadProject();
    const eventSource = new EventSource(`/api/projects/${id}/updates`);

    eventSource.onmessage = (event) => {
      const updates = JSON.parse(event.data);
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          const update = updates.find((u: Room) => u.id === room.id);
          if (update) {
            return { ...room, status: update.status };
          }
          return room;
        }),
      );
    };

    return () => {
      eventSource.close();
    };
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) throw new Error("Erro ao carregar projeto");

      const data = await response.json();
      setProject(data.project);
      setRooms(data.rooms || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAll = async () => {
    alert(
      "Download em batch será implementado. Por enquanto, baixe individualmente.",
    );
  };

  const handleDownloadRoom = async (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    if (!room || room.previews.length === 0) return;

    const preview = room.previews[0];
    const link = document.createElement("a");
    link.href = preview.result_image_url;
    link.download = `${project?.name}-${room.room_type}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner message="Carregando projeto..." />
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !project) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <p className="text-destructive mb-4">{error || "Projeto não encontrado"}</p>
              <Link href="/projects">
                <Button>Voltar para Projetos</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  const completedRooms = rooms.filter((r) => r.status === "completed").length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <Link href="/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Projetos
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
                <p className="text-muted-foreground">
                  {completedRooms} de {rooms.length} ambientes completados
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "gallery" ? "default" : "outline"}
                  onClick={() => setViewMode("gallery")}
                >
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Galeria
                </Button>
                <Button
                  variant={viewMode === "carousel" ? "default" : "outline"}
                  onClick={() => setViewMode("carousel")}
                  disabled={completedRooms === 0}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Carousel
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadAll}
                  disabled={completedRooms === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Todos
                </Button>
              </div>
            </div>

            {rooms.some((r) => r.status === "processing") && (
              <Card className="border-blue-500/50 bg-blue-500/10 mb-6">
                <CardContent className="py-4">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    ⏳ Alguns ambientes ainda estão sendo processados. A página
                    será atualizada automaticamente.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {viewMode === "gallery" ? (
            <ProjectGallery rooms={rooms} onDownload={handleDownloadRoom} />
          ) : (
            <ProjectCarousel rooms={rooms} onDownload={handleDownloadRoom} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

