import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme, View } from "react-native";
import { applyTheme } from "@/app/styles/global";

export type ThemeMode = "dark" | "light" | "system";

type ThemeContextType = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("dark");
  const [tick, setTick] = useState(0);

  const isDark =
    themeMode === "system" ? systemScheme === "dark" : themeMode === "dark";

  useEffect(() => {
    AsyncStorage.getItem("@theme_mode").then((saved) => {
      if (saved === "dark" || saved === "light" || saved === "system") {
        setThemeModeState(saved as ThemeMode);
      }
    });
  }, []);

  useEffect(() => {
    applyTheme(isDark);
    setTick((t) => t + 1);
  }, [isDark]);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem("@theme_mode", mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      <View key={tick} style={{ flex: 1 }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}