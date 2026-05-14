import { Heart, BookHeart, Star, ArrowRight, Package, Grid, ShoppingBag } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { getColors, Spacing, Radius, Typography } from "@/app/styles/global";
import S from "@/app/styles/global";
import Footer from "@/app/components/Footer";

export default function HomeScreen() {
  const router = useRouter();
  const { wishlist } = useWishlist();
  const { isDark } = useTheme();
  const Colors = getColors(isDark);
  

  const styles = useMemo(
    () =>
      StyleSheet.create({
        heroTitle: {
          color: Colors.textPrimary,
          fontSize: Typography.h1,
          fontWeight: Typography.extrabold,
          letterSpacing: -0.8,
        },
        wishlistBtn: {
          width: 44,
          height: 44,
          borderRadius: Radius.full,
          backgroundColor: Colors.card,
          borderWidth: 1.5,
          borderColor: Colors.border,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
        wishBadge: {
          position: "absolute",
          top: -4,
          right: -4,
          backgroundColor: Colors.danger,
          minWidth: 16,
          height: 16,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 3,
          borderWidth: 1.5,
          borderColor: "#fff",
        },
        wishBadgeText: {
          color: "#fff",
          fontSize: 9,
          fontWeight: "800",
        },
        heroBanner: {
          backgroundColor: Colors.accent,
          borderRadius: Radius.xxl,
          padding: Spacing.xxl,
          marginBottom: Spacing.xl,
          overflow: "hidden",
          position: "relative",
          shadowColor: "#4f46e5",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 20,
          elevation: 10,
        },
        heroBannerInner: {
          gap: Spacing.md,
          zIndex: 1,
        },
        heroBannerLabel: {
          color: "#ffffff88",
          fontSize: Typography.xs,
          fontWeight: Typography.semibold,
          letterSpacing: 1,
        },
        heroBannerTitle: {
          color: "#fff",
          fontSize: Typography.h2,
          fontWeight: Typography.extrabold,
          letterSpacing: -0.5,
          lineHeight: 34,
        },
        heroBannerSub: {
          color: "#ffffffaa",
          fontSize: Typography.sm,
        },
        heroCta: {
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.sm,
          alignSelf: "flex-start",
          backgroundColor: "#ffffff20",
          borderRadius: Radius.full,
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.sm + 2,
          borderWidth: 1,
          borderColor: "#ffffff30",
          marginTop: Spacing.sm,
        },
        heroCtaText: {
          color: "#fff",
          fontSize: Typography.base,
          fontWeight: Typography.bold,
        },
        heroBannerBlob: {
          position: "absolute",
          right: -40,
          top: -40,
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: "#ffffff10",
        },
        statsRow: {
          flexDirection: "row",
          gap: Spacing.sm,
          marginBottom: Spacing.xl,
        },
        statCard: {
          flex: 1,
          backgroundColor: Colors.card,
          borderRadius: Radius.lg,
          padding: Spacing.md,
          alignItems: "center",
          gap: Spacing.xs,
          borderWidth: 1,
          borderColor: Colors.border,
          shadowColor: "#1e293b",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        statIcon: {
          width: 32,
          height: 32,
          borderRadius: Radius.sm,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        },
        statValue: {
          fontSize: Typography.xl,
          fontWeight: Typography.extrabold,
          letterSpacing: -0.3,
        },
        statLabel: {
          color: Colors.textMuted,
          fontSize: Typography.xs,
          fontWeight: Typography.medium,
        },
        sectionHeading: {
          color: Colors.textPrimary,
          fontSize: Typography.lg,
          fontWeight: Typography.bold,
        },
        seeAllBtn: {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        },
        seeAllText: {
          color: Colors.accent,
          fontSize: Typography.sm,
          fontWeight: Typography.semibold,
        },
        popularCard: {
          width: 160,
          backgroundColor: Colors.bg,
          borderRadius: Radius.lg,
          padding: Spacing.md,
          marginHorizontal: Spacing.sm,
          borderWidth: 1,
          borderColor: Colors.border,
          gap: 4,
        },
        popularTop: {
          width: 40,
          height: 40,
          borderRadius: Radius.sm,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: Spacing.sm,
        },
        popularName: {
          color: Colors.textPrimary,
          fontSize: Typography.sm,
          fontWeight: Typography.semibold,
          lineHeight: 18,
        },
        popularRating: {
          color: Colors.textMuted,
          fontSize: Typography.xs,
          fontWeight: Typography.medium,
        },
        popularPrice: {
          color: Colors.accent,
          fontSize: Typography.lg,
          fontWeight: Typography.bold,
          letterSpacing: -0.3,
        },
        popularStock: {
          paddingHorizontal: Spacing.sm,
          paddingVertical: 3,
          borderRadius: Radius.full,
          alignSelf: "flex-start",
          marginTop: 4,
        },
      }),
    [Colors],
  );

  const favProducts = [
    { id: 1, pName: "StreetCore Oversized Hoodie", price: 65, category: "Hoodies", rating: 4.3, stock: 12, inStock: true, description: "Heavy oversized hoodie with soft streetwear cotton blend." },
    { id: 2, pName: "UrbanFlex Cargo Pants", price: 55, category: "Pants", rating: 4.1, stock: 0, inStock: false, description: "Slim cargo pants with utility pockets." },
    { id: 3, pName: "NeoWave Graphic Tee", price: 25, category: "T-Shirts", rating: 4.5, stock: 34, inStock: true, description: "Futuristic neon graphic cotton tee." },
    { id: 4, pName: "CloudStep Joggers", price: 50, category: "Pants", rating: 4.2, stock: 7, inStock: true, description: "Ultra-soft joggers for daily comfort." },
    { id: 5, pName: "Midnight Drift Jacket", price: 90, category: "Jackets", rating: 4.6, stock: 5, inStock: true, description: "Dark matte wind-resistant jacket." },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView
        style={S.screenNoPad}
        contentContainerStyle={{ padding: Spacing.lg, paddingTop: Spacing.xl, paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={S.blobTop} pointerEvents="none" />
        <View style={S.blobBottom} pointerEvents="none" />

        {/* Header */}
        <View style={[S.screenHeader, { marginBottom: Spacing.xl, backgroundColor: Colors.bg }]}>
          <View>
            <Text style={S.caption}>Welcome back 👋</Text>
            <Text style={styles.heroTitle}>ShopApp</Text>
          </View>
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => router.push("/(tabs)/wishlist")}
          >
            <Heart color={Colors.danger} fill={wishlist.length > 0 ? Colors.danger : "transparent"} size={20} />
            {wishlist.length > 0 && (
              <View style={styles.wishBadge}>
                <Text style={styles.wishBadgeText}>{wishlist.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={styles.heroBanner}>
          <View style={styles.heroBannerInner}>
            <Text style={styles.heroBannerLabel}>✦ Featured Collection</Text>
            <Text style={styles.heroBannerTitle}>
              Explore our{"\n"}latest styles
            </Text>
            <Text style={styles.heroBannerSub}>Trending items handpicked for you.</Text>
            <TouchableOpacity
              style={styles.heroCta}
              onPress={() => router.push("/(tabs)/catalogue")}
            >
              <Text style={styles.heroCtaText}>Browse Catalogue</Text>
              <ArrowRight size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.heroBannerBlob} />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { Icon: Package, value: "50+", label: "Products", color: Colors.accent },
            { Icon: Grid, value: "10", label: "Categories", color: Colors.accentMid },
            { Icon: Heart, value: String(wishlist.length), label: "Saved", color: Colors.danger },
          ].map(({ Icon, value, label, color }, i) => (
            <View key={label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: color + "18" }]}>
                <Icon size={16} color={color} />
              </View>
              <Text style={[styles.statValue, { color }]}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Popular products */}
        <View style={S.card}>
          <View style={[S.rowBetween, { marginBottom: Spacing.lg }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.sm }}>
              <Heart color={Colors.danger} fill={Colors.danger} size={18} />
              <Text style={styles.sectionHeading}>Most Popular</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/Products")} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all</Text>
              <ArrowRight size={12} color={Colors.accent} />
            </TouchableOpacity>
          </View>
          <Text style={[S.caption, { marginBottom: Spacing.md }]}>Most wishlisted products worldwide</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -Spacing.sm }}>
            {favProducts.map((item) => (
              <View key={item.id} style={styles.popularCard}>
                <View style={[styles.popularTop, { backgroundColor: item.inStock ? Colors.successBg : Colors.dangerBg }]}>
                  <ShoppingBag size={20} color={item.inStock ? Colors.success : Colors.danger} />
                </View>
                <Text style={styles.popularName} numberOfLines={2}>{item.pName}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginVertical: 4 }}>
                  <Star color={Colors.gold} fill={Colors.gold} size={12} />
                  <Text style={styles.popularRating}>{item.rating}</Text>
                </View>
                <Text style={styles.popularPrice}>${item.price}</Text>
                <View style={[styles.popularStock, { backgroundColor: item.inStock ? Colors.successBg : Colors.dangerBg }]}>
                  <Text style={{ color: item.inStock ? Colors.success : Colors.danger, fontSize: Typography.xs, fontWeight: Typography.semibold }}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

