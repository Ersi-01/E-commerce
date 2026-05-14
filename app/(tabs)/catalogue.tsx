import React from "react";
import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Catalogue from "../components/catalogue";

export default function CatalogueTab() {
  useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Catalogue />
    </View>
  );
}
