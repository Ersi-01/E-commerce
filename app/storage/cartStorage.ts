import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart";

export async function getCart() {
    const data = await AsyncStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

export async function increaseCount(productId) {
    const cart = await getCart();

    const updated = cart.map((p) =>
        p.id === productId
            ? { ...p, count: (p.count || 1) + 1 }
            : p
    );

    await saveCart(updated);
}

export async function decreaseCount(productId) {
    const cart = await getCart();

    const updated = cart
        .map((p) =>
            p.id === productId
                ? { ...p, count: (p.count || 1) - 1 }
                : p
        )
        .filter((p) => p.count > 0);

    await saveCart(updated);
}

export async function saveCart(cart) {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export async function addToCart(product) {
    const cart = await getCart();

    const exists = cart.find((p) => p.id === product.id);

    let updated;

    if (exists) {
        updated = cart.map((p) =>
            p.id === product.id
                ? { ...p, count: (p.count || 1) + 1 }
                : p
        );
    } else {
        updated = [...cart, { ...product, count: 1 }];
    }

    await saveCart(updated);
}

export async function removeFromCart(productId) {
    const cart = await getCart();
    const updated = cart.filter((p) => p.id !== productId);
    await saveCart(updated);
}