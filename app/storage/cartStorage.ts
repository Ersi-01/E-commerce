import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart";

export async function getCart() {
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

export async function saveCart(cart) {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export async function addToCart(product) {
    const cart = await getCart();

    const exists = cart.find((p) => p.id === product.id);
    if (exists) return;

    const updated = [...cart, product];
    await saveCart(updated);
}

export async function removeFromCart(productId) {
    const cart = await getCart();
    const updated = cart.filter((p) => p.id !== productId);
    await saveCart(updated);
}