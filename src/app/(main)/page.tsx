import { Sparkles } from "lucide-react";
import { DecorizeFlow } from "@/app/components/DecorizeFlow";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Gradiente de fundo sutil */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 text-center animate-in">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-primary animate-pulse" />
              <div className="absolute inset-0 h-10 w-10 rounded-full bg-primary/20 blur-xl animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent gradient-animated">
              Decorize AI
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforme seus ambientes com inteligência artificial. Visualize
            como ficará decorado em segundos.
          </p>
        </div>

        <DecorizeFlow />
      </div>
    </div>
  );
}
