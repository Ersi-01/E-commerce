import {
  Camera,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  PackageCheck,
  Settings,
  ShoppingBag,
  Star,
  Wallet,
} from "lucide-react-native"
import React, { useEffect, useMemo, useState } from "react"
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useRouter } from "expo-router"
import { supabase } from "../utils/supabase"
import Navbar from "@/app/components/Navbar"
import { useWishlist } from "../context/WishlistContext"
import S, { Colors, Radius, Spacing, Typography } from "@/app/styles/global"
import storage from "@/app/utils/storage"

export default function Profile() {
  const router = useRouter()
  const { wishlist } = useWishlist()

  const [email, setEmail] = useState("user@store.com")
  const [name, setName] = useState("")
  const [balance, setBalance] = useState(0)
  const [orders, setOrders] = useState<any[]>([])

  const [topupVisible, setTopupVisible] = useState(false)
  const [topupAmount, setTopupAmount] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setEmail(data.user.email ?? '');
      setName(data.user.user_metadata?.name ?? '');
    }

    const savedBalance = await storage.get("@user_balance");
    if (savedBalance) {
      setBalance(Number(savedBalance));
    } else {
      await storage.set("@user_balance", "0");
    }

    const savedOrders = await storage.get("@user_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  } catch (err) {
    console.log(err);
  }
};

  const displayName = useMemo(() => {
    if (name) return name
    return (
      email
        .split("@")[0]
        ?.replace(/[._-]/g, " ")
        ?.replace(/\b\w/g, (l) => l.toUpperCase()) || "User"
    )
  }, [email, name])

  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }, [displayName])

  const deliveredCount = useMemo(() => {
    return orders.filter((x) => x.status?.toLowerCase() === "delivered").length
  }, [orders])

  const handleTopup = async () => {
    const amount = Number(topupAmount)

    if (!amount || amount <= 0) {
      Alert.alert("Error", "Invalid amount")
      return
    }

    const updated = balance + amount
    setBalance(updated)
    await storage.set("@user_balance", String(updated))
    setTopupVisible(false)
    setTopupAmount("")
    Alert.alert("Success", `Balance updated: EUR ${updated.toFixed(2)}`)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login' as any);
};

  return (
    <View
      style={[
        S.screenNoPad,
        {
          backgroundColor: Colors.bg,
          flex: 1,
        },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingTop: 54,
          paddingBottom: 160,
        }}
      >
        <View
          style={[
            S.screenHeader,
            {
              justifyContent: "space-between",
              marginBottom: Spacing.xl,
            },
          ]}
        >
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
          >
            <Settings size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            S.cardElevated,
            {
              flexDirection: "row",
              alignItems: "center",
              marginBottom: Spacing.lg,
            },
          ]}
        >
          <View
            style={{
              position: "relative",
              marginRight: Spacing.lg,
            }}
          >
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
                  color: "#fff",
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
                right: -4,
                bottom: -4,
                width: 30,
                height: 30,
                borderRadius: Radius.md,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={15} color="#111" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={S.subheading}>{displayName}</Text>
            <Text style={[S.caption, { marginTop: 4 }]}>{email}</Text>

            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginTop: 12,
                backgroundColor: Colors.accent + "18",
                borderRadius: 999,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Star size={12} color={Colors.accent} fill={Colors.accent} />
              <Text
                style={{
                  color: Colors.accent,
                  fontWeight: "700",
                  fontSize: Typography.xs,
                }}
              >
                Gold member
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: Colors.accent,
            borderRadius: Radius.xxl,
            padding: Spacing.xl,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: Spacing.xl,
          }}
        >
          <View>
            <Text
              style={{
                color: "#ffffff99",
                fontSize: Typography.xs,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Available balance
            </Text>

            <Text
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: "900",
                marginTop: 6,
              }}
            >
              EUR {balance.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setTopupVisible(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: Radius.lg,
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 8,
            }}
          >
            <CreditCard size={16} color="#111" />
            <Text style={{ color: "#111", fontWeight: "800" }}>
              Top up
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: Spacing.sm,
            marginBottom: Spacing.xl,
          }}
        >
          <StatCard icon={ShoppingBag} label="Purchases" value={String(orders.length)} />
          <StatCard icon={PackageCheck} label="Delivered" value={String(deliveredCount)} />
          <StatCard icon={Heart} label="Wishlist" value={String(wishlist.length)} />
        </View>

        <View>
          <Text style={[S.subheading, { marginBottom: Spacing.md }]}>
            Account
          </Text>

          <MenuRow
            icon={LogOut}
            title="Sign out"
            subtitle="Disconnect account"
            danger
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>


      {/* NAVBAR */}
      

      {/* TOPUP MODAL */}

      <Modal visible={topupVisible} transparent animationType="fade">
        <View 
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: Radius.xl,
              padding: 20,
            }}
          >
            <Text
              style={{
                color: Colors.textPrimary,
                fontSize: 20,
                fontWeight: "800",
                marginBottom: 16,
              }}
            >
              Top up balance
            </Text>

            <TextInput
              value={topupAmount}
              onChangeText={setTopupAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              placeholderTextColor={Colors.textMuted}
              style={{
                backgroundColor: Colors.input,
                borderRadius: Radius.lg,
                padding: 14,
                color: Colors.textPrimary,
                marginBottom: 20,
              }}
            />

            <TouchableOpacity
              onPress={handleTopup}
              style={{
                backgroundColor: Colors.accent,
                padding: 14,
                borderRadius: Radius.lg,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "800" }}>
                Add balance
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTopupVisible(false)}
              style={{ alignItems: "center" }}
            >
              <Text style={{ color: Colors.textMuted }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
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
      <Text style={{ color: Colors.textPrimary, fontSize: 22, fontWeight: "900" }}>
        {value}
      </Text>
      <Text style={{ color: Colors.textDim, fontSize: Typography.xs, fontWeight: "700" }}>
        {label}
      </Text>
    </View>
  )
}

function MenuRow({
  icon: Icon,
  title,
  subtitle,
  danger,
  onPress,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  danger?: boolean
  onPress?: () => void
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
        <Icon size={18} color={danger ? Colors.danger : Colors.accent} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: danger ? Colors.danger : Colors.textPrimary,
            fontWeight: "700",
            fontSize: Typography.base,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: Colors.textDim,
            fontSize: Typography.sm,
            marginTop: 4,
          }}
        >
          {subtitle}
        </Text>
      </View>

      <Text style={{ color: Colors.textMuted, fontSize: 28 }}>›</Text>
    </TouchableOpacity>
  )
} 