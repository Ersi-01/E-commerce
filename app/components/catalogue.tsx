import React, { useState, useMemo,useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";
import products from "../data/products";
import Filter, { FilterOptions } from "./Filter";
import { useWishlist } from "../context/WishlistContext";
import Searchbar from "./Searchbar";
import S, { Colors, Spacing } from "@/app/styles/global";


export default function Catalogue() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    sortBy: null,
    inStockOnly: false,
  });
  const [toastMessage, setToastMessage] = useState("");
  const opacity = useRef(new Animated.Value(0)).current;

  const { addToWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    result = result.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    
    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (filters.sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filters, search]);

  function showToast(message: string) {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }

  return (
    <View style={S.screen}>
      {/* Header with Title and Filter */}
      <View style={[S.screenHeader, { justifyContent: "space-between", marginBottom: Spacing.lg }]}>
        <Text style={S.heading}>Catalogue</Text>
        <Filter onFilterChange={setFilters} />
      </View>

      {/* Searchbar */}
      <Searchbar search={search} setSearch={setSearch} />

      {/* Product count */}
      <Text style={[S.label, { marginTop: Spacing.md, marginBottom: Spacing.md }]}>
        {filteredProducts.length} {filteredProducts.length === 1 ? "produkt" : "produkte"}
      </Text>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <View style={S.card}>
            {/* Product Name */}
            <Text style={S.subheading}>{item.name}</Text>

            {/* Category */}
            <Text style={[S.label, { marginTop: Spacing.xs }]}>{item.category}</Text>

            {/* Description */}
            <Text style={[S.body, { marginTop: Spacing.xs, marginBottom: Spacing.sm }]}>
              {item.description}
            </Text>

            {/* Price */}
            <Text style={[S.price, { marginTop: Spacing.xs }]}>${item.price}</Text>

            {/* Rating */}
            <Text style={[S.rating, { marginTop: Spacing.xs }]}>⭐ {item.rating}</Text>

            {/* Stock Status */}
            <Text style={[item.inStock ? S.inStock : S.outOfStock, { marginTop: Spacing.sm }]}>
              {item.inStock ? `In Stock (${item.stock})` : "Out of Stock"}
            </Text>

            {/* Wishlist Button */}
            <TouchableOpacity
              style={[
                S.btnChip,
                {
                  marginTop: Spacing.md,
                  backgroundColor: isInWishlist(item.id) ? Colors.success : Colors.accent,
                  borderColor: isInWishlist(item.id) ? Colors.success : Colors.accent,
                },
              ]}
              onPress={() => {
                addToWishlist(item);
                showToast(
                  isInWishlist(item.id)
                    ? `${item.name} removed from wishlist`
                    : `${item.name} added to wishlist!`
                );
              }}
            >
              <Text
                style={[
                  S.btnChipText,
                  {
                    color: Colors.accentDark,
                  },
                ]}
              >
                {isInWishlist(item.id) ? "✓ In Wishlist" : "♡ Add to Wishlist"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={S.emptyText}>Nuk u gjet asnjë produkt.</Text>
        }
        
      />

      {/* Toast Notification */}
      <Animated.View
        style={[
          {
            opacity,
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
            backgroundColor: Colors.textPrimary,
            paddingHorizontal: Spacing.lg,
            paddingVertical: Spacing.md,
            borderRadius: 24,
          },
        ]}
      >
        <Text style={{ color: Colors.card, fontSize: 14, fontWeight: "600" }}>
          {toastMessage}
        </Text>
      </Animated.View>
    </View>
  );
}