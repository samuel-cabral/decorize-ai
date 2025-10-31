"use client";

import { useState } from "react";
import { Download, ZoomIn, ZoomOut, RotateCcw, Sparkles } from "lucide-react";
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

  return (
    <Card className="w-full space-y-6 p-6 bg-gradient-to-br from-card via-card to-card/50 border-2 shadow-xl animate-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {showOriginal ? "Imagem Original" : "Resultado da Decoração"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
            className="transition-all duration-200 hover:scale-105"
          >
            {showOriginal ? "Ver Resultado" : "Ver Original"}
          </Button>
          {onDownload && (
            <Button
              variant="default"
              size="sm"
              onClick={onDownload}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border-2 border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 shadow-inner">
        <div className="relative aspect-video w-full overflow-auto">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="relative flex h-full w-full items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImageUrl}
              alt={showOriginal ? "Imagem original" : "Ambiente decorado"}
              className="max-h-full max-w-full object-contain transition-opacity duration-300"
              style={{
                opacity:
                  showOriginal !== (currentImageUrl === originalImageUrl)
                    ? 0
                    : 1,
              }}
            />
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
            className="transition-all duration-200 hover:scale-110"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="min-w-[60px] text-center text-sm font-medium text-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="transition-all duration-200 hover:scale-110"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetZoom}
            disabled={zoom === 1}
            className="transition-all duration-200 hover:scale-110"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
