import { Sparkles } from "lucide-react";
import { DecorizeFlow } from "./components/DecorizeFlow";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Decorize AI</h1>
          </div>
          <p className="text-muted-foreground">
            Visualize como seu ambiente ficará decorado com diferentes estilos
          </p>
        </div>

        <DecorizeFlow />
      </div>
    </div>
  );
}
