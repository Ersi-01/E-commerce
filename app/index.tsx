import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem('@ecommerce_user').then(user => {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login' as any);
      }
    });
  }, []);

  return null;
}