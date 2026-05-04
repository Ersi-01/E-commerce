import React from "react";
import { View, TextInput } from "react-native";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Searchbar({ search, setSearch }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
        style={{
          height: 40,
          borderWidth: 1,
          borderColor: "#ccc",
          paddingHorizontal: 10,
          borderRadius: 8,
          backgroundColor: "#fff",
        }}
      />
    </View>
  );
}