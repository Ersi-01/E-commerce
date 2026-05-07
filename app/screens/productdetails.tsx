import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";

import products from "../data/products";
import { getCart, addToCart } from "../storage/cartStorage";

import S, { Spacing } from "@/app/styles/global";

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
      pathname: "screens/productdetails",
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
      <View style={S.centered}>
        <Text style={S.outOfStock}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={S.screen}>
      <Text style={S.heading}>Product Details</Text>

      <View style={[S.card, { gap: Spacing.sm }]}>
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
          S.btnPrimary,
          (!product.inStock || inCart) && S.btnDisabled,
          { marginTop: Spacing.lg },
        ]}
        onPress={handleAddToCart}
        disabled={!product.inStock || inCart}
      >
        <Text style={S.btnPrimaryText}>
          {!product.inStock
            ? "Out of Stock"
            : inCart
            ? "Already in Cart"
            : "Add to Cart"}
        </Text>
      </Pressable>

      <View style={[S.rowBetween, { marginTop: Spacing.lg, gap: Spacing.sm }]}>
        <Pressable
          style={[
            S.btnSecondary,
            !prevProduct && { opacity: 0.5 },
            { flex: 1 },
          ]}
          disabled={!prevProduct}
          onPress={() => prevProduct && goToProduct(prevProduct.id)}
        >
          <Text style={S.btnSecondaryText}>Previous</Text>
        </Pressable>

        <Pressable
          style={[
            S.btnSecondary,
            !nextProduct && { opacity: 0.5 },
            { flex: 1 },
          ]}
          disabled={!nextProduct}
          onPress={() => nextProduct && goToProduct(nextProduct.id)}
        >
          <Text style={S.btnSecondaryText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={S.rowWrap}>
      <Text style={S.label}>{label}:</Text>
      <Text style={S.body}>{String(value)}</Text>
    </View>
  );
}