"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectDashboard } from "../components/ProjectDashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "../components/AuthProvider";
import { LogOut } from "lucide-react";

interface Project {
  id: string;
  name: string;
  place_type: "house" | "apartment";
  status: "draft" | "processing" | "completed" | "error";
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Erro ao carregar projetos");

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao deletar projeto");

      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao deletar projeto");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Decorize AI
            </h1>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner message="Carregando projetos..." />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
              <Button onClick={loadProjects} className="mt-4">
                Tentar Novamente
              </Button>
            </div>
          ) : (
            <ProjectDashboard projects={projects} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

