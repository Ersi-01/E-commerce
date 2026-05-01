import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

type Product = {
    id: string;
    name: string;
};

export default function Wishlist() {
    // demo data (derisa ta lidhësh me Products)
    const [wishlist, setWishlist] = useState<Product[]>([
        { id: "1", name: "Nike Shoes" },
        { id: "2", name: "iPhone 15" },
    ]);

    const removeItem = (id: string) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>❤️ Wishlist</Text>

            {wishlist.length === 0 ? (
                <Text style={styles.empty}>No items in wishlist</Text>
            ) : (
                <FlatList
                    data={wishlist}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.name}>{item.name}</Text>

                            <Pressable
                                style={styles.button}
                                onPress={() => removeItem(item.id)}
                            >
                                <Text style={styles.buttonText}>Remove</Text>
                            </Pressable>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 16,
    },

    empty: {
        color: "#aaa",
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },

    card: {
        backgroundColor: "#1a1a1a",
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
    },

    name: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },

    button: {
        backgroundColor: "#ff4d4d",
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
});