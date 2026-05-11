import S from "@/app/styles/global"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useMemo, useRef, useState } from "react"
import { Animated, FlatList, Text, TouchableOpacity, View } from "react-native"

import Filter, { FilterOptions } from "../components/Filter"

import Searchbar from "../components/Searchbar"

import { useWishlist } from "../context/WishlistContext"

import products from "../data/products"

import { useCartStore } from "@/app/store/cartStore"

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

  // Zustand cart
  const addToCart = useCartStore((state) => state.addToCart)

  const [toastMessage, setToastMessage] = useState("")

  const [search, setSearch] = useState("")

  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    sortBy: null,
    inStockOnly: false,
  })

  const opacity = useRef(new Animated.Value(0)).current

  // Apply category from params
  useEffect(() => {
    if (params.category && typeof params.category === "string") {
      setFilters((prev) => ({
        ...prev,
        category: params.category,
      }))
    }
  }, [params.category])

  // Filtered products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search
    result = result.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    )

    // Category
    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category)
    }

    // Stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock)
    }

    // Sorting
    if (filters.sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [filters, search])

  // Toast animation
  function showToast(message: string) {
    setToastMessage(message)

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.delay(1500),

      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  // Product card
  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: "/screens/productdetails",
          params: {
            id: item.id.toString(),
          },
        })
      }
    >
      <View style={S.card}>
        <Text style={S.subheading}>{item.name}</Text>

        <Text style={S.label}>{item.category}</Text>

        <Text style={S.body}>{item.description}</Text>

        <Text style={S.price}>${item.price}</Text>

        <Text style={S.rating}>⭐ {item.rating}</Text>

        <Text style={item.inStock ? S.inStock : S.outOfStock}>
          {item.inStock ? `In Stock: ${item.stock}` : "Out of Stock"}
        </Text>

        {/* ADD TO CART */}
        <TouchableOpacity
          style={[S.btnSecondary, !item.inStock && S.btnDisabled]}
          disabled={!item.inStock}
          onPress={(e) => {
            e.stopPropagation()

            addToCart({
              id: item.id.toString(),
              name: item.name,
              price: item.price,
            })

            console.log("PRODUCT ADDED:", item.name)

            showToast(`${item.name} added to cart!`)
          }}
        >
          <Text style={S.btnSecondaryText}>
            {item.inStock ? "Add to Cart" : "Unavailable"}
          </Text>
        </TouchableOpacity>

        {/* WISHLIST */}
        <TouchableOpacity
          style={[S.btnChip, isInWishlist(item.id) && S.btnDisabled]}
          disabled={isInWishlist(item.id)}
          onPress={(e) => {
            e.stopPropagation()

            addToWishlist(item)

            showToast(`${item.name} added to wishlist!`)
          }}
        >
          <Text style={S.btnChipText}>
            {isInWishlist(item.id) ? "In Wishlist" : "Add to Wishlist"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={S.screen}>
      {/* HEADER */}
      <View
        style={[
          S.screenHeader,
          {
            justifyContent: "space-between",
            marginTop: 8,
          },
        ]}
      >
        <Text style={S.label}>
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {filters.category !== "All" && ` in ${filters.category}`}
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
        <Text style={S.emptyText}>No products match your filters</Text>
      )}

      {/* TOAST */}
      <Animated.View
        pointerEvents="none"
        style={{
          opacity,
          position: "absolute",
          bottom: 30,
          alignSelf: "center",
          backgroundColor: "#333",
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 24,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {toastMessage}
        </Text>
      </Animated.View>
    </View>
  )
}
