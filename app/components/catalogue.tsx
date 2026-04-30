import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
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
    return products.filter(
      (product: any) => product.category === selectedCategory,
    );
  }, [selectedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const renderProduct = ({ item }: { item: (typeof products)[0] }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Text>{item.category}</Text>
      <Text>{item.inStock ? `In Stock (${item.stock})` : "Out of Stock"}</Text>
    </View>
  );

  const renderSidebar = () => {
    if (!sidebarOpen) return null;

    return (
      <View>
        <View>
          <View>
            <Text>Categories</Text>
            <TouchableOpacity onPress={() => setSidebarOpen(false)}>
              <X size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(category)}
              >
                <Text>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <Menu size={24} color="black" />
        </TouchableOpacity>
        <Text>Catalogue</Text>
        <View />
      </View>

      <View>
        <Text>{selectedCategory} Products</Text>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View>
            <Text>No products found in {selectedCategory}</Text>
          </View>
        }
      />

      {renderSidebar()}
    </View>
  );
}
