"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROOM_TYPES } from "@/lib/places-rooms";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Image from "next/image";

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

interface ProjectCarouselProps {
  rooms: Room[];
  onDownload?: (roomId: string) => void;
}

export function ProjectCarousel({ rooms, onDownload }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const completedRooms = rooms.filter((room) => room.status === "completed");
  const currentRoom = completedRooms[currentIndex];

  if (completedRooms.length === 0) {
    return (
      <Card className="border-2">
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Nenhum preview completado ainda...
          </p>
        </CardContent>
      </Card>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : completedRooms.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < completedRooms.length - 1 ? prev + 1 : 0,
    );
  };

  const roomType = ROOM_TYPES[currentRoom.room_type];
  const preview = currentRoom.previews?.[0];

  return (
    <div className="space-y-4">
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{roomType?.icon || "📦"}</span>
                <div>
                  <h3 className="font-semibold text-lg">
                    {roomType?.name || currentRoom.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentIndex + 1} de {completedRooms.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  {showComparison ? "Ver Resultado" : "Comparar"}
                </Button>
                {onDownload && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload(currentRoom.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>

            <div className="relative">
              {showComparison && currentRoom.original_image_url ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Original</p>
                    <div className="aspect-video relative rounded-lg overflow-hidden border-2">
                      <Image
                        src={currentRoom.original_image_url}
                        alt="Original"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">
                      Resultado
                    </p>
                    <div className="aspect-video relative rounded-lg overflow-hidden border-2">
                      {preview && (
                        <Image
                          src={preview.result_image_url}
                          alt="Resultado"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video relative rounded-lg overflow-hidden border-2">
                  {preview && (
                    <Image
                      src={preview.result_image_url}
                      alt={roomType?.name || currentRoom.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              )}

              {completedRooms.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background p-2 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {completedRooms.length > 1 && (
        <div className="flex justify-center gap-2 flex-wrap">
          {completedRooms.map((room, index) => {
            const rt = ROOM_TYPES[room.room_type];
            const prev = room.previews?.[0];

            return (
              <button
                type="button"
                key={room.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {prev ? (
                  <Image
                    src={prev.result_image_url}
                    alt={rt?.name || room.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-2xl">{rt?.icon || "📦"}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

