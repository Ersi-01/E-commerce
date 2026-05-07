import { View, Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState, useCallback } from "react";
import {
  getCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
} from "../storage/cartStorage";
import { useFocusEffect, router } from "expo-router";

import S, { Spacing } from "@/app/styles/global";
import Footer from "../components/Footer";

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, []),
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

  const totalPrice = cartProducts.reduce((total, product) => {
    return total + product.price * (product.count || 1);
  }, 0);

  if (cartProducts.length > 0) {
    return (
      <View style={[S.screen, { flex: 1 }]}>
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
            borderBottomWidth: 1,
            borderBottomColor: "#ffffff00",
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
            {cartProducts.map((product) => (
              <View key={product.id} style={S.card}>
                <Pressable onPress={() => handleRemove(product.id)}>
                  <Text style={S.btnDangerText}>Remove</Text>
                </Pressable>

                <Text style={S.subheading}>{product.name}</Text>

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
                  <Pressable
                    onPress={async () => {
                      await decreaseCount(product.id);
                      loadCart();
                    }}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>−</Text>
                  </Pressable>

                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    {product.count || 1}
                  </Text>

                  <Pressable
                    onPress={async () => {
                      await increaseCount(product.id);
                      loadCart();
                    }}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>+</Text>
                  </Pressable>
                </View>

                <Text style={S.price}>
                  Price: ${(product.price * (product.count || 1)).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 50 }}>
            <Footer />
          </View>
        </ScrollView>
      </View>
    );
  }

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
  );
}
