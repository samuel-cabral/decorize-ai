export interface DecorationStyle {
  id: string;
  name: string;
  description: string;
  category: string;
  emoji: string;
  color?: string;
}

export const decorationStyles: DecorationStyle[] = [
  // Modernos e Minimalistas
  {
    id: "moderno",
    name: "Moderno",
    description: "Linhas limpas, design minimalista e móveis contemporâneos",
    category: "Modernos",
    emoji: "✨",
    color: "bg-blue-500",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Menos é mais - espaços limpos e despojados",
    category: "Modernos",
    emoji: "⚪",
    color: "bg-gray-400",
  },
  {
    id: "escandinavo",
    name: "Escandinavo",
    description: "Paleta de cores claras, madeira clara e texturas naturais",
    category: "Modernos",
    emoji: "🏔️",
    color: "bg-cyan-300",
  },
  {
    id: "contemporaneo",
    name: "Contemporâneo",
    description: "Mistura de estilos modernos com elementos atuais",
    category: "Modernos",
    emoji: "🎨",
    color: "bg-purple-500",
  },
  // Tradicionais e Elegantes
  {
    id: "classico",
    name: "Clássico",
    description: "Mobiliário elegante, cores tradicionais e detalhes refinados",
    category: "Tradicionais",
    emoji: "👑",
    color: "bg-amber-500",
  },
  {
    id: "romantico",
    name: "Romântico",
    description: "Toques delicados, cores suaves e ambiente acolhedor",
    category: "Tradicionais",
    emoji: "💕",
    color: "bg-pink-300",
  },
  // Industriais e Urbanos
  {
    id: "industrial",
    name: "Industrial",
    description: "Materiais brutos, metais expostos e estética urbana",
    category: "Urbanos",
    emoji: "🏭",
    color: "bg-orange-600",
  },
  // Naturais e Rústicos
  {
    id: "rustico",
    name: "Rústico",
    description: "Madeira rústica, texturas naturais e aconchego campestre",
    category: "Naturais",
    emoji: "🌾",
    color: "bg-amber-700",
  },
  // Ecléticos e Vibrantes
  {
    id: "bohemio",
    name: "Bohêmio",
    description: "Cores vibrantes, padrões étnicos e decoração eclética",
    category: "Ecléticos",
    emoji: "🌺",
    color: "bg-pink-400",
  },
];

export const styleCategories = [
  "Modernos",
  "Tradicionais",
  "Urbanos",
  "Naturais",
  "Ecléticos",
] as const;
