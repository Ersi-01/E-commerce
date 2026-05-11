import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native"
import { router } from "expo-router"
import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global"
import Footer from "../components/Footer"
import { useCartStore } from "@/app/store/cartStore"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react-native"

export default function Cart() {
  const cartProducts = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const addToCart = useCartStore((state) => state.addToCart)

  function increaseCount(product) {
    addToCart(product)
  }

  function decreaseCount(id) {
    const itemIndex = cartProducts.findIndex((item) => item.id === id)
    if (itemIndex === -1) return
    const updatedCart = [...cartProducts]
    updatedCart.splice(itemIndex, 1)
    useCartStore.setState({ cart: updatedCart })
  }

  const groupedCart = cartProducts.reduce((acc, item) => {
    const existing = acc.find((p) => p.id === item.id)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ ...item, count: 1 })
    }
    return acc
  }, [])

  const totalPrice = groupedCart.reduce((total, product) => {
    return total + product.price * product.count
  }, 0)

  if (groupedCart.length > 0) {
    return (
      <View style={S.screen}>
        {/* Header */}
        <View style={[S.screenHeader, { marginBottom: Spacing.xl }]}>
          <View>
            <Text style={S.label}>Your order</Text>
            <Text style={styles.pageTitle}>Shopping Cart</Text>
          </View>
          <View style={styles.itemCountBadge}>
            <Text style={styles.itemCountText}>{groupedCart.length}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Spacing.xxxl }}>
          {/* Cart items */}
          {groupedCart.map((product) => (
            <View key={product.id} style={styles.cartItem}>
              <View style={styles.itemIcon}>
                <ShoppingCart size={18} color={Colors.accent} />
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.itemPrice}>${(product.price * product.count).toFixed(2)}</Text>
              </View>

              {/* Quantity controls */}
              <View style={styles.qtyRow}>
                <Pressable
                  onPress={() => decreaseCount(product.id)}
                  style={styles.qtyBtn}
                >
                  <Minus size={14} color={Colors.textPrimary} />
                </Pressable>
                <Text style={styles.qtyText}>{product.count}</Text>
                <Pressable
                  onPress={() => increaseCount(product)}
                  style={[styles.qtyBtn, styles.qtyBtnAccent]}
                >
                  <Plus size={14} color="#fff" />
                </Pressable>
              </View>

              <Pressable onPress={() => removeFromCart(product.id)} style={styles.removeBtn}>
                <Trash2 size={16} color={Colors.danger} />
              </Pressable>
            </View>
          ))}

          {/* Order summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={S.rowBetween}>
              <Text style={S.body}>Subtotal ({groupedCart.length} items)</Text>
              <Text style={S.body}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={S.rowBetween}>
              <Text style={S.body}>Shipping</Text>
              <Text style={[S.body, { color: Colors.success }]}>Free</Text>
            </View>
            <View style={styles.totalDivider} />
            <View style={S.rowBetween}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [S.btnPrimary, pressed && { opacity: 0.88 }]}
            onPress={() => router.push("/screens/checkout")}
          >
            <Text style={S.btnPrimaryText}>Proceed to Checkout →</Text>
          </Pressable>

          <View style={{ marginTop: Spacing.xl }}>
            <Footer />
          </View>
        </ScrollView>
      </View>
    )
  }

  // EMPTY CART
  return (
    <View style={[S.screen, S.centered]}>
      <View style={styles.emptyIcon}>
        <ShoppingCart size={40} color={Colors.textMuted} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={[S.caption, { textAlign: "center", marginBottom: Spacing.xxl }]}>
        Add some products to get started
      </Text>
      <Pressable
        style={[S.btnPrimary, { paddingHorizontal: Spacing.xxl }]}
        onPress={() => router.push("/(tabs)/Products")}
      >
        <Text style={S.btnPrimaryText}>Browse Products</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  pageTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.xxxl,
    fontWeight: Typography.bold,
    letterSpacing: -0.3,
  },
  itemCountBadge: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  itemCountText: {
    color: Colors.accent,
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
    shadowColor: "#1e293b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.accentLight,
    alignItems: "center",
    justifyContent: "center",
  },
  itemDetails: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  itemPrice: {
    color: Colors.accent,
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: Radius.xs,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.input,
  },
  qtyBtnAccent: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  qtyText: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    minWidth: 20,
    textAlign: "center",
  },
  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    backgroundColor: Colors.dangerBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.dangerBorder,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginVertical: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  summaryTitle: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    marginBottom: Spacing.sm,
  },
  totalDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  totalLabel: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
  },
  totalAmount: {
    color: Colors.accent,
    fontSize: Typography.xl,
    fontWeight: Typography.extrabold,
    letterSpacing: -0.3,
  },
  emptyIcon: {
    width: 80,
    height: 80,
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
})
