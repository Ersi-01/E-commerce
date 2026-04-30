import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import products from "./products";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  inStock: boolean;
  description: string;
};

export default function ProductsScreen() {  
  const renderItem = ({ item }: { item: Product }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
      <Text>{item.description}</Text>
      <Text>${item.price}</Text>
      <Text>⭐ {item.rating}</Text>
      <Text>
        {item.inStock ? `In Stock: ${item.stock}` : "Out of Stock"}
      </Text>

      <TouchableOpacity disabled={!item.inStock}>
        <Text>{item.inStock ? "Add to Cart" : "Unavailable"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text>Products</Text>

      <FlatList
        data={products}
        keyExtractor={(item: Product) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}