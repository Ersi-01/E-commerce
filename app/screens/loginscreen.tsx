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
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Typography } from '@/app/styles/global';
import S from '@/app/styles/global';

type LoginErrors = {
  email?: string | null;
  password?: string | null;
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
    ]).start();

    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
  try {
    const saved = await AsyncStorage.getItem('@ecommerce_user');
    if (saved) {
      router.replace('/(tabs)' as any);
    }
  } catch (e) {
    console.log('Storage error', e);
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
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const saved = await AsyncStorage.getItem('@ecommerce_user');

      if (!saved) {
        setErrors({ email: 'No account found. Please register first.' });
        triggerShake();
        setLoading(false);
        return;
      }

      const user = JSON.parse(saved);

      if (user.email !== email) {
        setErrors({ email: 'Email does not match our records.' });
        triggerShake();
        setLoading(false);
        return;
      }

      router.replace('/(tabs)');
    } catch (e) {
      console.log('Login error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={S.screenNoPad}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={S.blobTop} />
        <View style={S.blobBottom} />

        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { translateX: shakeAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.brandName}>ShopApp</Text>
            <Text style={S.caption}>Sign in to continue</Text>
          </View>

          <View style={S.cardElevated}>

            <View style={styles.fieldGroup}>
              <Text style={S.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email ? S.inputError : null, { outlineStyle: 'none' } as any]}
                placeholder="you@example.com"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={t => { setEmail(t); setErrors(e => ({ ...e, email: null })); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              {errors.email && <Text style={S.fieldError}>{errors.email}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={S.label}>Password</Text>
              <View style={[S.inputWrapper, errors.password ? S.inputError : null]}>
                <TextInput
                  ref={passwordRef}
                  style={[S.inputText, { outlineStyle: 'none' } as any]}
                  placeholder="Min. 6 characters"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={t => { setPassword(t); setErrors(e => ({ ...e, password: null })); }}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(v => !v)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.showHideText}>{showPassword ? 'HIDE' : 'SHOW'}</Text>
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={S.fieldError}>{errors.password}</Text>}
            </View>

            <TouchableOpacity
              style={[S.btnPrimary, loading && S.btnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color={Colors.accentDark} />
                : <Text style={S.btnPrimaryText}>Sign In</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupRow}
              onPress={() => router.push('/register' as any)}
            >
              <Text style={S.caption}>
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

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: Spacing.xl * 2,
  },
  container: {
    paddingHorizontal: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xxxl,
  },
  brandName: {
    fontSize: Typography.h1,
    fontWeight: Typography.extrabold,
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginBottom: Spacing.xs,
  },
  fieldGroup: {
    marginBottom: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.input,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 52,
    color: Colors.textPrimary,
    fontSize: Typography.md,
  },
  showHideText: {
    color: Colors.accent,
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    letterSpacing: 0.8,
  },
  signupRow: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  signupLink: {
    color: Colors.accent,
    fontWeight: Typography.bold,
  },
});