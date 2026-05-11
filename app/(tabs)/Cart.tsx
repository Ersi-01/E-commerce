import { View, Text, Pressable, ScrollView } from "react-native"

import { router } from "expo-router"

import S, { Spacing } from "@/app/styles/global"

import Footer from "../components/Footer"

import { useCartStore } from "@/app/store/cartStore"

export default function Cart() {
  // Zustand state
  const cartProducts = useCartStore((state) => state.cart)

  const removeFromCart = useCartStore((state) => state.removeFromCart)

  const addToCart = useCartStore((state) => state.addToCart)

  // Increase quantity
  function increaseCount(product) {
    addToCart(product)
  }

  // Decrease quantity
  function decreaseCount(id) {
    const itemIndex = cartProducts.findIndex((item) => item.id === id)

    if (itemIndex === -1) return

    const updatedCart = [...cartProducts]

    updatedCart.splice(itemIndex, 1)

    useCartStore.setState({
      cart: updatedCart,
    })
  }

  // Group products by id
  const groupedCart = cartProducts.reduce((acc, item) => {
    const existing = acc.find((p) => p.id === item.id)

    if (existing) {
      existing.count += 1
    } else {
      acc.push({
        ...item,
        count: 1,
      })
    }

    return acc
  }, [])

  // Total price
  const totalPrice = groupedCart.reduce((total, product) => {
    return total + product.price * product.count
  }, 0)

  if (groupedCart.length > 0) {
    return (
      <View style={[S.screen, { flex: 1 }]}>
        {/* TOP BAR */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: "#f6f7fb",
            padding: 15,
            paddingTop: 0,
          }}
        >
          <Text
            style={[
              S.price,
              {
                marginTop: Spacing.lg,
                textAlign: "center",
                fontSize: 20,
              },
            ]}
          >
            Total: ${totalPrice.toFixed(2)}
          </Text>

          <Pressable
            style={S.btnPrimary}
            onPress={() => router.push("/screens/checkout")}
          >
            <Text style={S.btnPrimaryText}>Go to Checkout</Text>
          </Pressable>
        </View>

        {/* CART LIST */}
        <ScrollView
          contentContainerStyle={{
            paddingTop: 80,
            paddingBottom: 40,
            marginTop: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              S.heading,
              {
                marginBottom: Spacing.lg,
                textAlign: "left",
                alignSelf: "flex-start",
              },
            ]}
          >
            Shopping Cart
          </Text>

          <View style={{ width: "100%" }}>
            {groupedCart.map((product) => (
              <View key={product.id} style={S.card}>
                {/* REMOVE */}
                <Pressable onPress={() => removeFromCart(product.id)}>
                  <Text style={S.btnDangerText}>Remove</Text>
                </Pressable>

                <Text style={S.subheading}>{product.name}</Text>

                {/* QUANTITY */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#4f46e5",
                    borderRadius: 30,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    marginVertical: 8,
                    alignSelf: "flex-start",
                    gap: 12,
                  }}
                >
                  {/* MINUS */}
                  <Pressable
                    onPress={() => decreaseCount(product.id)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      −
                    </Text>
                  </Pressable>

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    {product.count}
                  </Text>

                  {/* PLUS */}
                  <Pressable
                    onPress={() => increaseCount(product)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>

                <Text style={S.price}>
                  Price: ${(product.price * product.count).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 50 }}>
            <Footer />
          </View>
        </ScrollView>
      </View>
    )
  }

  // EMPTY CART
  return (
    <View style={[S.screen, { flex: 1 }]}>
      <Text
        style={[
          S.heading,
          {
            position: "absolute",
            top: 20,
            left: 20,
          },
        ]}
      >
        Shopping Cart
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={S.emptyText}>Your cart is empty.</Text>
      </View>

      <Footer />
    </View>
  )
}
