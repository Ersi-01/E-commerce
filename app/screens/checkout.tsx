import { useState, useCallback } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert, ActivityIndicator, StatusBar, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "expo-router";
import { getCart, saveCart } from "@/app/storage/cartStorage";
import S, { Colors, Spacing, Radius, Typography } from "@/app/styles/global";
import Navbar from "@/app/components/Navbar";

type Product = {
	id: string;
	name: string;
	price: number;
	count?: number;
};

type ShippingForm = {
	name: string;
	address: string;
	city: string;
};

function buildPaypalHTML(total: string): string {
	return `
		<html>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<script src="https://www.paypal.com/sdk/js?client-id=BAAoqXZHnRJIO1LikgimdZZRvJSLy4kLJ1U1S1W9wqMhz0NS-NK9-4SLk9bJfSYYFNvBirXqlIMW3PwIKY&currency=USD"></script>
			<style>
				* { box-sizing: border-box; margin: 0; padding: 0; }
				body {
					background: #f6f7fb;
					padding: 24px 16px;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-family: sans-serif;
				}
				.label {
					font-size: 11px;
					font-weight: 600;
					color: #64748b;
					letter-spacing: 0.8px;
					text-transform: uppercase;
					margin-bottom: 6px;
				}
				.total {
					font-size: 30px;
					font-weight: 800;
					color: #4f46e5;
					margin-bottom: 32px;
				}
				#paypal-button-container { width: 100%; max-width: 400px; }
			</style>
		</head>
		<body>
			<p class="label">Total due</p>
			<p class="total">$${total}</p>
			<div id="paypal-button-container"></div>
			<script>
				paypal.Buttons({
					createOrder: function(data, actions) {
						return actions.order.create({
							purchase_units: [{ amount: { value: '${total}' } }]
						});
					},
					onApprove: function(data, actions) {
						return actions.order.capture().then(function(details) {
							window.ReactNativeWebView.postMessage(JSON.stringify({ success: true, details }));
						});
					},
					onError: function(err) {
						window.ReactNativeWebView.postMessage(JSON.stringify({ success: false, error: String(err) }));
					},
					onCancel: function() {
						window.ReactNativeWebView.postMessage(JSON.stringify({ success: false, cancelled: true }));
					}
				}).render('#paypal-button-container');
			</script>
		</body>
		</html>
	`;
}

export default function Checkout() {
	const [cart, setCart] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [placing, setPlacing] = useState<boolean>(false);
	const [showPayPal, setShowPayPal] = useState<boolean>(false);
	const [search, setSearch] = useState("");
	const [form, setForm] = useState<ShippingForm>({
		name: "",
		address: "",
		city: "",
	});

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

	function updateField(field: keyof ShippingForm, value: string): void {
		setForm((prev) => ({ ...prev, [field]: value }));
	}

	const total: string = cart
		.reduce((sum: number, p: Product) => sum + p.price * (p.count || 1), 0)
		.toFixed(2);

	function handlePlaceOrder(): void {
		if (!form.name.trim() || !form.address.trim() || !form.city.trim()) {
			Alert.alert("Missing info", "Please fill in all fields.");
			return;
		}
		setShowPayPal(true);
	}

	async function handlePayPalMessage(event: { nativeEvent: { data: string } }): Promise<void> {
		const data = JSON.parse(event.nativeEvent.data);

		if (data.cancelled) {
			setShowPayPal(false);
			return;
		}

		setShowPayPal(false);

		if (data.success) {
			setPlacing(true);
			await saveCart([]);
			setCart([]);
			setPlacing(false);
			Alert.alert("Order placed!", "Thank you for your purchase.");
		} else {
			Alert.alert("Payment failed", "Something went wrong. Please try again.");
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

					{/* Header */}
					<View style={[S.rowBetween, {
						paddingHorizontal: Spacing.lg,
						paddingTop: Spacing.xxl,
						paddingBottom: Spacing.lg,
						borderBottomWidth: 1,
						borderBottomColor: Colors.border,
						backgroundColor: Colors.card,
					}]}>
						<Text style={[S.heading, { marginBottom: 0 }]}>Pay with PayPal</Text>
						<Pressable
							onPress={() => setShowPayPal(false)}
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

					<WebView
						source={{ html: buildPaypalHTML(total) }}
						onMessage={handlePayPalMessage}
						javaScriptEnabled
						style={{ backgroundColor: Colors.bg }}
					/>

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

					<Text style={[S.sectionTitle, { marginTop: Spacing.xl }]}>Shipping Info</Text>
					<View style={S.card}>
						{(["name", "address", "city"] as (keyof ShippingForm)[]).map((field, i, arr) => (
							<View key={field} style={{ marginBottom: i < arr.length - 1 ? Spacing.sm : 0 }}>
								<Text style={S.label}>{field}</Text>
								<View style={S.inputWrapper}>
									<TextInput
										style={S.inputText}
										placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
										placeholderTextColor={Colors.textMuted}
										value={form[field]}
										onChangeText={(v) => updateField(field, v)}
									/>
								</View>
							</View>
						))}
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