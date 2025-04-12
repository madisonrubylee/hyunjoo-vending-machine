export type DrinkType = "COKE" | "WATER" | "COFFEE";

export const DRINK_TYPES: DrinkType[] = ["COKE", "WATER", "COFFEE"];

export const DRINKS: Record<DrinkType, number> = {
  COKE: 1100,
  WATER: 600,
  COFFEE: 700,
};

export const DRINK_EMOJIS: { [key: string]: string } = {
  COKE: "🥤",
  WATER: "💧",
  COFFEE: "☕",
};
