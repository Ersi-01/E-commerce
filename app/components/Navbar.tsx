import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { Store, ShoppingCart, User, Menu, X, Moon, Sun } from "lucide-react-native"

import { useCartStore } from "@/app/store/cartStore"
import { useTheme } from "@/app/context/ThemeContext"
import S, { getColors, Spacing, Radius, Typography } from "@/app/styles/global"

type Props = {
  search: string
  setSearch: (value: string) => void
}

export default function Navbar({ search, setSearch }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { isDark, setThemeMode, themeMode } = useTheme()

  const Colors = getColors(isDark)

  const cart = useCartStore((state) => state.cart ?? [])
  const cartCount = cart.length

  const NAV_LINKS = [
    { label: "Products", path: "/(tabs)/Products" },
    { label: "Catalogue", path: "/catalogue" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Profile", path: "/(tabs)/Profile" },
  ]

  const handleThemeToggle = () => {
    setThemeMode(isDark ? "light" : "dark")
  }

  // Inline styles for theme-dependent colors
  const navbarStyle = {
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
  }

  const brandTextStyle = {
    fontSize: Typography.lg,
    fontWeight: Typography.bold as const,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  }

  const iconBtnStyle = {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.input,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 1,
    borderColor: Colors.border,
  }

  const iconBtnActiveStyle = {
    ...iconBtnStyle,
    backgroundColor: Colors.accentLight,
    borderColor: Colors.accent,
  }

  const dropdownStyle = {
    marginTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  }

  const dropdownItemStyle = {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  }

  const dropdownItemBorderStyle = {
    ...dropdownItemStyle,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  }

  const dropdownLabelStyle = {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.medium as const,
  }

  const themeBtnStyle = {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.input,
  }

  const themeBtnActiveStyle = {
    ...themeBtnStyle,
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  }

  const themeBtnTextStyle = {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold as const,
    color: Colors.textSecondary,
  }

  const themeBtnTextActiveStyle = {
    ...themeBtnTextStyle,
    color: Colors.accentDark,
  }

  return (
    <View style={navbarStyle}>
      {/* TOP BAR */}
      <View style={S.rowBetween}>
        {/* Brand */}
        <TouchableOpacity onPress={() => router.push("/(tabs)")} style={staticStyles.brand}>
          <View style={[staticStyles.brandIcon, { backgroundColor: Colors.accent }]}>
            <Store color="#fff" size={16} />
          </View>
          <Text style={brandTextStyle}>ShopApp</Text>
        </TouchableOpacity>

        {/* Right Icons */}
        <View style={[S.rowBetween, { gap: Spacing.md }]}>
          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={handleThemeToggle}
            style={iconBtnStyle}
          >
            {isDark ? (
              <Sun color={Colors.textPrimary} size={20} />
            ) : (
              <Moon color={Colors.textPrimary} size={20} />
            )}
          </TouchableOpacity>

          {/* Cart */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Cart")}
            activeOpacity={0.7}
            style={iconBtnStyle}
          >
            <ShoppingCart color={Colors.textPrimary} size={20} />
            {cartCount > 0 && (
              <View style={[staticStyles.cartBadge, { backgroundColor: Colors.danger }]}>
                <Text style={staticStyles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Profile")}
            style={iconBtnStyle}
          >
            <User color={Colors.textPrimary} size={20} />
          </TouchableOpacity>

          {/* Menu toggle */}
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            style={isOpen ? iconBtnActiveStyle : iconBtnStyle}
          >
            {isOpen
              ? <X color={Colors.accent} size={20} />
              : <Menu color={Colors.textPrimary} size={20} />
            }
          </TouchableOpacity>
        </View>
      </View>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <View style={dropdownStyle}>
          {NAV_LINKS.map((link, i) => (
            <TouchableOpacity
              key={link.path}
              style={i < NAV_LINKS.length - 1 ? dropdownItemBorderStyle : dropdownItemStyle}
              onPress={() => {
                setIsOpen(false)
                router.push(link.path as any)
              }}
            >
              <Text style={dropdownLabelStyle}>{link.label}</Text>
              <Text style={[dropdownLabelStyle, { fontSize: Typography.xl }]}>›</Text>
            </TouchableOpacity>
          ))}
          
          {/* Theme mode selector */}
          <View style={dropdownItemBorderStyle}>
            <Text style={dropdownLabelStyle}>Theme</Text>
            <View style={{ flexDirection: "row", gap: Spacing.xs }}>
              <TouchableOpacity
                onPress={() => setThemeMode("light")}
                style={themeMode === "light" ? themeBtnActiveStyle : themeBtnStyle}
              >
                <Text style={themeMode === "light" ? themeBtnTextActiveStyle : themeBtnTextStyle}>
                  Light
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setThemeMode("dark")}
                style={themeMode === "dark" ? themeBtnActiveStyle : themeBtnStyle}
              >
                <Text style={themeMode === "dark" ? themeBtnTextActiveStyle : themeBtnTextStyle}>
                  Dark
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setThemeMode("system")}
                style={themeMode === "system" ? themeBtnActiveStyle : themeBtnStyle}
              >
                <Text style={themeMode === "system" ? themeBtnTextActiveStyle : themeBtnTextStyle}>
                  System
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const staticStyles = StyleSheet.create({
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  brandIcon: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
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
})


