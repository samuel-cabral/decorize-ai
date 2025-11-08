"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceSelector } from "./PlaceSelector";
import { RoomSelector } from "./RoomSelector";
import { BatchImageUpload } from "./BatchImageUpload";
import { BatchStyleSelector } from "./BatchStyleSelector";
import { LoadingSpinner } from "./LoadingSpinner";
import type { PlaceType } from "@/lib/places-rooms";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

type Step = "place" | "rooms" | "upload" | "styles" | "processing" | "result";

interface RoomData {
  roomId: string;
  image: File | null;
  styles: string[];
}

export function ProjectWizard() {
  const [step, setStep] = useState<Step>("place");
  const [projectName, setProjectName] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [roomsData, setRoomsData] = useState<Record<string, RoomData>>({});
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(null);

  const steps = [
    { id: "place", label: "Tipo de Local", number: 1 },
    { id: "rooms", label: "Ambientes", number: 2 },
    { id: "upload", label: "Fotos", number: 3 },
    { id: "styles", label: "Estilos", number: 4 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const handlePlaceSelect = useCallback((place: PlaceType) => {
    setSelectedPlace(place);
    setError(null);
  }, []);

  const handleRoomToggle = useCallback((roomId: string) => {
    setSelectedRooms((prev) => {
      const newRooms = prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId];

      setRoomsData((prevData) => {
        const newData = { ...prevData };
        if (!newRooms.includes(roomId)) {
          delete newData[roomId];
        } else if (!newData[roomId]) {
          newData[roomId] = { roomId, image: null, styles: [] };
        }
        return newData;
      });

      return newRooms;
    });
    setError(null);
  }, []);

  const handleImageUpload = useCallback(
    (roomId: string, file: File | null) => {
      setRoomsData((prev) => ({
        ...prev,
        [roomId]: { ...prev[roomId], roomId, image: file, styles: [] },
      }));
      setError(null);
    },
    [],
  );

  const handleStylesChange = useCallback(
    (roomId: string, styles: string[]) => {
      setRoomsData((prev) => ({
        ...prev,
        [roomId]: { ...prev[roomId], styles },
      }));
      setError(null);
    },
    [],
  );

  const handleContinueFromPlace = useCallback(() => {
    if (!selectedPlace) {
      setError("Selecione um tipo de local");
      return;
    }
    setStep("rooms");
  }, [selectedPlace]);

  const handleContinueFromRooms = useCallback(() => {
    if (selectedRooms.length === 0) {
      setError("Selecione pelo menos um ambiente");
      return;
    }
    setStep("upload");
  }, [selectedRooms]);

  const handleContinueFromUpload = useCallback(() => {
    const hasAllImages = selectedRooms.every(
      (roomId) => roomsData[roomId]?.image,
    );
    if (!hasAllImages) {
      setError("Faça upload de fotos para todos os ambientes selecionados");
      return;
    }
    setStep("styles");
  }, [selectedRooms, roomsData]);

  const handleStartProcessing = useCallback(async () => {
    const hasAllStyles = selectedRooms.every(
      (roomId) => roomsData[roomId]?.styles?.length > 0,
    );
    if (!hasAllStyles) {
      setError("Selecione estilos para todos os ambientes");
      return;
    }

    setStep("processing");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: projectName || "Meu Projeto",
          placeType: selectedPlace,
          rooms: selectedRooms,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar projeto");

      const { projectId: newProjectId } = await response.json();
      setProjectId(newProjectId);

      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const roomData = roomsData[roomId];
          if (!roomData?.image) return;

          const formData = new FormData();
          formData.append("projectId", newProjectId);
          formData.append("roomId", roomId);
          formData.append("image", roomData.image);
          formData.append("styles", JSON.stringify(roomData.styles));

          await fetch("/api/previews/batch", {
            method: "POST",
            body: formData,
          });
        }),
      );

      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar");
      setStep("styles");
    }
  }, [selectedRooms, roomsData, projectName, selectedPlace]);

  const handleGoBack = useCallback(() => {
    const stepOrder: Step[] = ["place", "rooms", "upload", "styles"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  }, [step]);

  return (
    <div className="space-y-6">
      {!["processing", "result"].includes(step) && (
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    index <= currentStepIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStepIndex ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    s.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded ${
                      index < currentStepIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <Card className="border-destructive/50 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent shadow-lg">
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {step === "place" && (
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Passo 1: Escolha o tipo de local
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do Projeto</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Ex: Reforma do Apartamento"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <PlaceSelector
              selectedPlace={selectedPlace}
              onPlaceSelect={handlePlaceSelect}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleContinueFromPlace}
                disabled={!selectedPlace}
                className="bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "rooms" && selectedPlace && (
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Passo 2: Selecione os ambientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RoomSelector
              placeType={selectedPlace}
              selectedRooms={selectedRooms}
              onRoomToggle={handleRoomToggle}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleGoBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                onClick={handleContinueFromRooms}
                disabled={selectedRooms.length === 0}
                className="bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "upload" && (
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Passo 3: Faça upload das fotos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <BatchImageUpload
              selectedRooms={selectedRooms}
              roomsData={roomsData}
              onImageUpload={handleImageUpload}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleGoBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                onClick={handleContinueFromUpload}
                className="bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "styles" && (
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">
              Passo 4: Selecione os estilos de decoração
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <BatchStyleSelector
              selectedRooms={selectedRooms}
              roomsData={roomsData}
              onStylesChange={handleStylesChange}
            />
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleGoBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                onClick={handleStartProcessing}
                className="bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                Gerar Previews
                <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "processing" && (
        <Card className="border-2 shadow-xl">
          <CardContent className="py-12">
            <LoadingSpinner message="Gerando previews dos ambientes..." />
          </CardContent>
        </Card>
      )}

      {step === "result" && projectId && (
        <div className="text-center space-y-4">
          <Card className="border-2 shadow-xl">
            <CardContent className="py-12">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold mb-2">
                Projeto criado com sucesso!
              </h2>
              <p className="text-muted-foreground mb-6">
                Os previews estão sendo gerados. Você pode acompanhar o
                progresso na página do projeto.
              </p>
              <Button
                onClick={() => (window.location.href = `/projects/${projectId}`)}
                className="bg-gradient-to-r from-primary to-secondary"
                size="lg"
              >
                Ver Projeto
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

