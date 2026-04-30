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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      {/* HEADER CARD */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.muted}>
            Member since {user.memberSince}
          </Text>
        </View>
      </View>

      {/* BALANCE */}
      <View style={styles.balanceCard}>
        <Text style={styles.sectionTitle}>Wallet Balance</Text>
        <Text style={styles.balance}>
          ${user.balance.toFixed(2)}
        </Text>
      </View>

      {/* STATS */}
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

      {/* ADDRESS */}
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>📍 Shipping Address</Text>
        <Text>{user.address}</Text>
      </View>

      {/* ACTIONS */}
      <div className="actions">
        <button>Edit Profile</button>
        <button>My Orders</button>
        <button>Payment Methods</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}