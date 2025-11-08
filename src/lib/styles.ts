export interface DecorationStyle {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color?: string;
}

export const decorationStyles: DecorationStyle[] = [
  {
    id: "moderno",
    name: "Moderno",
    description: "Linhas limpas, design minimalista e móveis contemporâneos",
    emoji: "✨",
    color: "bg-blue-500",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Menos é mais - espaços limpos e despojados",
    emoji: "⚪",
    color: "bg-gray-400",
  },
  {
    id: "escandinavo",
    name: "Escandinavo",
    description: "Paleta de cores claras, madeira clara e texturas naturais",
    emoji: "🏔️",
    color: "bg-cyan-300",
  },
  {
    id: "contemporaneo",
    name: "Contemporâneo",
    description: "Mistura de estilos modernos com elementos atuais",
    emoji: "🎨",
    color: "bg-purple-500",
  },
  {
    id: "classico",
    name: "Clássico",
    description: "Mobiliário elegante, cores tradicionais e detalhes refinados",
    emoji: "👑",
    color: "bg-amber-500",
  },
  {
    id: "romantico",
    name: "Romântico",
    description: "Toques delicados, cores suaves e ambiente acolhedor",
    emoji: "💕",
    color: "bg-pink-300",
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Materiais brutos, metais expostos e estética urbana",
    emoji: "🏭",
    color: "bg-orange-600",
  },
  {
    id: "rustico",
    name: "Rústico",
    description: "Madeira rústica, texturas naturais e aconchego campestre",
    emoji: "🌾",
    color: "bg-amber-700",
  },
  {
    id: "bohemio",
    name: "Bohêmio",
    description: "Cores vibrantes, padrões étnicos e decoração eclética",
    emoji: "🌺",
    color: "bg-pink-400",
  },
  {
    id: "africano",
    name: "Africano",
    description:
      "Padrões tribais, cores terrosas, artefatos artesanais e texturas naturais",
    emoji: "🦁",
    color: "bg-orange-800",
  },
  {
    id: "japones",
    name: "Japonês",
    description:
      "Design zen, elementos naturais, cores neutras e minimalismo tradicional",
    emoji: "🗾",
    color: "bg-red-500",
  },
  {
    id: "chines",
    name: "Chinês",
    description:
      "Móveis elegantes em madeira, elementos de feng shui e cores tradicionais",
    emoji: "🏮",
    color: "bg-red-600",
  },
  {
    id: "indiano",
    name: "Indiano",
    description:
      "Cores vibrantes, tecidos ricos, padrões elaborados e detalhes ornamentais",
    emoji: "🪔",
    color: "bg-yellow-500",
  },
  {
    id: "marroquino",
    name: "Marroquino",
    description:
      "Azulejos coloridos, lanternas decorativas, almofadas e tapetes tradicionais",
    emoji: "🕌",
    color: "bg-amber-600",
  },
  {
    id: "mexicano",
    name: "Mexicano",
    description:
      "Cores vivas, tecidos artesanais, cerâmica colorida e elementos folclóricos",
    emoji: "🌮",
    color: "bg-orange-500",
  },
  {
    id: "mediterraneo",
    name: "Mediterrâneo",
    description:
      "Azuis e brancos, texturas naturais, azulejos e inspiração costeira",
    emoji: "🌊",
    color: "bg-blue-400",
  },
  {
    id: "boho",
    name: "Boho",
    description:
      "Estilo boêmio moderno com plantas, texturas naturais e elementos vintage",
    emoji: "🌿",
    color: "bg-emerald-500",
  },
  {
    id: "tropical",
    name: "Tropical",
    description:
      "Folhagens exuberantes, cores vivas, bambu e inspiração de selva urbana",
    emoji: "🌴",
    color: "bg-green-600",
  },
];
