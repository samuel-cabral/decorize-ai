import { Loader2, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Processando...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        <div className="absolute -inset-3 rounded-2xl bg-primary/10 blur-2xl animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <p className="text-lg font-medium text-foreground">{message}</p>
          <Sparkles className="h-5 w-5 text-primary animate-pulse delay-75" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse leading-relaxed">
          Isso pode levar alguns segundos...
        </p>
      </div>
    </div>
  );
}
