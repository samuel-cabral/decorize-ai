"use client";

import { Card, CardContent } from "@/components/ui/card";
import { decorationStyles } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StyleSelectorProps {
  selectedStyles: string[];
  onStyleToggle: (styleId: string) => void;
}

export function StyleSelector({
  selectedStyles,
  onStyleToggle,
}: StyleSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="mb-6 text-xl font-semibold">
        Selecione os estilos de decoração
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decorationStyles.map((style, index) => {
          const isSelected = selectedStyles.includes(style.id);
          return (
            <Card
              key={style.id}
              onClick={() => onStyleToggle(style.id)}
              className={cn(
                "group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                isSelected &&
                  "ring-2 ring-primary ring-offset-2 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20",
                !isSelected &&
                  "hover:bg-gradient-to-br hover:from-muted/50 hover:via-muted/30 hover:to-transparent",
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-all duration-300",
                      isSelected
                        ? "bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg shadow-primary/20"
                        : "bg-gradient-to-br from-muted to-muted/50 group-hover:from-primary/10 group-hover:to-secondary/10",
                    )}
                  >
                    {style.emoji}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">
                        {style.name}
                      </h4>
                      {isSelected && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50">
                          <Check className="h-3.5 w-3.5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {style.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {selectedStyles.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground text-center">
          Selecione pelo menos um estilo para continuar
        </p>
      )}
    </div>
  );
}
