import S, { Colors, Radius, Spacing, Typography } from "@/app/styles/global";
import { useRouter } from "expo-router";
import { ArrowLeft, ChevronRight } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🛍️", desc: "Browse everything" },
  { id: "Hoodies", name: "Hoodies", icon: "👕", desc: "Oversized & cozy" },
  { id: "Pants", name: "Pants", icon: "👖", desc: "Cargo & slim fit" },
  { id: "T-Shirts", name: "T-Shirts", icon: "👔", desc: "Graphic & plain" },
  { id: "Jackets", name: "Jackets", icon: "🧥", desc: "Wind & waterproof" },
  { id: "Jeans", name: "Jeans", icon: "👖", desc: "Classic denim" },
  { id: "Shorts", name: "Shorts", icon: "🩳", desc: "Summer essentials" },
  { id: "Shirts", name: "Shirts", icon: "👕", desc: "Casual & formal" },
  { id: "Tops", name: "Tops", icon: "🎽", desc: "Lightweight layers" },
  { id: "Sweaters", name: "Sweaters", icon: "🧶", desc: "Knits & pullover" },
  { id: "Sweatshirts", name: "Sweatshirts", icon: "👚", desc: "Street comfort" },
];

export default function Catalogue() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === "all") {
      router.push("/(tabs)/Products");
    } else {
      router.push({ pathname: "/(tabs)/Products", params: { category: categoryId } });
    }
  };

  return (
    <View style={S.screen}>
      {/* Header */}
      <View style={[S.screenHeader, { marginBottom: Spacing.xl }]}>
        <View>
          <Text style={S.label}>Browse by</Text>
          <Text style={styles.title}>Catalogue</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Featured - "All Products" */}
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => handleCategoryPress("all")}
        activeOpacity={0.85}
      >
        <View>
          <Text style={styles.featuredIcon}>🛍️</Text>
          <Text style={styles.featuredTitle}>All Products</Text>
          <Text style={styles.featuredDesc}>Browse our full collection</Text>
        </View>
        <ChevronRight size={20} color="#fff" />
      </TouchableOpacity>

      {/* Categories list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.xl }}
      >
        {CATEGORIES.slice(1).map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category.id)}
            activeOpacity={0.85}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{category.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.catName}>{category.name}</Text>
              <Text style={styles.catDesc}>{category.desc}</Text>
            </View>
            <ChevronRight size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer hint */}
      <View style={styles.footer}>
        <Text style={S.caption}>{CATEGORIES.length - 1} categories available</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.h1,
    fontWeight: Typography.extrabold,
    letterSpacing: -0.5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredCard: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 7,
  },
  featuredIcon: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    letterSpacing: -0.2,
  },
  featuredDesc: {
    color: "#ffffff99",
    fontSize: Typography.sm,
    marginTop: 2,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.input,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: {
    fontSize: Typography.xxl,
  },
  catName: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  catDesc: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    marginTop: 2,
  },
  footer: {
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: "center",
  },
});
