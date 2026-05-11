import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { Store, ShoppingCart, User, Menu, X } from "lucide-react-native"

import { useCartStore } from "@/app/store/cartStore"
import S, { Colors, Shadows, Spacing, Radius, Typography } from "@/app/styles/global"

type Props = {
  search: string
  setSearch: (value: string) => void
}

export default function Navbar({ search, setSearch }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const cart = useCartStore((state) => state.cart ?? [])
  const cartCount = cart.length

  const NAV_LINKS = [
    { label: "Products", path: "/(tabs)/Products" },
    { label: "Catalogue", path: "/catalogue" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Profile", path: "/(tabs)/Profile" },
  ]

  return (
    <View style={styles.navbar}>
      {/* TOP BAR */}
      <View style={S.rowBetween}>
        {/* Brand */}
        <TouchableOpacity onPress={() => router.push("/(tabs)")} style={styles.brand}>
          <View style={styles.brandIcon}>
            <Store color="#fff" size={16} />
          </View>
          <Text style={styles.brandText}>ShopApp</Text>
        </TouchableOpacity>

        {/* Right Icons */}
        <View style={[S.rowBetween, { gap: Spacing.md }]}>
          {/* Cart */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Cart")}
            activeOpacity={0.7}
            style={styles.iconBtn}
          >
            <ShoppingCart color={Colors.textPrimary} size={20} />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Profile")}
            style={styles.iconBtn}
          >
            <User color={Colors.textPrimary} size={20} />
          </TouchableOpacity>

          {/* Menu toggle */}
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            style={[styles.iconBtn, isOpen && styles.iconBtnActive]}
          >
            {isOpen
              ? <X color={isOpen ? Colors.accent : Colors.textPrimary} size={20} />
              : <Menu color={Colors.textPrimary} size={20} />
            }
          </TouchableOpacity>
        </View>
      </View>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <View style={styles.dropdown}>
          {NAV_LINKS.map((link, i) => (
            <TouchableOpacity
              key={link.path}
              style={[styles.dropdownItem, i < NAV_LINKS.length - 1 && styles.dropdownItemBorder]}
              onPress={() => {
                setIsOpen(false)
                router.push(link.path as any)
              }}
            >
              <Text style={styles.dropdownLabel}>{link.label}</Text>
              <Text style={styles.dropdownArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: Colors.navBg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.navBorder,
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  brandIcon: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.input,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    position: "relative",
  },
  iconBtnActive: {
    backgroundColor: Colors.accentLight,
    borderColor: Colors.accent,
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.danger,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
  },
  dropdown: {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  dropdownLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.medium,
  },
  dropdownArrow: {
    color: Colors.textMuted,
    fontSize: Typography.xl,
  },
})
