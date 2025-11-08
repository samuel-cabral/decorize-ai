export type PlaceType = "house" | "apartment";

export interface RoomType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PlaceConfig {
  label: string;
  description: string;
  icon: string;
  rooms: RoomType[];
}

export const ROOM_TYPES: Record<string, RoomType> = {
  living_room: {
    id: "living_room",
    name: "Sala de Estar",
    icon: "🛋️",
    description: "Espaço principal de convivência",
  },
  dining_room: {
    id: "dining_room",
    name: "Sala de Jantar",
    icon: "🍽️",
    description: "Local para refeições",
  },
  kitchen: {
    id: "kitchen",
    name: "Cozinha",
    icon: "👨‍🍳",
    description: "Área de preparo de alimentos",
  },
  master_bedroom: {
    id: "master_bedroom",
    name: "Quarto Principal",
    icon: "🛏️",
    description: "Suíte master",
  },
  bedroom: {
    id: "bedroom",
    name: "Quarto",
    icon: "🛌",
    description: "Dormitório",
  },
  bathroom: {
    id: "bathroom",
    name: "Banheiro",
    icon: "🚿",
    description: "Área de higiene",
  },
  laundry_room: {
    id: "laundry_room",
    name: "Lavanderia",
    icon: "🧺",
    description: "Espaço para lavar roupas",
  },
  garage: {
    id: "garage",
    name: "Garagem",
    icon: "🚗",
    description: "Estacionamento interno",
  },
  backyard: {
    id: "backyard",
    name: "Quintal",
    icon: "🌳",
    description: "Área externa",
  },
  service_area: {
    id: "service_area",
    name: "Área de Serviço",
    icon: "🧹",
    description: "Espaço de apoio",
  },
  balcony: {
    id: "balcony",
    name: "Varanda",
    icon: "🪴",
    description: "Área externa coberta",
  },
  home_office: {
    id: "home_office",
    name: "Home Office",
    icon: "💻",
    description: "Escritório em casa",
  },
};

export const PLACES: Record<PlaceType, PlaceConfig> = {
  house: {
    label: "Casa",
    description: "Residência com múltiplos ambientes",
    icon: "🏠",
    rooms: [
      ROOM_TYPES.living_room,
      ROOM_TYPES.dining_room,
      ROOM_TYPES.kitchen,
      ROOM_TYPES.master_bedroom,
      ROOM_TYPES.bedroom,
      ROOM_TYPES.bathroom,
      ROOM_TYPES.laundry_room,
      ROOM_TYPES.garage,
      ROOM_TYPES.backyard,
      ROOM_TYPES.home_office,
    ],
  },
  apartment: {
    label: "Apartamento",
    description: "Unidade residencial em edifício",
    icon: "🏢",
    rooms: [
      ROOM_TYPES.living_room,
      ROOM_TYPES.dining_room,
      ROOM_TYPES.kitchen,
      ROOM_TYPES.bedroom,
      ROOM_TYPES.bathroom,
      ROOM_TYPES.service_area,
      ROOM_TYPES.balcony,
      ROOM_TYPES.home_office,
    ],
  },
};

