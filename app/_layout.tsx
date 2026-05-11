import { Slot } from 'expo-router';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';

export default function RootLayout() {
  return (
    <WishlistProvider>
            <ThemeProvider>
      <Slot />
      </ThemeProvider>
    </WishlistProvider>
  );
}