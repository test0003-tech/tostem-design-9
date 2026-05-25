"use client";

import { create } from "zustand";
import { themes, type ThemeColors } from "@/lib/themes";

interface ThemeStore {
  currentTheme: ThemeColors;
  setCurrentTheme: (theme: ThemeColors) => void;
  designStyle: string;
  setDesignStyle: (style: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  currentTheme: themes[0],
  setCurrentTheme: (theme) => set({ currentTheme: theme }),
  designStyle: "modern",
  setDesignStyle: (style) => set({ designStyle: style }),
}));
