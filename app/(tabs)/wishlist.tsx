import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";
import { useWishlist } from "../context/WishlistContext";
import S, { Colors, Spacing } from "@/app/styles/global";
import { useRef, useState } from "react";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [toastMessage, setToastMessage] = useState("");
  const opacity = useRef(new Animated.Value(0)).current;

  function showToast(message: string) {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }

  return (
    <View style={S.screen}>
      <Text style={S.heading}>❤️ Wishlist ({wishlist.length})</Text>

      {wishlist.length === 0 ? (
        <Text style={S.emptyText}>Wishlist juaj është bosh</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <View style={S.card}>
              {/* Product Info */}
              <View style={{ flex: 1 }}>
                <Text style={S.subheading}>{item.name}</Text>
                <Text style={[S.label, { marginTop: Spacing.xs }]}>{item.category}</Text>
                <Text style={[S.price, { marginTop: Spacing.xs }]}>€{item.price}</Text>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.danger,
                  paddingHorizontal: Spacing.lg,
                  paddingVertical: Spacing.sm + 2,
                  borderRadius: 8,
                  marginLeft: 620,
                }}
                onPress={() => {
                  removeFromWishlist(item.id);
                  showToast(`${item.name} removed from wishlist`);
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 13 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Toast Notification */}
      <Animated.View
        style={[
          {
            opacity,
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
            backgroundColor: Colors.textPrimary,
            paddingHorizontal: Spacing.lg,
            paddingVertical: Spacing.md,
            borderRadius: 24,
          },
        ]}
      >
        <Text style={{ color: Colors.card, fontSize: 14, fontWeight: "600" }}>
          {toastMessage}
        </Text>
      </Animated.View>
    </View>
  );
}