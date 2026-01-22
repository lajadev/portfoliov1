import { da } from "./da";
import { en } from "./en";
import { de } from "./de";

export const translations = { da, en, de };
export type Language = keyof typeof translations;
export type Dictionary = typeof translations.da;
