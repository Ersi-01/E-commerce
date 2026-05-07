import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Bell,
  Camera,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  PackageCheck,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  User,
  Wallet,
} from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { useWishlist } from "../context/WishlistContext";
import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global";

const recentPurchases = [
  { id: "1", title: "Wireless Headphones", date: "12 Apr", price: "EUR 89.90", status: "Delivered" },
  { id: "2", title: "Smart Watch", date: "04 Apr", price: "EUR 129.00", status: "In transit" },
  { id: "3", title: "Running Shoes", date: "26 Mar", price: "EUR 74.50", status: "Delivered" },
];

const quickActions = [
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "address", label: "Address", icon: MapPin },
  { id: "security", label: "Security", icon: ShieldCheck },
];

export default function Profile() {
  const { wishlist } = useWishlist();
  const router = useRouter();
  const [email, setEmail] = useState("user@store.com");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = await AsyncStorage.getItem("@ecommerce_user");
        if (saved) {
          const user = JSON.parse(saved);
          if (user.email) setEmail(user.email);
          if (user.name) setName(user.name);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Failed to load profile data", error);
      }
    };

    loadProfile();
  }, []);

  const displayName = useMemo(() => {
    if (name) return name;
    const derived = email.split("@")[0]?.replace(/[._-]/g, " ") || "ShopWave User";
    return derived
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }, [email, name]);

  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("@ecommerce_user");
    router.replace("/login" as any);
  };

  return (
    <View style={[S.screenNoPad, { backgroundColor: Colors.bg }]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingTop: 54, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      >
        {/* Header */}
        <View style={[S.screenHeader, { justifyContent: "space-between", marginBottom: Spacing.xl }]}>
          <View>
            <Text style={S.label}>My account</Text>
            <Text style={S.heading}>Profile</Text>
          </View>

          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: Radius.lg,
              backgroundColor: Colors.card,
              borderWidth: 1,
              borderColor: Colors.border,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.8}
          >
            <Settings size={21} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View
          style={[
            S.cardElevated,
            {
              flexDirection: "row",
              alignItems: "center",
              marginBottom: Spacing.md,
            },
          ]}
        >
          <View style={{ marginRight: Spacing.lg, position: "relative" }}>
            <View
              style={{
                width: 78,
                height: 78,
                borderRadius: Radius.lg,
                backgroundColor: Colors.accent,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.bg,
                  fontSize: 26,
                  fontWeight: "900",
                }}
              >
                {initials}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: -5,
                bottom: -5,
                width: 30,
                height: 30,
                borderRadius: Radius.md,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={0.8}
            >
              <Camera size={15} color={"#141111"} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={S.subheading}>{displayName}</Text>
            <Text style={[S.caption, { marginTop: Spacing.xs }]}>{email}</Text>

            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: Spacing.xs,
                marginTop: Spacing.sm,
                paddingHorizontal: Spacing.md,
                paddingVertical: Spacing.xs + 2,
                borderRadius: 999,
                backgroundColor: Colors.accent + "15",
                borderWidth: 1,
                borderColor: Colors.accent + "44",
              }}
            >
              <Star size={13} color={Colors.accent} fill={Colors.accent} />
              <Text style={{ color: Colors.accent, fontSize: Typography.xs, fontWeight: "700" }}>
                Gold member
              </Text>
            </View>
          </View>
        </View>

        {!isLoggedIn && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.md,
              backgroundColor: Colors.accent + "14",
              borderColor: Colors.accent + "33",
              borderWidth: 1,
              borderRadius: Radius.lg,
              padding: Spacing.md,
              marginBottom: Spacing.md,
            }}
          >
            <User size={18} color={Colors.accent} />
            <Text style={{ flex: 1, color: Colors.accent + "cc", fontSize: Typography.sm, lineHeight: 17 }}>
              Template profile. After login, this screen can use real user data.
            </Text>
          </View>
        )}

        {/* Balance Card */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: Colors.accent,
            borderRadius: Radius.xxl,
            padding: Spacing.xl,
            marginBottom: Spacing.xl,
          }}
        >
          <View>
            <Text style={{ color: Colors.textPrimary + "66", fontSize: Typography.xs, fontWeight: "700", textTransform: "uppercase" }}>
              Available balance
            </Text>
            <Text style={{ color: Colors.bg, fontSize: 29, fontWeight: "900", marginTop: Spacing.xs }}>
              EUR 246.80
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: Spacing.xs + 2,
              backgroundColor: "#fff",
              borderRadius: Radius.lg,
              paddingHorizontal: Spacing.md,
              paddingVertical: Spacing.sm + 2,
            }}
            activeOpacity={0.85}
          >
            <CreditCard size={17} color={"#141111"} />
            <Text style={{ color: "#141111", fontWeight: "800", fontSize: Typography.xs + 1 }}>Top up</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: "row", gap: Spacing.sm, marginBottom: Spacing.xxl }}>
          <StatCard icon={ShoppingBag} label="Purchases" value="18" />
          <StatCard icon={PackageCheck} label="Delivered" value="14" />
          <StatCard icon={Heart} label="Wishlist" value={String(wishlist.length)} />
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: Spacing.xxl }}>
          <Text style={[S.subheading, { marginBottom: Spacing.md }]}>Quick actions</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm }}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={{
                    width: "48%",
                    minHeight: 86,
                    backgroundColor: Colors.card,
                    borderRadius: Radius.lg,
                    borderWidth: 1,
                    borderColor: Colors.border,
                    padding: Spacing.md,
                    justifyContent: "space-between",
                  }}
                  activeOpacity={0.85}
                >
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: Radius.md,
                      backgroundColor: Colors.input,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} color={Colors.accent} />
                  </View>
                  <Text style={{ color: Colors.textPrimary, fontSize: Typography.base, fontWeight: "700" }}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Purchases */}
        <View style={{ marginBottom: Spacing.xxl }}>
          <View style={[S.rowBetween, { marginBottom: Spacing.md }]}>
            <Text style={S.subheading}>Recent purchases</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={{ color: Colors.accent, fontSize: Typography.sm, fontWeight: "700" }}>View all</Text>
            </TouchableOpacity>
          </View>

          {recentPurchases.map((purchase) => (
            <View
              key={purchase.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: Colors.card,
                borderRadius: Radius.lg,
                borderWidth: 1,
                borderColor: Colors.border,
                padding: Spacing.md,
                marginBottom: Spacing.sm,
              }}
            >
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: Radius.md,
                  backgroundColor: Colors.input,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: Spacing.md,
                }}
              >
                <ShoppingBag size={18} color={Colors.accent} />
              </View>
              <View style={{ flex: 1, paddingRight: Spacing.sm }}>
                <Text style={{ color: Colors.textPrimary, fontSize: Typography.base, fontWeight: "700" }}>
                  {purchase.title}
                </Text>
                <Text style={{ color: Colors.textDim, fontSize: Typography.sm, marginTop: Spacing.xs }}>
                  {purchase.date} - {purchase.status}
                </Text>
              </View>
              <Text style={{ color: Colors.accent, fontSize: Typography.sm, fontWeight: "800" }}>
                {purchase.price}
              </Text>
            </View>
          ))}
        </View>

        {/* Profile Settings */}
        <View>
          <Text style={[S.subheading, { marginBottom: Spacing.md }]}>Profile settings</Text>
          <MenuRow icon={Bell} title="Notifications" subtitle="Order updates and offers" />
          <MenuRow icon={MapPin} title="Shipping address" subtitle="Home, work and saved locations" />
          <MenuRow icon={ShieldCheck} title="Privacy and security" subtitle="Password and account access" />
          <MenuRow icon={LogOut} title="Sign out" subtitle="Disconnect this account" danger onPress={handleSignOut} />
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType<{ size?: number; color?: string }>;
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 100,
        backgroundColor: Colors.card,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        justifyContent: "space-between",
      }}
    >
      <Icon size={20} color={Colors.accent} />
      <Text style={{ color: Colors.textPrimary, fontSize: 22, fontWeight: "800" }}>{value}</Text>
      <Text style={{ color: Colors.textDim, fontSize: Typography.xs, fontWeight: "600" }}>{label}</Text>
    </View>
  );
}

function MenuRow({
  icon: Icon,
  title,
  subtitle,
  danger,
  onPress,
}: {
  icon: React.ElementType<{ size?: number; color?: string }>;
  title: string;
  subtitle: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.card,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
      }}
      activeOpacity={0.8}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: Radius.md,
          backgroundColor: danger ? Colors.danger + "15" : Colors.input,
          alignItems: "center",
          justifyContent: "center",
          marginRight: Spacing.md,
        }}
      >
        <Icon size={19} color={danger ? Colors.danger : Colors.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: danger ? Colors.danger : Colors.textPrimary, fontSize: Typography.base, fontWeight: "700" }}>
          {title}
        </Text>
        <Text style={{ color: Colors.textDim, fontSize: Typography.sm, marginTop: Spacing.xs }}>
          {subtitle}
        </Text>
      </View>
      <Text style={{ color: Colors.textMuted, fontSize: 28, lineHeight: 28 }}>{">"}</Text>
    </TouchableOpacity>
  );
}