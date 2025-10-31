"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, ImageIcon, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage: File | null;
  previewUrl: string | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageUpload({
  onImageSelect,
  onImageRemove,
  selectedImage,
  previewUrl,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return "Formato não suportado. Use JPG, PNG ou WebP.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Arquivo muito grande. Tamanho máximo: 10MB.";
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);
      onImageSelect(file);
    },
    [onImageSelect, validateFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemove = useCallback(() => {
    setError(null);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onImageRemove]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  if (selectedImage && previewUrl) {
    return (
      <div className="group relative w-full animate-in fade-in duration-300">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-border/50 bg-muted/30 shadow-lg transition-all duration-300 hover:shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Preview da imagem"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />

          {/* Overlay com informações */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 text-sm text-white">
                <FileImage className="h-4 w-4" />
                <span className="truncate font-medium">
                  {selectedImage.name}
                </span>
                <span className="text-xs text-white/70">
                  {formatFileSize(selectedImage.size)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          size="sm"
          className="absolute right-3 top-3 z-10 shadow-lg transition-all duration-200 hover:scale-110"
          onClick={handleRemove}
          type="button"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* biome-ignore lint/a11y/useSemanticElements: div necessário para drag and drop de arquivos */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload de imagem"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all duration-300",
          isDragging
            ? "border-primary bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg shadow-primary/20"
            : "border-muted-foreground/30 bg-gradient-to-br from-muted/30 via-muted/20 to-transparent hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:via-primary/5 hover:to-transparent hover:shadow-md",
          error && "border-destructive bg-destructive/5",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FORMATS.join(",")}
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={cn(
              "transition-all duration-300",
              isDragging && "animate-pulse scale-110",
            )}
          >
            {isDragging ? (
              <Upload className="h-14 w-14 text-primary" />
            ) : (
              <ImageIcon className="h-14 w-14 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-base font-semibold">
              {isDragging
                ? "Solte a imagem aqui"
                : "Clique para enviar ou arraste uma imagem"}
            </p>
            <p className="text-sm text-muted-foreground">
              PNG, JPG ou WebP (máx. 10MB)
            </p>
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-3 text-sm text-destructive animate-in fade-in duration-200">
          {error}
        </p>
      )}
    </div>
  );
}
