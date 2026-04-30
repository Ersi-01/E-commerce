import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { Menu, X } from "lucide-react-native";
import products from "../data/product";

const categories = [
  "All",
  "Hoodies",
  "Pants",
  "T-Shirts",
  "Jackets",
  "Jeans",
  "Shorts",
  "Shirts",
  "Tops",
  "Sweaters",
  "Sweatshirts",
];

export default function Catalogue() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const renderProduct = ({ item }: { item: (typeof products)[0] }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
      <Text style={styles.stockText}>
        {item.inStock ? `In Stock (${item.stock})` : "Out of Stock"}
      </Text>
    </View>
  );

  const renderSidebar = () => {
    if (!sidebarOpen) return null;

    return (
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Categories</Text>
            <TouchableOpacity
              onPress={() => setSidebarOpen(false)}
              style={styles.closeButton}
            >
              <X size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.categoryList}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryItem,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => handleCategorySelect(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setSidebarOpen(true)}
          style={styles.menuButton}
        >
          <Menu size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Catalogue</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.categoryInfo}>
        <Text style={styles.categoryText}>{selectedCategory} Products</Text>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No products found in {selectedCategory}
            </Text>
          </View>
        }
      />

      {renderSidebar()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  categoryInfo: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryText: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  placeholderText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  subPlaceholderText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  categoryList: {
    flex: 1,
    padding: 20,
  },
  categoryItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  productList: {
    padding: 16,
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  stockText: {
    fontSize: 12,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
