import { useState, useCallback } from "react";
import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator, StatusBar, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "expo-router";
import { getCart, saveCart } from "@/app/storage/cartStorage";
import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global";
import Navbar from "@/app/components/Navbar";

const PAYPAL_CLIENT_ID = "BAAoqXZHnRJIO1LikgimdZZRvJSLy4kLJ1U1S1W9wqMhz0NS-NK9-4SLk9bJfSYYFNvBirXqlIMW3PwIKY";
const PAYPAL_SECRET = "ENBWlSMd0kODUkd3-n4yd4kqQDqDc3t8fTgOis1NfPEDoGAwWlRSGwb9TxnzwdWZJ4xaFevd2MHjeQ47";
const PAYPAL_BASE = "https://api-m.sandbox.paypal.com";
const RETURN_URL = "https://example.com/paypal-return";
const CANCEL_URL = "https://example.com/paypal-cancel";

type Product = {
	id: string;
	name: string;
	price: number;
	count?: number;
};

async function getAccessToken(): Promise<string> {
	const credentials = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`);
	const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
		method: "POST",
		headers: {
			Authorization: `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: "grant_type=client_credentials",
	});
	const data = await res.json();
	return data.access_token;
}

async function createOrder(total: string, accessToken: string): Promise<{ approvalUrl: string; orderId: string }> {
	const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			intent: "CAPTURE",
			purchase_units: [{ amount: { currency_code: "USD", value: total } }],
			application_context: {
				return_url: RETURN_URL,
				cancel_url: CANCEL_URL,
				shipping_preference: "NO_SHIPPING",
			},
		}),
	});
	const data = await res.json();
	const approvalUrl = data.links?.find((l: any) => l.rel === "approve")?.href;
	if (!approvalUrl) throw new Error("No approval URL in PayPal response");
	return { approvalUrl, orderId: data.id };
}

async function captureOrder(orderId: string, accessToken: string): Promise<void> {
	await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	});
}

export default function Checkout() {
	const [cart, setCart] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [placing, setPlacing] = useState<boolean>(false);
	const [showPayPal, setShowPayPal] = useState<boolean>(false);
	const [approvalUrl, setApprovalUrl] = useState<string | null>(null);
	const [orderId, setOrderId] = useState<string | null>(null);
	const [search, setSearch] = useState("");

	useFocusEffect(
		useCallback(() => {
			loadCart();
		}, [])
	);

	async function loadCart() {
		try {
			const data: Product[] = await getCart();
			setCart(data);
		} finally {
			setLoading(false);
		}
	}

	const total: string = cart
		.reduce((sum: number, p: Product) => sum + p.price * (p.count || 1), 0)
		.toFixed(2);

	async function handlePlaceOrder(): Promise<void> {
		try {
			setPlacing(true);
			const token = await getAccessToken();
			const { approvalUrl: url, orderId: id } = await createOrder(total, token);
			setApprovalUrl(url);
			setOrderId(id);
			setShowPayPal(true);
		} catch {
			Alert.alert("Error", "Could not connect to PayPal. Check your internet connection.");
		} finally {
			setPlacing(false);
		}
	}

	async function handleNavigationChange(navState: { url: string }): Promise<void> {
		const { url } = navState;

		if (url.startsWith(CANCEL_URL)) {
			setShowPayPal(false);
			setApprovalUrl(null);
			return;
		}

		if (url.startsWith(RETURN_URL)) {
			setShowPayPal(false);
			setApprovalUrl(null);
			try {
				setPlacing(true);
				const token = await getAccessToken();
				await captureOrder(orderId!, token);
				await saveCart([]);
				setCart([]);
				Alert.alert("Order placed!", "Thank you for your purchase.");
			} catch {
				Alert.alert("Payment failed", "Something went wrong capturing the payment.");
			} finally {
				setPlacing(false);
			}
		}
	}

	if (loading) {
		return (
			<View style={[S.screen, S.centered]}>
				<ActivityIndicator color={Colors.accent} />
			</View>
		);
	}

	return (
		<View style={[S.screenNoPad, { backgroundColor: Colors.bg }]}>
			<StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
			<Navbar search={search} setSearch={setSearch} />
			
			<Modal visible={showPayPal} animationType="slide" onRequestClose={() => setShowPayPal(false)}>
				<View style={[S.screenNoPad, { backgroundColor: Colors.bg }]}>
					<View style={[S.rowBetween, {
						paddingHorizontal: Spacing.lg,
						paddingTop: Spacing.lg,
						paddingBottom: Spacing.lg,
						borderBottomWidth: 1,
						borderBottomColor: Colors.border,
						backgroundColor: Colors.card,
					}]}>
						<Text style={[S.heading, { marginBottom: 0 }]}>Pay with PayPal</Text>
						<Pressable
							onPress={() => { setShowPayPal(false); setApprovalUrl(null); }}
							style={({ pressed }) => [
								{
									backgroundColor: Colors.input,
									borderRadius: Radius.full,
									borderWidth: 1,
									borderColor: Colors.border,
									width: 36,
									height: 36,
									alignItems: "center",
									justifyContent: "center",
								},
								pressed && { opacity: 0.7 },
							]}
						>
							<Text style={{ color: Colors.textPrimary, fontSize: Typography.lg }}>✕</Text>
						</Pressable>
					</View>

					{approvalUrl && (
						<WebView
							source={{ uri: approvalUrl }}
							onNavigationStateChange={handleNavigationChange}
							javaScriptEnabled
							style={{ backgroundColor: Colors.bg }}
						/>
					)}
				</View>
			</Modal>

			{cart.length === 0 ? (
				<View style={[S.screen, S.centered]}>
					<Text style={S.emptyText}>Your cart is empty.</Text>
				</View>
			) : (
				<ScrollView
					contentContainerStyle={{ padding: Spacing.lg, paddingBottom: 48 }}
					showsVerticalScrollIndicator={false}
				>
					<Text style={[S.heading, { marginBottom: Spacing.xl }]}>Checkout</Text>

					<Text style={S.sectionTitle}>Order Summary</Text>
					<View style={S.card}>
						{cart.map((product: Product) => (
							<View key={product.id} style={[S.rowBetween, { paddingVertical: Spacing.xs }]}>
								<Text style={{ color: Colors.textPrimary, fontSize: Typography.md, flex: 1 }}>
									{product.name}
									{(product.count ?? 1) > 1 && (
										<Text style={{ color: Colors.textDim }}>{" "}x{product.count}</Text>
									)}
								</Text>
								<Text style={S.price}>${(product.price * (product.count || 1)).toFixed(2)}</Text>
							</View>
						))}
						<View style={{ height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm }} />
						<View style={S.rowBetween}>
							<Text style={{ color: Colors.textPrimary, fontSize: Typography.lg, fontWeight: Typography.bold }}>
								Total
							</Text>
							<Text style={[S.price, { fontSize: Typography.lg }]}>${total}</Text>
						</View>
					</View>

					<Pressable
						style={({ pressed }) => [
							S.btnPrimary,
							{ marginTop: Spacing.xxl },
							pressed && { opacity: 0.85 },
							placing && S.btnDisabled,
						]}
						onPress={handlePlaceOrder}
						disabled={placing}
					>
						{placing ? (
							<ActivityIndicator color={Colors.accentDark} />
						) : (
							<Text style={S.btnPrimaryText}>Place Order</Text>
						)}
					</Pressable>
				</ScrollView>
			)}
		</View>
	);
}