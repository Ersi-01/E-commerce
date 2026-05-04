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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useWishlist } from "../context/WishlistContext";

const STORAGE_KEYS = {
  USER_TOKEN: "@ecommerce_user_token",
  USER_EMAIL: "@ecommerce_user_email",
};

const ACCENT = "#f0c060";
const BG = "#0a0a0f";
const CARD_BG = "#13131a";
const SOFT_CARD = "#1a1a24";
const BORDER = "#2a2a3a";

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
  const [email, setEmail] = useState("user@store.com");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [savedEmail, token] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER_EMAIL),
          AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN),
        ]);

        if (savedEmail) setEmail(savedEmail);
        setIsLoggedIn(Boolean(token));
      } catch (error) {
        console.log("Failed to load profile data", error);
      }
    };

    loadProfile();
  }, []);

  const displayName = useMemo(() => {
    const name = email.split("@")[0]?.replace(/[._-]/g, " ") || "ShopWave User";
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }, [email]);

  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>My account</Text>
            <Text style={styles.title}>Profile</Text>
          </View>

          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <Settings size={21} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
              <Camera size={15} color={BG} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{email}</Text>
            <View style={styles.memberPill}>
              <Star size={13} color={ACCENT} fill={ACCENT} />
              <Text style={styles.memberText}>Gold member</Text>
            </View>
          </View>
        </View>

        {!isLoggedIn && (
          <View style={styles.notice}>
            <User size={18} color={ACCENT} />
            <Text style={styles.noticeText}>
              Template profile. After login, this screen can use real user data.
            </Text>
          </View>
        )}

        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>Available balance</Text>
            <Text style={styles.balanceAmount}>EUR 246.80</Text>
          </View>
          <TouchableOpacity style={styles.topUpButton} activeOpacity={0.85}>
            <CreditCard size={17} color={BG} />
            <Text style={styles.topUpText}>Top up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <StatCard icon={ShoppingBag} label="Purchases" value="18" />
          <StatCard icon={PackageCheck} label="Delivered" value="14" />
          <StatCard icon={Heart} label="Wishlist" value={String(wishlist.length)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity key={action.id} style={styles.actionCard} activeOpacity={0.85}>
                  <View style={styles.actionIcon}>
                    <Icon size={20} color={ACCENT} />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent purchases</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          {recentPurchases.map((purchase) => (
            <View key={purchase.id} style={styles.purchaseRow}>
              <View style={styles.purchaseIcon}>
                <ShoppingBag size={18} color={ACCENT} />
              </View>
              <View style={styles.purchaseInfo}>
                <Text style={styles.purchaseTitle}>{purchase.title}</Text>
                <Text style={styles.purchaseMeta}>
                  {purchase.date} - {purchase.status}
                </Text>
              </View>
              <Text style={styles.purchasePrice}>{purchase.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile settings</Text>
          <MenuRow icon={Bell} title="Notifications" subtitle="Order updates and offers" />
          <MenuRow icon={MapPin} title="Shipping address" subtitle="Home, work and saved locations" />
          <MenuRow icon={ShieldCheck} title="Privacy and security" subtitle="Password and account access" />
          <MenuRow icon={LogOut} title="Sign out" subtitle="Disconnect this account" danger />
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
    <View style={styles.statCard}>
      <Icon size={20} color={ACCENT} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuRow({
  icon: Icon,
  title,
  subtitle,
  danger,
}: {
  icon: React.ElementType<{ size?: number; color?: string }>;
  title: string;
  subtitle: string;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
      <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
        <Icon size={19} color={danger ? "#ff6666" : ACCENT} />
      </View>
      <View style={styles.menuText}>
        <Text style={[styles.menuTitle, danger && styles.dangerText]}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.chevron}>{">"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 16,
    paddingTop: 54,
    paddingBottom: 28,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  eyebrow: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: SOFT_CARD,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 18,
    marginBottom: 12,
  },
  avatarWrap: {
    marginRight: 16,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: BG,
    fontSize: 26,
    fontWeight: "900",
  },
  cameraButton: {
    position: "absolute",
    right: -5,
    bottom: -5,
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "800",
  },
  email: {
    color: "#888",
    fontSize: 13,
    marginTop: 4,
  },
  memberPill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f0c06018",
    borderWidth: 1,
    borderColor: "#f0c06044",
  },
  memberText: {
    color: ACCENT,
    fontSize: 12,
    fontWeight: "700",
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f0c06014",
    borderColor: "#f0c06033",
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  noticeText: {
    flex: 1,
    color: "#d7c28d",
    fontSize: 12,
    lineHeight: 17,
  },
  balanceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: ACCENT,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
  },
  balanceLabel: {
    color: "#2d230b",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  balanceAmount: {
    color: BG,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 2,
  },
  topUpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  topUpText: {
    color: BG,
    fontWeight: "800",
    fontSize: 13,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  statCard: {
    flex: 1,
    minHeight: 100,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    justifyContent: "space-between",
  },
  statValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  statLabel: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  viewAll: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actionCard: {
    width: "48%",
    minHeight: 86,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    justifyContent: "space-between",
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: SOFT_CARD,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  purchaseRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    marginBottom: 10,
  },
  purchaseIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: SOFT_CARD,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  purchaseInfo: {
    flex: 1,
    paddingRight: 8,
  },
  purchaseTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  purchaseMeta: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },
  purchasePrice: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: "800",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    marginBottom: 10,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: SOFT_CARD,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuIconDanger: {
    backgroundColor: "#ff444414",
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  dangerText: {
    color: "#ff6666",
  },
  menuSubtitle: {
    color: "#777",
    fontSize: 12,
    marginTop: 4,
  },
  chevron: {
    color: "#666",
    fontSize: 28,
    lineHeight: 28,
  },
});
