"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PLACES, type PlaceType } from "@/lib/places-rooms";

interface PlaceSelectorProps {
  selectedPlace: PlaceType | null;
  onPlaceSelect: (place: PlaceType) => void;
}

export function PlaceSelector({
  selectedPlace,
  onPlaceSelect,
}: PlaceSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {(Object.entries(PLACES) as [PlaceType, typeof PLACES.house][]).map(
        ([placeId, place]) => (
          <Card
            key={placeId}
            onClick={() => onPlaceSelect(placeId)}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              selectedPlace === placeId
                ? "border-2 border-primary ring-2 ring-primary/20"
                : "border-2 hover:border-primary/50"
            }`}
          >
            <CardContent className="pt-6 text-center space-y-4">
              <div className="text-6xl">{place.icon}</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{place.label}</h3>
                <p className="text-muted-foreground">{place.description}</p>
              </div>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}

