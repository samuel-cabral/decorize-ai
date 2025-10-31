"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PreviewResultProps {
  originalImageUrl: string;
  resultImageUrl: string;
  onDownload?: () => void;
}

export function PreviewResult({
  originalImageUrl,
  resultImageUrl,
  onDownload,
}: PreviewResultProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const currentImageUrl = showOriginal ? originalImageUrl : resultImageUrl;

  // Detecta se a URL é blob ou data URL (que requerem unoptimized no Next.js Image)
  const isBlobOrDataUrl = useMemo(
    () =>
      currentImageUrl.startsWith("blob:") ||
      currentImageUrl.startsWith("data:"),
    [currentImageUrl],
  );

  return (
    <Card className="w-full space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {showOriginal ? "Imagem Original" : "Resultado da Decoração"}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
          >
            {showOriginal ? "Ver Resultado" : "Ver Original"}
          </Button>
          {onDownload && (
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border bg-muted">
        <div className="relative aspect-video w-full overflow-auto">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.2s",
            }}
            className="relative h-full w-full"
          >
            {isBlobOrDataUrl ? (
              <Image
                src={currentImageUrl}
                alt={showOriginal ? "Imagem original" : "Ambiente decorado"}
                fill
                className="object-contain"
                unoptimized
                priority
              />
            ) : (
              <Image
                src={currentImageUrl}
                alt={showOriginal ? "Imagem original" : "Ambiente decorado"}
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetZoom}
            disabled={zoom === 1}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
