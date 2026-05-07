import { Stack } from 'expo-router';
import LoginScreen from './screens/loginscreen';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginScreen />
    </>
  );
}