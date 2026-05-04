import { View, Text, Pressable } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { getCart, removeFromCart, increaseCount, decreaseCount } from "../storage/cartStorage";
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

  if (cartProducts.length > 0) {
    return (
      <View style={[S.screen, { justifyContent: "space-between" }]}>
        <View>
          {cartProducts.map((product) => (
            <View key={product.id} style={S.card}>
              <Pressable onPress={() => handleRemove(product.id)}>
                <Text style={S.btnDangerText}>Remove</Text>
              </Pressable>

              <Text style={S.subheading}>{product.name}</Text>
              <Pressable onPress={async () => {
                await increaseCount(product.id);
                loadCart();
              }}>
                <Text>+</Text>
              </Pressable>
              <Text>
                Quantity: {product.count || 1}
              </Text>

              <Pressable onPress={async () => {
                await decreaseCount(product.id);
                loadCart();
              }}>
                <Text>-</Text>
              </Pressable>

              <Text style={S.price}>Price: ${product.price}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={[S.btnPrimary, { marginTop: Spacing.lg }]}
          onPress={() => router.push("/checkout")}
        >
          <Text style={S.btnPrimaryText}>Go to Checkout</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={S.screen}>
      <Text style={S.emptyText}>Your cart is empty.</Text>
    </View>
  );
}