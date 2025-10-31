"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "./ImageUpload";
import { LoadingSpinner } from "./LoadingSpinner";
import { PreviewResult } from "./PreviewResult";
import { StyleSelector } from "./StyleSelector";

type Step = "upload" | "select" | "processing" | "result";

export function DecorizeFlow() {
  const [step, setStep] = useState<Step>("upload");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    setSelectedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setError(null);
  }, []);

  const handleImageRemove = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setPreviewUrl(null);
    setStep("upload");
    setResultImageUrl(null);
    setError(null);
  }, [previewUrl]);

  const handleStyleToggle = useCallback((styleId: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleId)
        ? prev.filter((id) => id !== styleId)
        : [...prev, styleId],
    );
    setError(null);
  }, []);

  const handleContinueFromUpload = useCallback(() => {
    if (!selectedImage) {
      setError("Por favor, selecione uma imagem primeiro");
      return;
    }
    setStep("select");
    setError(null);
  }, [selectedImage]);

  const handleGeneratePreview = useCallback(async () => {
    if (selectedStyles.length === 0) {
      setError("Selecione pelo menos um estilo de decoração");
      return;
    }

    if (!selectedImage) {
      setError("Imagem não encontrada");
      return;
    }

    setStep("processing");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("styles", JSON.stringify(selectedStyles));

      const response = await fetch("/api/generate-preview", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao gerar preview");
      }

      const data = await response.json();
      setResultImageUrl(data.imageUrl);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar imagem");
      setStep("select");
    }
  }, [selectedImage, selectedStyles]);

  const handleReset = useCallback(() => {
    setStep("upload");
    setSelectedStyles([]);
    setResultImageUrl(null);
    setError(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (!resultImageUrl) return;

    const link = document.createElement("a");
    link.href = resultImageUrl;
    link.download = `decorize-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resultImageUrl]);

  return (
    <div className="space-y-6">
      {error && (
        <Card className="border-destructive/50 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent shadow-lg animate-in">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {step === "upload" && (
        <Card className="border-2 shadow-xl bg-gradient-to-br from-card via-card to-card/50 animate-in">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Passo 1: Envie uma foto do ambiente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              selectedImage={selectedImage}
              previewUrl={previewUrl}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleContinueFromUpload}
                disabled={!selectedImage}
                className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "select" && (
        <div className="space-y-6 animate-in">
          <Card className="border-2 shadow-xl bg-gradient-to-br from-card via-card to-card/50">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Passo 2: Selecione os estilos de decoração
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StyleSelector
                selectedStyles={selectedStyles}
                onStyleToggle={handleStyleToggle}
              />
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep("upload")}
              className="transition-all duration-200 hover:scale-105"
            >
              Voltar
            </Button>
            <Button
              onClick={handleGeneratePreview}
              disabled={selectedStyles.length === 0}
              className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              Gerar Preview
            </Button>
          </div>
        </div>
      )}

      {step === "processing" && (
        <Card className="border-2 shadow-xl bg-gradient-to-br from-card via-card to-card/50 animate-in">
          <CardContent className="py-12">
            <LoadingSpinner message="Gerando preview da decoração..." />
          </CardContent>
        </Card>
      )}

      {step === "result" && resultImageUrl && previewUrl && (
        <div className="space-y-6 animate-in">
          <PreviewResult
            originalImageUrl={previewUrl}
            resultImageUrl={resultImageUrl}
            onDownload={handleDownload}
          />
          <div className="flex justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="transition-all duration-200 hover:scale-105"
            >
              Decorar Outro Ambiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
