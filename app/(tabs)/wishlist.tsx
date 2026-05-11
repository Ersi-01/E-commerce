import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import S, { Colors, Spacing, Typography, Radius } from "@/app/styles/global";
import { Heart, Trash2 } from "lucide-react-native";

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
      {/* Header */}
      <View style={[S.screenHeader, { marginBottom: Spacing.xl }]}>
        <View>
          <Text style={S.label}>Saved items</Text>
          <Text style={styles.pageTitle}>Wishlist</Text>
        </View>
        <View style={styles.countBadge}>
          <Heart size={14} color={Colors.danger} fill={Colors.danger} />
          <Text style={styles.countText}>{wishlist.length}</Text>
        </View>
      </View>

      {wishlist.length === 0 ? (
        <View style={[S.centered, { flex: 1 }]}>
          <View style={styles.emptyIcon}>
            <Heart size={36} color={Colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={[S.caption, { textAlign: "center" }]}>
            Items you wishlist will appear here
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.wishCard}>
                <View style={styles.heartDot}>
                  <Heart size={14} color={Colors.danger} fill={Colors.danger} />
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => {
                    removeFromWishlist(item.id);
                    showToast(`${item.name} removed`);
                  }}
                >
                  <Trash2 size={16} color={Colors.danger} />
                </TouchableOpacity>
              </View>
            )}
          />

          <Animated.View style={[styles.toast, { opacity }]}>
            <Text style={styles.toastText}>{toastMessage}</Text>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.xxxl,
    fontWeight: Typography.bold,
    letterSpacing: -0.3,
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.dangerBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
  },
  countText: {
    color: Colors.danger,
    fontWeight: Typography.bold,
    fontSize: Typography.sm,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.input,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    marginBottom: Spacing.sm,
  },
  wishCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  heartDot: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.dangerBg,
    alignItems: "center",
    justifyContent: "center",
  },
  itemInfo: {
    flex: 1,
    gap: 3,
  },
  itemName: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  itemCategory: {
    color: Colors.textMuted,
    fontSize: Typography.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: Typography.bold,
  },
  itemPrice: {
    color: Colors.accent,
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    letterSpacing: -0.3,
    marginTop: 2,
  },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.dangerBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
  },
  toast: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    backgroundColor: Colors.textPrimary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
  },
  toastText: {
    color: "#fff",
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
  },
});
