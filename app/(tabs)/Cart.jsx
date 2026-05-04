import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../storage/cartStorage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { router } from "expo-router";


export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );


  async function loadCart() {
    const data = await getCart();
    setCartProducts(data);
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleRemove(id) {
    await removeFromCart(id);
    loadCart();
  }

  if (cartProducts.length > 0) {
    return (
      <View style={styles.container}>
        {cartProducts.map((product) => (
          <View key={product.id} style={styles.card}>
            <Pressable
              onPress={() => handleRemove(product.id)}
              style={styles.pressable}
            >
              <Text style={styles.name}>Remove</Text>
            </Pressable>

            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
          </View>
        ))}
        <Pressable
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Go to Checkout</Text>
        </Pressable>
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
    backgroundColor: "#000",
    padding: 16,
    justifyContent: "space-between",
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
  checkoutButton: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  checkoutText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
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