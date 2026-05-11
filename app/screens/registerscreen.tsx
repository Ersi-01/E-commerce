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
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Typography } from '@/app/styles/global';
import S from '@/app/styles/global';
import storage from '@/app/utils/storage';

type RegisterErrors = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 60, friction: 10, useNativeDriver: true }),
    ]).start();
  }, []);

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
    const newErrors: RegisterErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
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
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const userData = { name, email, password }
      await storage.set('@ecommerce_session', JSON.stringify(userData))
      await storage.set('@ecommerce_session', JSON.stringify(userData))
      await new Promise(res => setTimeout(res, 1500));

      router.replace('/(tabs)');
    } catch (e) {
      console.log('Register error', e);
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
            <Text style={styles.brandName}>ShopWave</Text>
            <Text style={S.caption}>Create your account</Text>
          </View>

          <View style={S.cardElevated}>

            <View style={styles.fieldGroup}>
              <Text style={S.label}>Full Name</Text>
              <TextInput
                style={[styles.input, errors.name ? S.inputError : null, { outlineStyle: 'none' } as any]}
                placeholder="John Doe"
                placeholderTextColor={Colors.textMuted}
                value={name}
                onChangeText={t => { setName(t); setErrors(e => ({ ...e, name: null })); }}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              {errors.name && <Text style={S.fieldError}>{errors.name}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={S.label}>Email</Text>
              <TextInput
                ref={emailRef}
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
                  returnKeyType="next"
                  onSubmitEditing={() => confirmRef.current?.focus()}
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

            <View style={styles.fieldGroup}>
              <Text style={S.label}>Confirm Password</Text>
              <View style={[S.inputWrapper, errors.confirmPassword ? S.inputError : null]}>
                <TextInput
                  ref={confirmRef}
                  style={[S.inputText, { outlineStyle: 'none' } as any]}
                  placeholder="Repeat your password"
                  placeholderTextColor={Colors.textMuted}
                  value={confirmPassword}
                  onChangeText={t => { setConfirmPassword(t); setErrors(e => ({ ...e, confirmPassword: null })); }}
                  secureTextEntry={!showConfirm}
                  returnKeyType="done"
                  onSubmitEditing={handleRegister}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm(v => !v)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.showHideText}>{showConfirm ? 'HIDE' : 'SHOW'}</Text>
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={S.fieldError}>{errors.confirmPassword}</Text>}
            </View>

            <TouchableOpacity
              style={[S.btnPrimary, loading && S.btnDisabled]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color={Colors.accentDark} />
                : <Text style={S.btnPrimaryText}>Create Account</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginRow}
              onPress={() => router.push('/login' as any)}
            >
              <Text style={S.caption}>
                Already have an account?{' '}
                <Text style={styles.loginLink}>Sign in</Text>
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
  loginRow: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  loginLink: {
    color: Colors.accent,
    fontWeight: Typography.bold,
  },
});