import React, { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { Store, ShoppingCart, User, Menu, X } from "lucide-react-native"

import { useCartStore } from "@/app/store/cartStore"

import S, { Colors, Shadows, Spacing } from "@/app/styles/global"

type Props = {
  search: string
  setSearch: (value: string) => void
}

export default function Navbar({ search, setSearch }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  
const cart = useCartStore((state) => state.cart ?? [])
const cartCount = cart.length

  return (
    <View
      style={[
        S.card,
        {
          padding: Spacing.sm,
          margin: Spacing.lg,
        },
        Shadows.card,
      ]}
    >
      {/* TOP BAR */}
      <View style={S.rowBetween}>
        {/* HOME */}
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
          <Store color={Colors.textPrimary} size={24} />
        </TouchableOpacity>

        <View style={[S.rowBetween, { gap: Spacing.sm }]}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/Cart")}
            activeOpacity={0.7}
          >
            <View style={{ position: "relative" }}>
              <ShoppingCart color={Colors.textPrimary} size={24} />

              <View
                style={{
                  position: "absolute",
                  top: -8,
                  right: -10,
                  backgroundColor: "red",
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 11,
                    fontWeight: "bold",
                  }}
                >
                  {cartCount}
                </Text>
              </View>
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

      {/* DROPDOWN MENU */}
      {isOpen && (
        <View style={{ marginTop: Spacing.sm }}>
          <Text
            onPress={() => {
              setIsOpen(false)
              router.push("/(tabs)/Products")
            }}
            style={[S.body, { paddingVertical: Spacing.sm }]}
          >
            Products
          </Text>

          <Text
            onPress={() => {
              setIsOpen(false)
              router.push("/catalogue")
            }}
            style={[S.body, { paddingVertical: Spacing.sm }]}
          >
            Catalogue
          </Text>

          <Text
            onPress={() => {
              setIsOpen(false)
              router.push("/wishlist")
            }}
            style={[S.body, { paddingVertical: Spacing.sm }]}
          >
            Wishlist
          </Text>

          <Text
            onPress={() => {
              setIsOpen(false)
              router.push("/(tabs)/Profile")
            }}
            style={[S.body, { paddingVertical: Spacing.sm }]}
          >
            Profile
          </Text>
        </View>
      )}
    </View>
  )
}
