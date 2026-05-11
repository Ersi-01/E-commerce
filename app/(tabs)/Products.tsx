import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Filter, { FilterOptions } from "../components/Filter"
import Searchbar from "../components/Searchbar"
import { useWishlist } from "../context/WishlistContext"
import products from "../data/products"
import { useCartStore } from "@/app/store/cartStore"
import { Heart, ShoppingBag, Tag } from "lucide-react-native"

type Product = {
  id: number
  name: string
  price: number
  category: string
  rating: number
  stock: number
  inStock: boolean
  description: string
}

export default function ProductsScreen() {
  const params = useLocalSearchParams()
  const { addToWishlist, isInWishlist } = useWishlist()
  const addToCart = useCartStore((state) => state.addToCart)

  const [toastMessage, setToastMessage] = useState("")
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    sortBy: null,
    inStockOnly: false,
  })

  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (params.category && typeof params.category === "string") {
      setFilters((prev) => ({ ...prev, category: params.category }))
    }
  }, [params.category])

  const filteredProducts = useMemo(() => {
    let result = [...products]
    result = result.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    )
    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category)
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock)
    }
    if (filters.sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price)
    }
    return result
  }, [filters, search])

  function showToast(message: string) {
    setToastMessage(message)
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start()
  }

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={() =>
        router.push({ pathname: "/screens/productdetails", params: { id: item.id.toString() } })
      }
    >
      <View style={styles.productCard}>
        {/* Top row */}
        <View style={S.rowBetween}>
          <View style={styles.categoryPill}>
            <Tag size={10} color={Colors.accent} />
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={[styles.stockPill, !item.inStock && styles.stockPillOut]}>
            <Text style={[styles.stockText, !item.inStock && styles.stockTextOut]}>
              {item.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        {/* Name & rating */}
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.ratingText}>⭐ {item.rating} · {item.inStock ? `${item.stock} left` : "Unavailable"}</Text>
        <Text style={[S.body, { marginTop: 4, marginBottom: Spacing.md }]} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Price & actions */}
        <View style={[S.rowBetween, { alignItems: "flex-end" }]}>
          <Text style={styles.price}>${item.price}</Text>

          <View style={{ flexDirection: "row", gap: Spacing.sm }}>
            {/* Wishlist */}
            <TouchableOpacity
              style={[styles.iconActionBtn, isInWishlist(item.id) && styles.iconActionBtnActive]}
              disabled={isInWishlist(item.id)}
              onPress={(e) => {
                e.stopPropagation()
                addToWishlist(item)
                showToast(`${item.name} added to wishlist!`)
              }}
            >
              <Heart
                size={16}
                color={isInWishlist(item.id) ? Colors.danger : Colors.textMuted}
                fill={isInWishlist(item.id) ? Colors.danger : "transparent"}
              />
            </TouchableOpacity>

            {/* Add to cart */}
            <TouchableOpacity
              style={[styles.cartBtn, !item.inStock && S.btnDisabled]}
              disabled={!item.inStock}
              onPress={(e) => {
                e.stopPropagation()
                addToCart({ id: item.id.toString(), name: item.name, price: item.price })
                showToast(`${item.name} added to cart!`)
              }}
            >
              <ShoppingBag size={14} color="#fff" />
              <Text style={styles.cartBtnText}>
                {item.inStock ? "Add to Cart" : "Unavailable"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={S.screen}>
      {/* HEADER */}
      <View style={[S.screenHeader, { marginTop: 4 }]}>
        <Text style={S.label}>
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {filters.category !== "All" && ` · ${filters.category}`}
        </Text>
        <Filter onFilterChange={setFilters} />
      </View>

      {/* SEARCH */}
      <Searchbar search={search} setSearch={setSearch} />

      {/* PRODUCT LIST */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={S.centered}>
          <Text style={S.emptyText}>No products match your filters</Text>
        </View>
      )}

      {/* TOAST */}
      <Animated.View
        pointerEvents="none"
        style={[styles.toast, { opacity }]}
      >
        <Text style={styles.toastText}>{toastMessage}</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  categoryPill: {
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
  stockPill: {
    backgroundColor: Colors.successBg,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  stockPillOut: {
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
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    marginTop: Spacing.sm,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  ratingText: {
    color: Colors.textMuted,
    fontSize: Typography.sm,
    marginBottom: 4,
  },
  price: {
    color: Colors.accent,
    fontSize: Typography.xxl,
    fontWeight: Typography.extrabold,
    letterSpacing: -0.5,
  },
  iconActionBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.input,
    alignItems: "center",
    justifyContent: "center",
  },
  iconActionBtnActive: {
    backgroundColor: Colors.dangerBg,
    borderColor: Colors.dangerBorder,
  },
  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    height: 36,
    borderRadius: Radius.sm,
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cartBtnText: {
    color: "#fff",
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  toast: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    backgroundColor: Colors.textPrimary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  toastText: {
    color: "#fff",
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
  },
})
