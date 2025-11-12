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
    <div className="space-y-8">
      {error && (
        <Card className="border border-destructive/50 bg-destructive/5 shadow-md animate-in">
          <CardContent className="py-4 px-6">
            <p className="text-sm font-medium text-destructive leading-relaxed">{error}</p>
          </CardContent>
        </Card>
      )}

      {step === "upload" && (
        <Card className="shadow-lg animate-in">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl md:text-3xl font-[family-name:var(--font-display)]">
              Passo 1: Envie uma foto do ambiente
            </CardTitle>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Escolha uma imagem do espaço que você quer decorar
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
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
                size="lg"
              >
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "select" && (
        <div className="space-y-8 animate-in">
          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl md:text-3xl font-[family-name:var(--font-display)]">
                Passo 2: Selecione os estilos de decoração
              </CardTitle>
              <p className="text-muted-foreground leading-relaxed mt-2">
                Escolha um ou mais estilos para personalizar seu ambiente
              </p>
            </CardHeader>
            <CardContent>
              <StyleSelector
                selectedStyles={selectedStyles}
                onStyleToggle={handleStyleToggle}
              />
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setStep("upload")}
              size="lg"
            >
              Voltar
            </Button>
            <Button
              onClick={handleGeneratePreview}
              disabled={selectedStyles.length === 0}
              size="lg"
            >
              Gerar Preview
            </Button>
          </div>
        </div>
      )}

      {step === "processing" && (
        <Card className="shadow-lg animate-in">
          <CardContent className="py-16">
            <LoadingSpinner message="Gerando preview da decoração..." />
          </CardContent>
        </Card>
      )}

      {step === "result" && resultImageUrl && previewUrl && (
        <div className="space-y-8 animate-in">
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
            >
              Decorar Outro Ambiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
