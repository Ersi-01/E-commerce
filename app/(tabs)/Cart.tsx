import { View, Text, Pressable } from "react-native";
import { useEffect, useState, useCallback } from "react";
import {
  getCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
} from "../storage/cartStorage";
import { useFocusEffect, router } from "expo-router";

import S, { Spacing } from "@/app/styles/global";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, [])
  );

  async function loadCart() {
    const data = await getCart();
    setCartProducts(data);
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleRemove(id) {
    await removeFromCart(id);
    loadCart();
  }

  // Calculate total price
  const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.price * (product.count || 1);
  }, 0);

  if (cartProducts.length > 0) {
    return (
      <View
        style={[
          S.screen,
          {
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingTop: 20,
          },
        ]}
      >
        {/* Title */}
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

        {/* Products */}
        <View style={{ width: "100%" }}>
          {cartProducts.map((product) => (
            <View key={product.id} style={S.card}>
              <Pressable onPress={() => handleRemove(product.id)}>
                <Text style={S.btnDangerText}>Remove</Text>
              </Pressable>

              <Text style={S.subheading}>{product.name}</Text>

              <Pressable
                onPress={async () => {
                  await increaseCount(product.id);
                  loadCart();
                }}
              >
                <Text>+</Text>
              </Pressable>

              <Text>Quantity: {product.count || 1}</Text>

              <Pressable
                onPress={async () => {
                  await decreaseCount(product.id);
                  loadCart();
                }}
              >
                <Text>-</Text>
              </Pressable>

              <Text style={S.price}>
                Price: $
                {(product.price * (product.count || 1)).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Price */}
        <Text
          style={[
            S.subheading,
            {
              marginTop: Spacing.lg,
              marginBottom: Spacing.md,
              alignSelf: "flex-start",
            },
          ]}
        >
          Total: ${totalPrice.toFixed(2)}
        </Text>

        {/* Checkout Button */}
        <Pressable
          style={[S.btnPrimary, { marginTop: Spacing.md }]}
          onPress={() => router.push("/screens/checkout")}
        >
          <Text style={S.btnPrimaryText}>Go to Checkout</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[S.screen, { paddingTop: 20 }]}>
      {/* Title in top left */}
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

      {/* Empty text centered */}
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={S.emptyText}>Your cart is empty.</Text>
      </View>
    </View>
  );
}