import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingBag, Star, Tag } from "lucide-react-native";

import products from "../data/products";
import { getCart, addToCart } from "../storage/cartStorage";
import S, { Spacing, Colors, Radius, Typography } from "@/app/styles/global";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(id));

  const currentId = Number(id);
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
    if (exists) { setInCart(true); return; }
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
    <ScrollView style={S.screenNoPad} contentContainerStyle={{ padding: Spacing.lg, paddingBottom: 48 }} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[S.screenHeader, { marginBottom: Spacing.xl }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Product hero card */}
      <View style={styles.heroCard}>
        <View style={styles.heroTop}>
          <View style={styles.categoryBadge}>
            <Tag size={10} color={Colors.accent} />
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
          <View style={[styles.stockBadge, !product.inStock && styles.stockBadgeOut]}>
            <Text style={[styles.stockText, !product.inStock && styles.stockTextOut]}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        <Text style={styles.productName}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Star size={14} color={Colors.gold} fill={Colors.gold} />
          <Text style={styles.rating}>{product.rating}</Text>
          {product.inStock && (
            <Text style={styles.stockCount}>· {product.stock} available</Text>
          )}
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>€{product.price}</Text>
        </View>
      </View>

      {/* Details grid */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Details</Text>
        {[
          { label: "Product ID", value: `#${product.id}` },
          { label: "Category", value: product.category },
          { label: "Rating", value: `⭐ ${product.rating} / 5` },
          { label: "Stock count", value: product.inStock ? `${product.stock} units` : "—" },
        ].map((row, i, arr) => (
          <View key={row.label} style={[styles.detailRow, i < arr.length - 1 && styles.detailRowBorder]}>
            <Text style={styles.detailLabel}>{row.label}</Text>
            <Text style={styles.detailValue}>{row.value}</Text>
          </View>
        ))}
      </View>

      {/* Add to cart */}
      <TouchableOpacity
        style={[S.btnPrimary, (!product.inStock || inCart) && S.btnDisabled, { marginBottom: Spacing.md }]}
        onPress={handleAddToCart}
        disabled={!product.inStock || inCart}
        activeOpacity={0.85}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
          <ShoppingBag size={18} color="#fff" />
          <Text style={S.btnPrimaryText}>
            {!product.inStock ? "Out of Stock" : inCart ? "Already in Cart" : "Add to Cart"}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    letterSpacing: -0.2,
  },
  heroCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  categoryText: {
    color: Colors.accent,
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
  },
  stockBadge: {
    backgroundColor: Colors.successBg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  stockBadgeOut: {
    backgroundColor: Colors.dangerBg,
  },
  stockText: {
    color: Colors.success,
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
  },
  stockTextOut: {
    color: Colors.danger,
  },
  productName: {
    color: Colors.textPrimary,
    fontSize: Typography.h2,
    fontWeight: Typography.extrabold,
    letterSpacing: -0.4,
    lineHeight: 32,
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  rating: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  stockCount: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
  },
  description: {
    color: Colors.textSecondary,
    fontSize: Typography.base,
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  priceLabel: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  price: {
    color: Colors.accent,
    fontSize: Typography.h2,
    fontWeight: Typography.extrabold,
    letterSpacing: -0.5,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailsTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    marginBottom: Spacing.lg,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  detailLabel: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
  },
  detailValue: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  navBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    gap: Spacing.xs,
  },
  navBtnText: {
    color: Colors.textSecondary,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
});
