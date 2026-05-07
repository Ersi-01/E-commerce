import { Heart, BookHeart } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useWishlist } from "../context/WishlistContext";
import { Colors, Spacing, Radius, Typography, Shadows } from "@/app/styles/global";
import S from "@/app/styles/global";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function HomeScreen() {
  const router = useRouter();
  const { wishlist } = useWishlist();
  const [search, setSearch] = useState("");

  return (
    <View style={{ flex: 1 }}>
      {/* Navbar */}
      <Navbar search={search} setSearch={setSearch} />

      <ScrollView
        style={S.screenNoPad}
        contentContainerStyle={{
          padding: Spacing.lg,
          paddingTop: Spacing.xl + Spacing.xxl,
          paddingBottom: Spacing.xxxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={S.blobTop} pointerEvents="none" />
        <View style={S.blobBottom} pointerEvents="none" />

        {/* Header */}
        <View style={S.screenHeader}>
          <View>
            <Text style={S.caption}>Welcome back</Text>
            <Text style={{
              color: Colors.textPrimary,
              fontSize: Typography.h1,
              fontWeight: Typography.extrabold,
              letterSpacing: -0.5,
            }}>
              ShopApp
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              borderRadius: Radius.full,
              backgroundColor: Colors.card,
              borderWidth: 1,
              borderColor: Colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.push("/(tabs)/wishlist")}
          >
            <Heart color={"red"} fill={"red"} />
            {wishlist.length > 0 && (
              <View style={[S.badge, {
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: Colors.danger,
              }]}>
                <Text style={S.badgeText}>{wishlist.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={[S.cardElevated, {
          marginTop: Spacing.xl,
          marginBottom: Spacing.lg,
          gap: Spacing.sm,
        }]}>
          <Text style={S.label}>Featured</Text>
          <Text style={{
            color: Colors.textPrimary,
            fontSize: Typography.h1,
            fontWeight: Typography.extrabold,
            lineHeight: 38,
            letterSpacing: -0.5,
          }}>
            Explore our{"\n"}latest products in clothes
          </Text>
          <Text style={S.body}>Discover trending items handpicked for you.</Text>
          <TouchableOpacity
            style={[S.btnPrimary, {
              alignSelf: "flex-start",
              paddingHorizontal: Spacing.xl,
              height: 48,
              borderRadius: Radius.xxl,
              marginTop: Spacing.sm,
            }]}
            onPress={() => router.push("/(tabs)/catalogue")}
          >
            <Text style={S.btnPrimaryText}>Browse Catalogue →</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={[S.card, {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: Spacing.lg,
          marginBottom: Spacing.lg,
        }]}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{
              color: Colors.textPrimary,
              fontSize: Typography.xxl,
              fontWeight: Typography.extrabold,
            }}>
              50+
            </Text>
            <Text style={S.caption}>Products</Text>
          </View>
          <View style={{ width: 1, height: 36, backgroundColor: Colors.border }} />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{
              color: Colors.textPrimary,
              fontSize: Typography.xxl,
              fontWeight: Typography.extrabold,
            }}>
              8
            </Text>
            <Text style={S.caption}>Categories</Text>
          </View>
          <View style={{ width: 1, height: 36, backgroundColor: Colors.border }} />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{
              color: Colors.accent,
              fontSize: Typography.xxl,
              fontWeight: Typography.extrabold,
            }}>
              {wishlist.length}
            </Text>
            <Text style={S.caption}>Saved</Text>
          </View>
        </View>

        {/* Quick Access */}
        <Text style={S.sectionTitle}>Quick Access</Text>

        <View style={S.rowWrap}>
          <TouchableOpacity
            style={[S.card, {
              flex: 1,
              minWidth: "45%",
              gap: Spacing.xs,
            }]}
            onPress={() => router.push("/(tabs)/Products")}
            activeOpacity={0.75}
          >
            <BookHeart color={"red"} />
            <Text style={S.subheading}>Favorite Products</Text>
            <Text style={S.caption}>Browse all products</Text>
            <Text style={{
              color: Colors.textDim,
              fontSize: Typography.lg,
              fontWeight: Typography.bold,
              marginTop: Spacing.sm,
            }}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}
