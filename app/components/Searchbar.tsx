import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import S from "@/app/styles/global";
type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Searchbar({ search, setSearch }: Props) {
  return (
    <View
      style={
        
        S.inputWrapper
      }
    >
      <Ionicons name="search" size={20} color="gray" />

      <TextInput
        placeholder="Search products..."
        value={search}
        placeholderTextColor='grey'
        onChangeText={setSearch}
        style={{
          flex: 1,
          marginLeft: 8,
        }}
      />
    </View>
  );
}