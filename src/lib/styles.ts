export interface DecorationStyle {
  id: string;
  name: string;
  description: string;
  color?: string;
}

export const decorationStyles: DecorationStyle[] = [
  {
    id: "moderno",
    name: "Moderno",
    description: "Linhas limpas, design minimalista e móveis contemporâneos",
    color: "bg-blue-500",
  },
  {
    id: "classico",
    name: "Clássico",
    description: "Mobiliário elegante, cores tradicionais e detalhes refinados",
    color: "bg-amber-500",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Menos é mais - espaços limpos e despojados",
    color: "bg-gray-400",
  },
  {
    id: "escandinavo",
    name: "Escandinavo",
    description: "Paleta de cores claras, madeira clara e texturas naturais",
    color: "bg-cyan-300",
  },
  {
    id: "industrial",
    name: "Industrial",
    description: "Materiais brutos, metais expostos e estética urbana",
    color: "bg-orange-600",
  },
  {
    id: "rustico",
    name: "Rústico",
    description: "Madeira rústica, texturas naturais e aconchego campestre",
    color: "bg-amber-700",
  },
  {
    id: "bohemio",
    name: "Bohêmio",
    description: "Cores vibrantes, padrões étnicos e decoração eclética",
    color: "bg-pink-400",
  },
  {
    id: "contemporaneo",
    name: "Contemporâneo",
    description: "Mistura de estilos modernos com elementos atuais",
    color: "bg-purple-500",
  },
];
