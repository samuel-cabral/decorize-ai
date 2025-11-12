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
        <div className="fixed inset-0 -z-10">
          <div className="absolute -left-20 top-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-primary font-[family-name:var(--font-display)]">
              Decorize AI
            </h1>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner message="Carregando projetos..." />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 mx-auto mb-6">
                <p className="text-destructive font-semibold">!</p>
              </div>
              <p className="text-destructive mb-6 text-lg">{error}</p>
              <Button onClick={loadProjects} size="lg">
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

