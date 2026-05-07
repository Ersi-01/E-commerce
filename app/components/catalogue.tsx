// Your existing catalogue route file - just replace the content
import S, { Colors, Radius, Spacing, Typography } from "@/app/styles/global";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🛍️" },
  { id: "Hoodies", name: "Hoodies", icon: "👕" },
  { id: "Pants", name: "Pants", icon: "👖" },
  { id: "T-Shirts", name: "T-Shirts", icon: "👔" },
  { id: "Jackets", name: "Jackets", icon: "🧥" },
  { id: "Jeans", name: "Jeans", icon: "👖" },
  { id: "Shorts", name: "Shorts", icon: "🩳" },
  { id: "Shirts", name: "Shirts", icon: "👕" },
  { id: "Tops", name: "Tops", icon: "🎽" },
  { id: "Sweaters", name: "Sweaters", icon: "🧶" },
  { id: "Sweatshirts", name: "Sweatshirts", icon: "👚" },
];

export default function Catalogue() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    if (categoryId === "all") {
      router.push("/(tabs)/Products");
    } else {
      router.push({
        pathname: "/(tabs)/Products",
        params: { category: categoryId },
      });
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
          <ArrowLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.xl }}
      >
        {CATEGORIES.map((category, index) => (
          <TouchableOpacity
            key={category.id}
            style={[
              S.card,
              styles.categoryCard,
              index === 0 && styles.categoryCardFirst,
            ]}
            onPress={() => handleCategoryPress(category.id)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIconContainer}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
            </View>
            <View style={S.rowBetween}>
              <Text style={[S.subheading, { marginBottom: 0 }]}>
                {category.name}
              </Text>
              <Text style={styles.categoryArrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={S.caption}>
          {CATEGORIES.length - 1} categories available
        </Text>
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
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryCardFirst: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.input,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  categoryIcon: {
    fontSize: Typography.xxl,
  },
  categoryArrow: {
    color: Colors.textDim,
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
  },
  footer: {
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.md,
  },
});
