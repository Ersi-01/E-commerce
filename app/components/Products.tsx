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

  const addToWishlist = (item: Product) => {
    console.log("Added to wishlist:", item);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ padding: 10, marginBottom: 10, borderWidth: 1 }}>
      
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
      <Text>{item.description}</Text>
      <Text>${item.price}</Text>
      <Text>⭐ {item.rating}</Text>
      <Text>
        {item.inStock ? `In Stock: ${item.stock}` : "Out of Stock"}
      </Text>

      <TouchableOpacity disabled={!item.inStock}>
        <Text>
          {item.inStock ? "Add to Cart" : "Unavailable"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addToWishlist(item)}>
        <Text style={{ color: "red", marginTop: 5 }}>
          ❤️ Add to Wishlist
        </Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Products
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item: Product) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}