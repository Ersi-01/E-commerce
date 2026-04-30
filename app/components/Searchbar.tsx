import React, { useState } from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import products from "./data/products"; 

export default function Searchbar() {
  const [search, setSearch] = useState("");

  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
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
          marginBottom: 20,
        }}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()} // important because id is a number
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: "gray" }}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}
