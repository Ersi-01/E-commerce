import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginErrors = {
  email?: string | null;
  password?: string | null;
  general?: string | null;
};

type NavigationProp = {
  navigate: (screen: string, params?: Record<string, unknown>) => void;
};

interface LoginScreenProps {
  navigation?: NavigationProp;
}

const STORAGE_KEYS = {
  USER_TOKEN: '@ecommerce_user_token',
  USER_EMAIL: '@ecommerce_user_email',
  REMEMBER_ME: '@ecommerce_remember_me',
};

const MOCK_USERS = [
  { email: 'user@store.com', password: 'password123', name: 'Alex' },
  { email: 'admin@store.com', password: 'admin123', name: 'Admin' },
];

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
    ]).start();

    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const [savedEmail, savedRemember] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER_EMAIL),
        AsyncStorage.getItem(STORAGE_KEYS.REMEMBER_ME),
      ]);
      if (savedRemember === 'true' && savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (e) {
      console.log('Failed to load credentials', e);
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const validate = () => {
    const newErrors: LoginErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) { triggerShake(); return; }

    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1200));

      const user = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        setErrors({ general: 'Invalid email or password' });
        triggerShake();
        setLoading(false);
        return;
      }

      const token = `token_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);

      if (rememberMe) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
        await AsyncStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
        await AsyncStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'false');
      }

      Alert.alert('Welcome back! 👋', `Hello, ${user.name}!`);

      navigation?.navigate('Home', { user });

    } catch (e) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={styles.blobTop} />
        <View style={styles.blobBottom} />

        <Animated.View
          style={[
            styles.container,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { translateX: shakeAnim }] },
          ]}
        >
          <Animated.View style={[styles.logoArea, { transform: [{ scale: logoScale }] }]}>

            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🛍️</Text>
            </View>
            <Text style={styles.brandName}>ShopWave</Text>
            <Text style={styles.brandTagline}>Your world, delivered.</Text>
          </Animated.View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign In</Text>
            <Text style={styles.cardSubtitle}>Access your account to continue shopping</Text>

            {errors.general && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>⚠ {errors.general}</Text>
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor="#555"
                  value={email}
                  onChangeText={(t: string) => { setEmail(t); setErrors((e: LoginErrors) => ({ ...e, email: null, general: null })); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>
              {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#555"
                  value={password}
                  onChangeText={(t: string) => { setPassword(t); setErrors((e: LoginErrors) => ({ ...e, password: null, general: null })); }}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity onPress={() => setShowPassword((v: boolean) => !v)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
            </View>

            <View style={styles.rowBetween}>
              <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe((v: boolean) => !v)}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Reset Password', 'Check your email for a reset link.')}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#0a0a0f" />
                : <Text style={styles.loginBtnText}>Sign In →</Text>
              }
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Google Sign-In', 'Integrate with your Google OAuth library.')}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialLabel}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} onPress={() => Alert.alert('Apple Sign-In', 'Integrate with Apple Authentication.')}>
                <Text style={styles.socialIcon}></Text>
                <Text style={styles.socialLabel}>Apple</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.signupRow}
              onPress={() => navigation?.navigate('Register')}
            >
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLink}>Create one</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const ACCENT = '#f0c060';
const BG = '#0a0a0f';
const CARD_BG = '#13131a';
const BORDER = '#2a2a3a';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40 },

  blobTop: {
    position: 'absolute', top: -80, right: -80,
    width: 250, height: 250, borderRadius: 125,
    backgroundColor: '#f0c06022',
  },
  blobBottom: {
    position: 'absolute', bottom: -60, left: -60,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: '#6060f022',
  },

  container: { paddingHorizontal: 24 },

  logoArea: { alignItems: 'center', marginBottom: 32 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 22,
    backgroundColor: ACCENT, alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
    shadowColor: ACCENT, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 16,
    elevation: 12,
  },
  logoEmoji: { fontSize: 36 },
  brandName: { fontSize: 30, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  brandTagline: { fontSize: 13, color: '#666', marginTop: 4, letterSpacing: 0.5 },

  card: {
    backgroundColor: CARD_BG,
    borderRadius: 24, padding: 28,
    borderWidth: 1, borderColor: BORDER,
    shadowColor: '#000', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.4, shadowRadius: 24,
    elevation: 10,
  },
  cardTitle: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#666', marginBottom: 24 },

  errorBanner: {
    backgroundColor: '#ff444422', borderWidth: 1, borderColor: '#ff4444',
    borderRadius: 10, padding: 12, marginBottom: 16,
  },
  errorBannerText: { color: '#ff6666', fontSize: 13 },

  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '600', color: '#888', marginBottom: 8, letterSpacing: 0.8, textTransform: 'uppercase' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1a24', borderRadius: 12,
    borderWidth: 1, borderColor: BORDER,
    paddingHorizontal: 14, height: 52,
  },
  inputError: { borderColor: '#ff4444' },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: { flex: 1, color: '#fff', fontSize: 15 },
  eyeIcon: { fontSize: 18, paddingLeft: 8 },
  fieldError: { color: '#ff6666', fontSize: 12, marginTop: 6 },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 20, height: 20, borderRadius: 6,
    borderWidth: 2, borderColor: BORDER,
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  checkboxActive: { backgroundColor: ACCENT, borderColor: ACCENT },
  checkmark: { color: '#000', fontSize: 12, fontWeight: '700' },
  rememberText: { color: '#aaa', fontSize: 13 },
  forgotText: { color: ACCENT, fontSize: 13, fontWeight: '600' },

  loginBtn: {
    backgroundColor: ACCENT, borderRadius: 14,
    height: 54, alignItems: 'center', justifyContent: 'center',
    shadowColor: ACCENT, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12,
    elevation: 8,
  },
  loginBtnDisabled: { opacity: 0.7 },
  loginBtnText: { color: '#0a0a0f', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },

  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: BORDER },
  dividerText: { color: '#555', fontSize: 12, marginHorizontal: 12 },

  socialRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  socialBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#1a1a24', borderRadius: 12,
    borderWidth: 1, borderColor: BORDER, height: 48, gap: 8,
  },
  socialIcon: { color: '#fff', fontSize: 18, fontWeight: '700' },
  socialLabel: { color: '#ccc', fontSize: 14, fontWeight: '600' },

  signupRow: { alignItems: 'center' },
  signupText: { color: '#666', fontSize: 13 },
  signupLink: { color: ACCENT, fontWeight: '700' },
});