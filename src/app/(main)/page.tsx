import { Home, Sparkles } from "lucide-react";
import { DecorizeFlow } from "@/app/components/DecorizeFlow";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Gradiente de fundo sutil */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -left-20 top-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="mb-16 text-center animate-in">
          <div className="mb-6 flex items-center justify-center gap-3.5">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Home className="h-7 w-7 text-primary" />
              </div>
              <div className="absolute -inset-2 rounded-2xl bg-primary/5 blur-xl" />
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold text-primary font-[family-name:var(--font-display)]">
              Decorize AI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transforme seus ambientes com inteligência artificial. Visualize seu lar decorado em segundos.
          </p>
        </div>

        <DecorizeFlow />
      </div>
    </div>
  );
}
