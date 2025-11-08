"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { ROOM_TYPES } from "@/lib/places-rooms";
import Image from "next/image";

interface RoomData {
  roomId: string;
  image: File | null;
  styles: string[];
}

interface BatchImageUploadProps {
  selectedRooms: string[];
  roomsData: Record<string, RoomData>;
  onImageUpload: (roomId: string, file: File | null) => void;
}

export function BatchImageUpload({
  selectedRooms,
  roomsData,
  onImageUpload,
}: BatchImageUploadProps) {
  const handleFileSelect = useCallback(
    (roomId: string, file: File | null) => {
      if (file && !file.type.startsWith("image/")) {
        alert("Por favor, selecione apenas arquivos de imagem");
        return;
      }
      if (file && file.size > 10 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 10MB");
        return;
      }
      onImageUpload(roomId, file);
    },
    [onImageUpload],
  );

  const handleDrop = useCallback(
    (roomId: string, e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(roomId, file);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {selectedRooms.map((roomId) => {
        const room = ROOM_TYPES[roomId];
        const roomData = roomsData[roomId];
        const previewUrl = roomData?.image
          ? URL.createObjectURL(roomData.image)
          : null;

        return (
          <Card key={roomId} className="border-2">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{room.icon}</span>
                <div>
                  <h4 className="font-semibold">{room.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {room.description}
                  </p>
                </div>
              </div>

              {previewUrl ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary">
                  <Image
                    src={previewUrl}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleFileSelect(roomId, null)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-2 hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDrop={(e) => handleDrop(roomId, e)}
                  onDragOver={handleDragOver}
                  onClick={() => {
                    const input = document.getElementById(
                      `file-${roomId}`,
                    ) as HTMLInputElement;
                    input?.click();
                  }}
                  className="aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Clique ou arraste uma foto
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG ou WebP (máx. 10MB)
                  </p>
                  <input
                    id={`file-${roomId}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileSelect(roomId, file);
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

