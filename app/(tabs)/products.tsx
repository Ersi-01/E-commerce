import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import products from "../data/products";
import { getCart, addToCart } from "../storage/cartStorage";
import { router } from "expo-router";


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


  async function handleAddToCart(item: Product) {
    if (!item.inStock) return;

    const cart = await getCart();

    const alreadyInCart = cart.some((p) => p.id === item.id);

    if (alreadyInCart) {
      alert("Already in cart");
      return;
    }

    await addToCart(item);
    alert(`${item.name} added to cart`);
  }


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

      {/* Add to cart */}
      <TouchableOpacity
        disabled={!item.inStock}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={{ color: item.inStock ? "black" : "gray" }}>
          {item.inStock ? "Add to Cart" : "Unavailable"}
        </Text>
      </TouchableOpacity>

      {/* View details */}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/productdetails",
            params: { id: item.id },
          })
        }
      >
        <Text style={{ color: "blue", marginTop: 5 }}>
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text>Products</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
