import { View, Text, Pressable, StyleSheet } from "react-native";
import products from "../data/products";

export default function Cart() {
  const products = products;

  if (products && products.length > 0) {
    return (
      <View style={styles.container}>
        {products.map((product) => (
          <View key={product.id} style={styles.card}>
            <Pressable
              onPress={() => console.log("Remove product", product.id)}
              style={styles.pressable}
            >
              <Text style={styles.name}>Remove</Text>
            </Pressable>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.empty}>Your cart is empty.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // black background
    padding: 16,
  },

  card: {
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  pressable: {
    gap: 4,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  price: {
    color: "#ccc",
    fontSize: 14,
  },

  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
