import React, { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "expo-router";
import { ShoppingCart, User, Menu, X } from "lucide-react-native";

import { Colors, Spacing, Shadows } from "@/app/styles/global";
import S from "@/app/styles/global";
import Searchbar from "@/app/components/Searchbar";
import { getCart } from "@/app/storage/cartStorage";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Navbar({ search, setSearch }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();

  // ✅ better than useEffect: updates when screen comes back into focus
  useFocusEffect(
    useCallback(() => {
      loadCartCount();
    }, [])
  );

  async function loadCartCount() {
    const cart = await getCart();

    // safer in case structure changes later
    setCartCount(cart?.length ?? 0);
  }

  return (
    <View style={[S.card, { padding: Spacing.sm }, Shadows.card]}>

      {/* TOP BAR */}
      <View style={S.rowBetween}>
        <Text style={[S.subheading, { marginBottom: 0 }]}>
          ShopLogo
        </Text>

        <View style={[S.rowBetween, { gap: Spacing.lg }]}>
          
          {/* CART */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Cart")}
            activeOpacity={0.7}
          >
            <View style={{ position: "relative" }}>
              <ShoppingCart color={Colors.textPrimary} size={22} />

              {cartCount > 0 && (
                <View
                  style={[
                    S.badge,
                    { position: "absolute", top: -6, right: -8 }
                  ]}
                >
                  <Text style={S.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* USER */}
          <TouchableOpacity onPress={() => router.push("/(tabs)/Profile")}>
            <User color={Colors.textPrimary} size={22} />
          </TouchableOpacity>

          {/* MENU */}
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X color={Colors.textPrimary} size={24} />
            ) : (
              <Menu color={Colors.textPrimary} size={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH */}
      <Searchbar search={search} setSearch={setSearch} />

      {/* DROPDOWN MENU */}
      {isOpen && (
        <View style={{ marginTop: Spacing.sm }}>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>
            Home
          </Text>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>
            Shop
          </Text>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>
            Categories
          </Text>
          <Text style={[S.body, { paddingVertical: Spacing.sm }]}>
            Deals
          </Text>
        </View>
      )}
    </View>
  );
}