import { Slot } from 'expo-router';
import { WishlistProvider } from './context/WishlistContext';

export default function RootLayout() {
  return (
    <WishlistProvider>
      <Slot />
    </WishlistProvider>
  );
}