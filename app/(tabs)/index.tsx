import { Heart, BookHeart, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
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

  const favProducts = [
    { id: 1, pName: "StreetCore Oversized Hoodie", price: 65, category: "Hoodies", rating: 4.3, stock: 12, inStock: true, description: "Heavy oversized hoodie with soft streetwear cotton blend." },
    { id: 2, pName: "UrbanFlex Cargo Pants", price: 55, category: "Pants", rating: 4.1, stock: 0, inStock: false, description: "Slim cargo pants with utility pockets." },
    { id: 3, pName: "NeoWave Graphic Tee", price: 25, category: "T-Shirts", rating: 4.5, stock: 34, inStock: true, description: "Futuristic neon graphic cotton tee." },
    { id: 4, pName: "CloudStep Joggers", price: 50, category: "Pants", rating: 4.2, stock: 7, inStock: true, description: "Ultra-soft joggers for daily comfort." },
    { id: 5, pName: "Midnight Drift Jacket", price: 90, category: "Jackets", rating: 4.6, stock: 5, inStock: true, description: "Dark matte wind-resistant jacket." }
  ]

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

        <View style={[S.card, {
              flex: 1,
              minWidth: "45%",
              gap: Spacing.xs,
            }]}>
            
            <BookHeart color={"red"} />
            <Text style={S.subheading}>Popular Products</Text>
            <Text style={S.caption}>Most wishlisted products around the world</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: Spacing.sm, gap: Spacing.sm }}>
              {favProducts.map((item) => (
                <View key={item.id} style={[S.cardElevated, {
                  width: 250,
                  height: 350,
                  margin: 10,
                  padding: 7,
                }]}>
                  <Text style={[S.label, { fontSize: Typography.xl }]}>{item.pName}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: Spacing.xs }}>
                    <Star color="gold" fill="gold" size={16}/>
                    <Text>{item.rating}</Text>
                    <Text style={[S.caption, {color: item.inStock ? 'blue' : 'red'}]}>
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </Text>
                  </View>
                  <Text style={S.price}>${item.price}</Text>

                  <View style={{backgroundColor: 'gray', width: 200, height: 200, margin: 'auto'}}>
                    <Text style={{color: 'white', textAlign: 'center', marginTop: 90, fontSize: Typography.xxl }}>Image not found</Text>
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
