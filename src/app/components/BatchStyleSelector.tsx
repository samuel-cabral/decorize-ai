"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ROOM_TYPES } from "@/lib/places-rooms";
import { decorationStyles } from "@/lib/styles";
import { Check } from "lucide-react";

interface RoomData {
  roomId: string;
  image: File | null;
  styles: string[];
}

interface BatchStyleSelectorProps {
  selectedRooms: string[];
  roomsData: Record<string, RoomData>;
  onStylesChange: (roomId: string, styles: string[]) => void;
}

export function BatchStyleSelector({
  selectedRooms,
  roomsData,
  onStylesChange,
}: BatchStyleSelectorProps) {
  const handleStyleToggle = (roomId: string, styleId: string) => {
    const currentStyles = roomsData[roomId]?.styles || [];
    const newStyles = currentStyles.includes(styleId)
      ? currentStyles.filter((id) => id !== styleId)
      : [...currentStyles, styleId];
    onStylesChange(roomId, newStyles);
  };

  return (
    <div className="space-y-8">
      {selectedRooms.map((roomId) => {
        const room = ROOM_TYPES[roomId];
        const roomData = roomsData[roomId];
        const selectedStyles = roomData?.styles || [];

        return (
          <Card key={roomId} className="border-2">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{room.icon}</span>
                <div>
                  <h4 className="font-semibold text-lg">{room.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Selecione um ou mais estilos
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {decorationStyles.map((style) => {
                  const isSelected = selectedStyles.includes(style.id);

                  return (
                    <div
                      key={style.id}
                      onClick={() => handleStyleToggle(roomId, style.id)}
                      className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        isSelected
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <div className="text-center space-y-2">
                        <div className="text-2xl">{style.emoji}</div>
                        <div>
                          <h5 className="font-medium text-sm">{style.name}</h5>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedStyles.length > 0 && (
                <div className="mt-4 p-3 bg-primary/10 rounded-md">
                  <p className="text-sm font-medium">
                    {selectedStyles.length}{" "}
                    {selectedStyles.length === 1
                      ? "estilo selecionado"
                      : "estilos selecionados"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

