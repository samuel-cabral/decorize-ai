"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PLACES, type PlaceType, type RoomType } from "@/lib/places-rooms";
import { Check } from "lucide-react";

interface RoomSelectorProps {
  placeType: PlaceType;
  selectedRooms: string[];
  onRoomToggle: (roomId: string) => void;
}

export function RoomSelector({
  placeType,
  selectedRooms,
  onRoomToggle,
}: RoomSelectorProps) {
  const availableRooms = PLACES[placeType].rooms;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {availableRooms.map((room: RoomType) => {
        const isSelected = selectedRooms.includes(room.id);

        return (
          <Card
            key={room.id}
            onClick={() => onRoomToggle(room.id)}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              isSelected
                ? "border-2 border-primary ring-2 ring-primary/20"
                : "border-2 hover:border-primary/50"
            }`}
          >
            <CardContent className="pt-6 text-center space-y-3 relative">
              {isSelected && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className="text-4xl">{room.icon}</div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{room.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {room.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

