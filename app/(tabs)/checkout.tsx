import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert, ActivityIndicator, } from "react-native";
import { getCart, saveCart } from "../storage/cartStorage";
import S, { Colors, Spacing, Typography, Radius } from "@/app/styles/global";

type Product = {
	id: string;
	name: string;
	price: number;
};

type Props = {
	navigation: {
		navigate: (screen: string) => void;
	};
};

type ShippingForm = {
	name: string;
	address: string;
	city: string;
};

export default function Checkout({ navigation }: Props) {
	const [cart, setCart] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [placing, setPlacing] = useState<boolean>(false);
	const [form, setForm] = useState<ShippingForm>({
		name: "",
		address: "",
		city: "",
	});

	useEffect(() => {
		getCart()
		.then((data: Product[]) => setCart(data))
		.finally(() => setLoading(false));
	}, []);

	function updateField(field: keyof ShippingForm, value: string): void {
		setForm((prev) => ({ ...prev, [field]: value }));
	}

	const total: string = cart
		.reduce((sum: number, p: Product) => sum + p.price, 0)
		.toFixed(2);

	async function handlePlaceOrder(): Promise<void> {
		if (!form.name.trim() || !form.address.trim() || !form.city.trim()) {
			Alert.alert("Missing info", "Please fill in all fields.");
			return;
		}
		setPlacing(true);
		await saveCart([]);
		setPlacing(false);
		navigation.navigate("OrderConfirmation");
	}

	if (loading) {
		return (
			<View style={[S.screen, S.centered]}>
				<ActivityIndicator color={Colors.accent} />
			</View>
		);
	}

	if (cart.length === 0) {
		return (
			<View style={[S.screen, S.centered]}>
				<Text style={S.emptyText}>Your cart is empty.</Text>
			</View>
		);
	}

	return (
		<ScrollView
			style={S.screenNoPad}
			contentContainerStyle={{ padding: Spacing.lg, paddingBottom: 48 }}
		>
		<Text style={S.heading}>Checkout</Text>
		<Text style={S.sectionTitle}>Order Summary</Text>
		<View style={S.card}>
			{cart.map((product: Product) => (
			<View key={product.id} style={[S.rowBetween, { paddingVertical: Spacing.xs }]}>
				<Text style={{ color: Colors.textPrimary, fontSize: Typography.md, flex: 1 }}>
				{product.name}
				</Text>
				<Text style={S.price}>${product.price.toFixed(2)}</Text>
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
		<Text style={S.sectionTitle}>Shipping Info</Text>
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
	);
}