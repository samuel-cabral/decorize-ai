"use client";

import { Card, CardContent } from "@/components/ui/card";
import { decorationStyles, type DecorationStyle } from "@/lib/styles";
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
      <h3 className="mb-4 text-lg font-semibold">
        Selecione os estilos de decoração
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decorationStyles.map((style) => {
          const isSelected = selectedStyles.includes(style.id);
          return (
            <Card
              key={style.id}
              onClick={() => onStyleToggle(style.id)}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                isSelected && "ring-2 ring-primary ring-offset-2",
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "h-10 w-10 shrink-0 rounded-full",
                      style.color || "bg-muted",
                    )}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{style.name}</h4>
                      {isSelected && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
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
        <p className="mt-4 text-sm text-muted-foreground">
          Selecione pelo menos um estilo para continuar
        </p>
      )}
    </div>
  );
}
