import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

type Product = {
  id: string;
  name: string;
};

export default function Wishlist() {
  // demo data (derisa ta lidhësh me Products)
  const [wishlist, setWishlist] = useState<Product[]>([
    { id: "1", name: "Nike Shoes" },
    { id: "2", name: "iPhone 15" },
  ]);

  const removeItem = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Wishlist</Text>

      {wishlist.length === 0 ? (
        <Text style={styles.empty}>No items in wishlist</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>

              <Pressable
                style={styles.button}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}