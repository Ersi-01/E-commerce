import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import products from "../data/products";
import { getCart, addToCart } from "../storage/cartStorage";
import { useEffect, useState } from "react";


export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(id));

  const currentId = Number(id);
  const prevProduct = products.find((p) => p.id === currentId - 1);
  const nextProduct = products.find((p) => p.id === currentId + 1);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    async function checkCart() {
      const cart = await getCart();
      const exists = cart.some((p) => p.id === Number(id));
      setInCart(exists);
    }

    checkCart();
  }, [id]);

  function goToProduct(productId: number) {
    router.push({
      pathname: "/productdetails",
      params: { id: productId },
    });
  }


  async function handleAddToCart() {
    if (!product) return;

    const cart = await getCart();
    const exists = cart.some((p) => p.id === product.id);

    if (exists) {
      setInCart(true);
      return;
    }

    await addToCart(product);
    setInCart(true);
    alert(`Success. Added to cart: ${product.name}.`);
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Product Details</Text>

      <View style={styles.card}>
        <DetailRow label="ID" value={product.id} />
        <DetailRow label="Name" value={product.name} />
        <DetailRow label="Category" value={product.category} />
        <DetailRow label="Description" value={product.description} />
        <DetailRow label="Rating" value={product.rating} />
        <DetailRow label="Price" value={`${product.price}€`} />
        <DetailRow label="Stock" value={product.stock} />
      </View>

      <Pressable
        style={[
          styles.button,
          (!product.inStock || inCart) && styles.buttonDisabled
        ]}
        onPress={handleAddToCart}
        disabled={!product.inStock || inCart}
      >
        <Text style={styles.buttonText}>
          {!product.inStock
            ? "Out of Stock"
            : inCart
              ? "Already in Cart"
              : "Add to Cart"}
        </Text>
      </Pressable>

      <View style={styles.navContainer}>
        <Pressable
          style={[styles.navButton, !prevProduct && { opacity: 0.5 }]}
          disabled={!prevProduct}
          onPress={() => prevProduct && goToProduct(prevProduct.id)}
        >
          <Text style={styles.navText}>Previous</Text>
        </Pressable>

        <Pressable
          style={[styles.navButton, !nextProduct && { opacity: 0.5 }]}
          disabled={!nextProduct}
          onPress={() => nextProduct && goToProduct(nextProduct.id)}
        >
          <Text style={styles.navText}>Next</Text>
        </Pressable>
      </View>
      
    </ScrollView>

  );
}

type DetailRowProps = {
  label: string;
  value: string | number;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { fontSize: 18, color: "red" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#777",
    opacity: 0.6,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },

  navButton: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  navButtonDisabled: {
    backgroundColor: "#1a1a1a",
    opacity: 0.5,
  },

  navText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  label: { fontWeight: "600", fontSize: 15, color: "#333" },
  value: { fontSize: 15, color: "#555", flexShrink: 1 },
});