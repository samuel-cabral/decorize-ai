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
    <>
      {error && (
        <Card className="mb-6 border-destructive bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {step === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Passo 1: Envie uma foto do ambiente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              >
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "select" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Passo 2: Selecione os estilos de decoração</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleSelector
                selectedStyles={selectedStyles}
                onStyleToggle={handleStyleToggle}
              />
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("upload")}>
              Voltar
            </Button>
            <Button
              onClick={handleGeneratePreview}
              disabled={selectedStyles.length === 0}
            >
              Gerar Preview
            </Button>
          </div>
        </div>
      )}

      {step === "processing" && (
        <Card>
          <CardContent>
            <LoadingSpinner message="Gerando preview da decoração..." />
          </CardContent>
        </Card>
      )}

      {step === "result" && resultImageUrl && previewUrl && (
        <div className="space-y-6">
          <PreviewResult
            originalImageUrl={previewUrl}
            resultImageUrl={resultImageUrl}
            onDownload={handleDownload}
          />
          <div className="flex justify-center">
            <Button onClick={handleReset} variant="outline">
              Decorar Outro Ambiente
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
