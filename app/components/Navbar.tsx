import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react-native";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = 3;

  return (
    <View style={styles.navbar}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Logo */}
        <Text style={styles.logo}>ShopLogo</Text>

        {/* Icons */}
        <View style={styles.icons}>
          {/* Cart */}
          <View style={styles.cartContainer}>
            <ShoppingCart color="black" size={22} />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>

          {/* User */}
          <User color="black" size={22} />

          {/* Menu Toggle */}
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X color="black" size={24} />
            ) : (
              <Menu color="black" size={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={18} color="gray" />
        <TextInput
          placeholder="Search products..."
          style={styles.input}
        />
      </View>

      {/* Mobile Menu */}
      {isOpen && (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Home</Text>
          <Text style={styles.menuItem}>Shop</Text>
          <Text style={styles.menuItem}>Categories</Text>
          <Text style={styles.menuItem}>Deals</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cartContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 8,
  },
  input: {
    marginLeft: 5,
    flex: 1,
  },
  menu: {
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 8,
    color: "#444",
  },
});