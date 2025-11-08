"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROOM_TYPES } from "@/lib/places-rooms";
import { Download, ZoomIn, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Preview {
  id: string;
  result_image_url: string;
}

interface Room {
  id: string;
  room_type: string;
  name: string;
  original_image_url: string | null;
  status: "pending" | "processing" | "completed" | "error";
  error_message: string | null;
  previews: Preview[];
}

interface ProjectGalleryProps {
  rooms: Room[];
  onDownload?: (roomId: string) => void;
  onZoom?: (roomId: string, imageUrl: string) => void;
}

export function ProjectGallery({
  rooms,
  onDownload,
  onZoom,
}: ProjectGalleryProps) {
  const [selectedView, setSelectedView] = useState<"original" | "result">(
    "result",
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <Button
          variant={selectedView === "original" ? "default" : "outline"}
          onClick={() => setSelectedView("original")}
        >
          Ver Original
        </Button>
        <Button
          variant={selectedView === "result" ? "default" : "outline"}
          onClick={() => setSelectedView("result")}
        >
          Ver Resultado
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const roomType = ROOM_TYPES[room.room_type];
          const preview = room.previews?.[0];

          return (
            <Card key={room.id} className="border-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video relative bg-muted">
                  {room.status === "completed" &&
                  selectedView === "result" &&
                  preview ? (
                    <Image
                      src={preview.result_image_url}
                      alt={`${roomType?.name || room.name} - Resultado`}
                      fill
                      className="object-cover"
                    />
                  ) : room.original_image_url && selectedView === "original" ? (
                    <Image
                      src={room.original_image_url}
                      alt={`${roomType?.name || room.name} - Original`}
                      fill
                      className="object-cover"
                    />
                  ) : room.status === "processing" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          Processando...
                        </p>
                      </div>
                    </div>
                  ) : room.status === "error" ? (
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="text-center">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                        <p className="text-sm text-destructive">
                          Erro ao processar
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        Aguardando...
                      </p>
                    </div>
                  )}

                  {room.status === "completed" && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      {onZoom && preview && selectedView === "result" && (
                        <button
                          type="button"
                          onClick={() => onZoom(room.id, preview.result_image_url)}
                          className="bg-background/90 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
                        >
                          <ZoomIn className="h-4 w-4" />
                        </button>
                      )}
                      {onDownload && (
                        <button
                          type="button"
                          onClick={() => onDownload(room.id)}
                          className="bg-background/90 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{roomType?.icon || "📦"}</span>
                    <div>
                      <h4 className="font-semibold">
                        {roomType?.name || room.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {room.status === "completed" && "Concluído"}
                        {room.status === "processing" && "Processando..."}
                        {room.status === "pending" && "Aguardando"}
                        {room.status === "error" && "Erro"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

