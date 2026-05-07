import { Stack } from 'expo-router';
import RegisterScreen from './screens/registerscreen';

export default function Register() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RegisterScreen />
    </>
  );
}