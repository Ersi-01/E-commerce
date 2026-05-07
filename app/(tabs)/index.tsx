import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useWishlist } from "../context/WishlistContext";
import { Colors, Spacing, Radius, Typography, Shadows } from "@/app/styles/global";
import S from "@/app/styles/global";

export default function HomeScreen() {
  const router = useRouter();
  const { wishlist } = useWishlist();

  return (
    <ScrollView
      style={S.screenNoPad}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={S.blobTop} pointerEvents="none" />
      <View style={S.blobBottom} pointerEvents="none" />

    
      <View style={S.screenHeader}>
        <View>
          <Text style={S.caption}>Welcome back 👋</Text>
          <Text style={styles.appName}>ShopApp</Text>
        </View>
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => router.push("/(tabs)/wishlist")}
        >
          <Text style={styles.heartIcon}>❤️</Text>
          {wishlist.length > 0 && (
            <View style={[S.badge, styles.badgeOverlay]}>
              <Text style={S.badgeText}>{wishlist.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

    
      <View style={[S.cardElevated, styles.hero]}>
        <Text style={S.label}>Featured</Text>
        <Text style={styles.heroTitle}>Explore our{"\n"}latest products in clothes</Text>
        <Text style={S.body}>Discover trending items handpicked for you.</Text>
        <TouchableOpacity
          style={[S.btnPrimary, styles.heroBtn]}
          onPress={() => router.push("/(tabs)/catalogue")}
        >
          <Text style={S.btnPrimaryText}>Browse Catalogue →</Text>
        </TouchableOpacity>
      </View>

    
      <View style={[S.card, styles.statsRow]}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>120+</Text>
          <Text style={S.caption}>Products</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={S.caption}>Categories</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: Colors.accent }]}>
            {wishlist.length}
          </Text>
          <Text style={S.caption}>Saved</Text>
        </View>
      </View>

  
      <Text style={S.sectionTitle}>Quick Access</Text>

      <View style={S.rowWrap}>
        <TouchableOpacity
          style={[S.card, styles.navCard]}
          onPress={() => router.push("/(tabs)/catalogue")}
          activeOpacity={0.75}
        >
          <Text style={styles.navIcon}>🛍️</Text>
          <Text style={S.subheading}>Catalogue</Text>
          <Text style={S.caption}>Browse all products</Text>
          <Text style={styles.navArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[S.card, styles.navCard]}
          onPress={() => router.push("/(tabs)/Cart")}
          activeOpacity={0.75}
        >
          <Text style={styles.navIcon}>🛒</Text>
          <Text style={S.subheading}>Cart</Text>
          <Text style={S.caption}>View your cart</Text>
          <Text style={styles.navArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[S.card, styles.navCardAccent]}
          onPress={() => router.push("/(tabs)/wishlist")}
          activeOpacity={0.75}
        >
          <Text style={styles.navIcon}>❤️</Text>
          <Text style={[S.subheading, { color: Colors.accent }]}>Wishlist</Text>
          <Text style={S.caption}>Your saved items</Text>
          <Text style={[styles.navArrow, { color: Colors.accent }]}>→</Text>
        </TouchableOpacity>
      </View>

      <Text style={[S.caption, styles.footer]}>ShopApp • v1.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl + Spacing.xxl,
    paddingBottom: Spacing.xxxl,
  },
  appName: {
    color: Colors.textPrimary,
    fontSize: Typography.h1,
    fontWeight: Typography.extrabold,
    letterSpacing: -0.5,
  },
  heartBtn: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  heartIcon: {
    fontSize: Typography.xl,
  },
  badgeOverlay: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: Colors.danger,
  },
  hero: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  heroTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.h1,
    fontWeight: Typography.extrabold,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  heroBtn: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.xl,
    height: 48,
    borderRadius: Radius.xxl,
    marginTop: Spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    color: Colors.textPrimary,
    fontSize: Typography.xxl,
    fontWeight: Typography.extrabold,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
  navCard: {
    flex: 1,
    minWidth: "45%",
    gap: Spacing.xs,
  },
  navCardAccent: {
    flex: 1,
    minWidth: "45%",
    gap: Spacing.xs,
    borderColor: Colors.accent,
  },
  navIcon: {
    fontSize: Typography.xxl,
    marginBottom: Spacing.xs,
  },
  navArrow: {
    color: Colors.textDim,
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    marginTop: Spacing.sm,
  },
  footer: {
    textAlign: "center",
    marginTop: Spacing.xxxl,
  },
});