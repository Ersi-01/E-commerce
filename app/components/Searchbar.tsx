import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Radius, Typography } from "@/app/styles/global";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Searchbar({ search, setSearch }: Props) {
  return (
    <View style={styles.wrapper}>
      <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.icon} />
      <TextInput
        placeholder="Search products..."
        value={search}
        placeholderTextColor={Colors.textMuted}
        onChangeText={setSearch}
        style={styles.input}
      />
      {search.length > 0 && (
        <Ionicons
          name="close-circle"
          size={18}
          color={Colors.textMuted}
          onPress={() => setSearch("")}
          style={styles.clear}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.input,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 48,
    marginBottom: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.base,
  },
  clear: {
    marginLeft: Spacing.sm,
  },
});
