import { Tabs } from "expo-router"
import { useState } from "react"
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Navbar  from "@/app/components/Navbar"

import { HapticTab } from "@/components/haptic-tab"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { getColors } from "@/app/styles/global"
import { useTheme } from "@/app/context/ThemeContext"

/* ---------------- FOOTER COMPONENT ---------------- */


/* ---------------- MAIN LAYOUT ---------------- */
export default function TabLayout() {
  const { isDark } = useTheme();
  const Colors = getColors(isDark);
  const [search, setSearch] = useState("")

  return (
    <View style={{ flex: 1 }}>

      <Navbar search={search} setSearch={setSearch} />
      
      {/* TABS */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.accent,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="catalogue"
          options={{
            title: "Catalogue",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="list.bullet" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="wishlist"
          options={{
            title: "Wishlist",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="heart.fill" color={color} />
            ),
          }}
        />

        {/* <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        /> */}
      </Tabs>

      {/* GLOBAL FOOTER */}
      
    </View>
  )
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  links: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 6,
  },
  link: {
    fontSize: 13,
    color: "#007AFF",
  },
  copy: {
    fontSize: 11,
    color: "#999",
  },
})
