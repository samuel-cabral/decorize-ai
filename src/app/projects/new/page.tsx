"use client";

import { ProjectWizard } from "@/app/components/ProjectWizard";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <Link href="/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Projetos
              </Button>
            </Link>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Novo Projeto de Decoração
            </h1>
            <p className="text-muted-foreground">
              Crie um projeto completo com múltiplos ambientes
            </p>
          </div>

          <ProjectWizard />
        </div>
      </div>
    </ProtectedRoute>
  );
}

