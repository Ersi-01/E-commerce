import { View, Text, FlatList, TouchableOpacity } from "react-native";
import products from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { addToCart } from "../storage/cartStorage";
import S from "@/app/styles/global";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  inStock: boolean;
  description: string;
};

export default function ProductsScreen() {
  const { addToWishlist, isInWishlist } = useWishlist();

  const renderItem = ({ item }: { item: Product }) => (
    <View style={S.card}>
      <Text style={S.subheading}>{item.name}</Text>
      <Text style={S.label}>{item.category}</Text>
      <Text style={S.body}>{item.description}</Text>
      <Text style={S.price}>${item.price}</Text>
      <Text style={S.rating}>⭐ {item.rating}</Text>
      <Text style={item.inStock ? S.inStock : S.outOfStock}>
        {item.inStock ? `In Stock: ${item.stock}` : "Out of Stock"}
      </Text>

      <TouchableOpacity
        style={[S.btnSecondary, !item.inStock && S.btnDisabled]}
        disabled={!item.inStock}
        onPress={() => addToCart(item)}
      >
        <Text style={S.btnSecondaryText}>
          {item.inStock ? "Add to Cart" : "Unavailable"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[S.btnChip, isInWishlist(item.id) && S.btnDisabled]}
        onPress={() => addToWishlist(item)}
        disabled={isInWishlist(item.id)}
      >
        <Text style={S.btnChipText}>
          {isInWishlist(item.id) ? "In Wishlist" : "Add to Wishlist"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={S.screen}>
      <Text style={S.heading}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item: { id: number }) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}