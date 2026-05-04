import React, { useState, useMemo } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import products from "../data/products";
import Filter, { FilterOptions } from "./Filter";
import { useWishlist } from "../context/WishlistContext";
import Searchbar from "./Searchbar";

export default function Catalogue() {
   const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    sortBy: null,
    inStockOnly: false,
  });

 
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
  }, [filters,search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Catalogue</Text>
        <Filter onFilterChange={setFilters} />
      </View>
<Searchbar search={search} setSearch={setSearch} />
      <Text style={styles.count}>{filteredProducts.length} produkte</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <Text style={item.inStock ? styles.inStock : styles.outOfStock}>
              {item.inStock ? `In Stock (${item.stock})` : "Out of Stock"}
            </Text>

            <TouchableOpacity 
              style={{
                marginTop: 10,
                backgroundColor: isInWishlist(item.id) ? "#4caf50" : "#f0c060",
                padding: 10,
                borderRadius: 8,
                alignItems: "center"
              }}
              onPress={() => addToWishlist(item)}
            >
              <Text style={{ color: "#000", fontWeight: "600" }}>
                {isInWishlist(item.id) ? "✓ In Wishlist" : "♡ Add to Wishlist"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nuk u gjet asnjë produkt.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0a0a0f", 
    padding: 16 
  },
  header: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    marginBottom: 8,
  },
  title: { 
    color: "#fff", 
    fontSize: 22, 
    fontWeight: "700" 
  },
  count: { 
    color: "#666", 
    fontSize: 12, 
    marginBottom: 12 
  },
  card: {
    backgroundColor: "#13131a", 
    borderRadius: 12,
    padding: 14, 
    marginBottom: 10,
    borderWidth: 1, 
    borderColor: "#2a2a3a",
  },
  name: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  category: { 
    color: "#888", 
    fontSize: 12, 
    marginTop: 2 
  },
  price: { 
    color: "#f0c060", 
    fontSize: 15, 
    fontWeight: "700", 
    marginTop: 6 
  },
  rating: { 
    color: "#ccc", 
    fontSize: 13, 
    marginTop: 2 
  },
  inStock: { 
    color: "#4caf50", 
    fontSize: 12, 
    marginTop: 4 
  },
  outOfStock: { 
    color: "#f44336", 
    fontSize: 12, 
    marginTop: 4 
  },
  empty: { 
    color: "#666", 
    textAlign: "center", 
    marginTop: 40 
  },
});