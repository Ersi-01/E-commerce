import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react-native";

import products from "../data/products";
import { getCart, addToCart } from "../storage/cartStorage";
import S, { Spacing, Colors } from "@/app/styles/global";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const currentId = Number(id);
  const product = products.find((p) => p.id === currentId);

  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    async function checkCart() {
      const cart = await getCart();
      const exists = cart.some((p) => p.id === Number(id));
      setInCart(exists);
    }

    checkCart();
  }, [id]);

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
    <ScrollView contentContainerStyle={S.screen} showsVerticalScrollIndicator={false}>
      <View style={[S.screenHeader, { marginBottom: Spacing.lg }]}>
        <Text style={S.heading}>Product Details</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

  
      <View style={[S.cardElevated, { gap: Spacing.md, marginBottom: Spacing.lg }]}>
        <DetailRow label="ID" value={product.id} />
        <DetailRow label="Name" value={product.name} />
        <DetailRow label="Category" value={product.category} />
        <DetailRow label="Description" value={product.description} />
        <DetailRow label="Rating" value={`⭐ ${product.rating}`} />
        <DetailRow label="Price" value={`€${product.price}`} />
        <DetailRow label="Stock" value={product.inStock ? `${product.stock} available` : "Out of Stock"} />
        <DetailRow label="Status" value={product.inStock ? "In Stock" : "Out of Stock"} highlight={!product.inStock}/>
      </View>

      <TouchableOpacity
        style={[
          S.btnPrimary,
          (!product.inStock || inCart) && S.btnDisabled,
          { marginBottom: Spacing.lg },
        ]}
        onPress={handleAddToCart}
        disabled={!product.inStock || inCart}
        activeOpacity={0.85}
      >
        <Text style={S.btnPrimaryText}>
          {!product.inStock
            ? "Out of Stock"
            : inCart
            ? "Already in Cart"
            : "Add to Cart"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function DetailRow({ label, value, highlight }: { label: string; value: any; highlight?: boolean }) {
  return (
    <View style={[S.rowBetween, { paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border }]}>
      <Text style={S.label}>{label}:</Text>
      <Text style={[
        S.body,
        highlight && { color: Colors.danger, fontWeight: "700" }
      ]}>
        {String(value)}
      </Text>
    </View>
  );
}