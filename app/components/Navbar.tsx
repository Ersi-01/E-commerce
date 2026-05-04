import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react-native";
import { Colors, Spacing, Radius, Typography, Shadows } from "@/app/styles/global";
import S from "@/app/styles/global";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = 3;

  return (
    <View style={[S.card, { padding: Spacing.sm }, Shadows.card]}>
      {/* Top Row */}
      <View style={S.rowBetween}>
        {/* Logo */}
        <Text style={[S.subheading, { marginBottom: 0 }]}>ShopLogo</Text>

        {/* Icons */}
        <View style={[S.rowBetween, { gap: Spacing.lg }]}>
          {/* Cart */}
          <View style={{ position: "relative" }}>
            <ShoppingCart color={Colors.textPrimary} size={22} />
            {cartCount > 0 && (
              <View style={[S.badge, { position: "absolute", top: -Spacing.xs, right: -Spacing.sm }]}>
                <Text style={S.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>

          {/* User */}
          <User color={Colors.textPrimary} size={22} />

          {/* Menu Toggle */}
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X color={Colors.textPrimary} size={24} />
            ) : (
              <Menu color={Colors.textPrimary} size={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={[S.inputWrapper, { marginTop: Spacing.sm }]}>
        <Search size={Typography.md} color={Colors.textDim} />
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={Colors.textMuted}
          style={[S.inputText, { marginLeft: Spacing.xs }]}
        />
      </View>

      {/* Mobile Menu */}
      {isOpen && (
        <View style={{ marginTop: Spacing.sm }}>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>Home</Text>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>Shop</Text>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>Categories</Text>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>Deals</Text>
        </View>
      )}
    </View>
  );
}