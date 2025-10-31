import { Loader2, Sparkles } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Processando...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="absolute inset-0 h-12 w-12 rounded-full bg-primary/20 blur-xl animate-pulse" />
      </div>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
        <p className="text-base font-medium text-foreground">{message}</p>
        <Sparkles className="h-4 w-4 text-primary animate-pulse delay-75" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">
        Isso pode levar alguns segundos...
      </p>
    </div>
  );
}
