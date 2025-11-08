"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PLACES } from "@/lib/places-rooms";
import { Trash2, Eye, Plus } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  place_type: "house" | "apartment";
  status: "draft" | "processing" | "completed" | "error";
  created_at: string;
}

interface ProjectDashboardProps {
  projects: Project[];
  onDelete?: (projectId: string) => void;
}

export function ProjectDashboard({
  projects,
  onDelete,
}: ProjectDashboardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusLabel = (status: Project["status"]) => {
    const labels = {
      draft: "Rascunho",
      processing: "Processando",
      completed: "Concluído",
      error: "Erro",
    };
    return labels[status];
  };

  const getStatusColor = (status: Project["status"]) => {
    const colors = {
      draft: "bg-gray-500",
      processing: "bg-blue-500",
      completed: "bg-green-500",
      error: "bg-red-500",
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Meus Projetos</h2>
        <Link href="/projects/new">
          <Button className="bg-gradient-to-r from-primary to-secondary">
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-12 text-center space-y-4">
            <div className="text-6xl">🏠</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Nenhum projeto ainda
              </h3>
              <p className="text-muted-foreground mb-4">
                Comece criando seu primeiro projeto de decoração
              </p>
              <Link href="/projects/new">
                <Button className="bg-gradient-to-r from-primary to-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Projeto
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const place = PLACES[project.place_type];

            return (
              <Card key={project.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{place.icon}</span>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {place.label}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}
                      />
                      <span className="text-sm text-muted-foreground">
                        {getStatusLabel(project.status)}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(project.created_at)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/projects/${project.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Projeto
                      </Button>
                    </Link>
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(project.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

