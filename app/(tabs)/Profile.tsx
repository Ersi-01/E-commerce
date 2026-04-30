import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function Profile() {
  const user = {
    name: "Guest User",
    email: "guest@email.com",
    balance: 120.5,
    orders: 8,
    wishlist: 14,
    address: "Tirana, Albania",
    memberSince: "2025",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Account</Text>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text>{user.email}</Text>
          <Text style={styles.muted}>
            Member since {user.memberSince}
          </Text>
        </View>
      </View>

      {/* Balance */}
      <View style={styles.balanceCard}>
        <Text>Wallet Balance</Text>
        <Text style={styles.balance}>
          ${user.balance.toFixed(2)}
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.orders}</Text>
          <Text>Orders</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.wishlist}</Text>
          <Text>Wishlist</Text>
        </View>
      </View>

      {/* Address */}
      <View style={styles.infoCard}>
        <Text>📍 Shipping Address</Text>
        <Text>{user.address}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <AppButton label="Edit Profile" />
        <AppButton label="My Orders" />
        <AppButton label="Payment Methods" />
        <AppButton label="Logout" danger />
      </View>
    </ScrollView>
  );
}

/* Reusable Button */
function AppButton({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, danger && styles.logout]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    maxWidth: 720, // works but mostly ignored on mobile
    alignSelf: "center",
    padding: 25,
    backgroundColor: "#fafafa",
    flexGrow: 1,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15, // replaces gap
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  muted: {
    fontSize: 12,
    color: "gray",
  },
  balanceCard: {
    marginTop: 15,
    backgroundColor: "#e8fff0",
    padding: 15,
    borderRadius: 12,
  },
  balance: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stats: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    borderRadius: 12,
    elevation: 3,
    marginHorizontal: 5, // replaces gap
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoCard: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
  },
  actions: {
    marginTop: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "black",
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  logout: {
    backgroundColor: "red",
  },
});