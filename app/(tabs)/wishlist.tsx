import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";
import { useWishlist } from "../context/WishlistContext";
import S, { Colors, Spacing, Typography, Radius } from "@/app/styles/global";
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
        <Text style={S.emptyText}>Wishlist is empty</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <View style={[S.card, S.rowBetween]}>
      
              <View style={{ flex: 1 }}>
                <Text style={S.subheading}>{item.name}</Text>
                <Text style={[S.label, { marginTop: Spacing.xs }]}>{item.category}</Text>
                <Text style={[S.price, { marginTop: Spacing.xs, fontSize: Typography.xl }]}>
                  €{item.price}
                </Text>
              </View>

           
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: Colors.danger,
                  paddingHorizontal: Spacing.md,
                  paddingVertical: Spacing.sm,
                  borderRadius: Radius.md,
                  marginLeft: Spacing.md,
                }}
                onPress={() => {
                  removeFromWishlist(item.id);
                  showToast(`${item.name} removed from wishlist`);
                }}
              >
                <Text style={{ color: Colors.danger, fontWeight: Typography.semibold, fontSize: Typography.sm }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Animated.View
        style={{
          opacity,
          position: "absolute",
          bottom: 30,
          alignSelf: "center",
          backgroundColor: Colors.textPrimary,
          paddingHorizontal: Spacing.lg,
          paddingVertical: Spacing.md,
          borderRadius: Radius.full,
        }}
      >
        <Text style={{ color: Colors.card, fontSize: Typography.sm, fontWeight: Typography.semibold }}>
          {toastMessage}
        </Text>
      </Animated.View>
    </View>
  );
}