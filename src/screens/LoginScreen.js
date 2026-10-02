import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { LocationContext } from '../context/LocationContext';
import { resetRoot, navigationRef } from '../navigation/navigationRef';
import ScreenContainer from '../components/common/ScreenContainer';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import { MOCK_USER } from '../data/mockData';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const { requestLocation } = useContext(LocationContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const passwordInputRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const performLogin = async (id, pwd) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const emailToUse = id && id.includes('@') ? id : (id ? `${id}@recart.com` : 'demo@recart.com');
      const newUser = {
        ...MOCK_USER,
        email: emailToUse,
        name: id ? (id.includes('@') ? id.split('@')[0] : id) : 'Demo User',
      };
      await login(newUser);

      // Trigger location refresh in background without delaying navigation
      if (requestLocation) {
        requestLocation(false).catch(() => {});
      }

      // Immediately redirect to main dashboard
      if (navigationRef.isReady()) {
        resetRoot('Main');
      } else {
        const parent = navigation.getParent();
        if (parent) {
          parent.navigate('Main');
        } else {
          navigation.navigate('Main');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      if (isMountedRef.current) {
        setErrorMessage('Failed to sign in. Please try again.');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handleLogin = () => {
    setErrorMessage('');
    const cleanId = identifier.trim();
    if (!cleanId) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }

    const isEmail = cleanId.includes('@');
    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanId)) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
    } else {
      const cleanPhone = cleanId.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        setErrorMessage('Please enter a valid 10-digit mobile number or email.');
        return;
      }
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    performLogin(cleanId, password);
  };

  const handleQuickDemo = () => {
    setIdentifier('demo@recart.com');
    setPassword('123456');
    performLogin('demo@recart.com', '123456');
  };

  return (
    <ScreenContainer noPadding>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Bar with Back Button */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              activeOpacity={0.7}
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>

          {/* Logo & Welcome Header */}
          <View style={styles.brandHeader}>
            <View style={styles.logoBadge}>
              <Image
                source={require('../../assets/images/app-logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to manage your listings, favorites & chats
            </Text>
          </View>

          {/* Error Banner if validation fails */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color="#EF4444" style={{ marginRight: 6 }} />
              <Text style={styles.errorBannerText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Inputs Section */}
          <View style={styles.formContainer}>
            {/* Email / Mobile */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email or Mobile Number</Text>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'identifier' && styles.inputBoxFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={19}
                  color={focusedField === 'identifier' ? Colors.primary : '#94A3B8'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  value={identifier}
                  onChangeText={(text) => {
                    setIdentifier(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onFocus={() => setFocusedField('identifier')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email or phone"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="username"
                  textContentType="username"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  blurOnSubmit={false}
                  accessibilityLabel="Email or phone number"
                />
                {identifier.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setIdentifier('')}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    style={styles.clearBtn}
                    accessibilityLabel="Clear email field"
                  >
                    <Ionicons name="close-circle" size={16} color="#CBD5E1" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'password' && styles.inputBoxFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={19}
                  color={focusedField === 'password' ? Colors.primary : '#94A3B8'}
                  style={styles.inputIcon}
                />
                <TextInput
                  ref={passwordInputRef}
                  style={styles.textInput}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  accessibilityLabel="Password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={19}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password Row */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberMeRow}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                  {rememberMe && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Primary Login Button */}
            <TouchableOpacity
              style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
              accessibilityLabel="Sign in button"
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.loginBtnText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Don't have an account? Sign Up directly below Sign In button */}
            <View style={styles.signupRow}>
              <Text style={styles.signupPromptText}>{"Don't have an account? "}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
                <Text style={styles.signupLinkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Sign-in Section at Bottom */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => performLogin('google.user@recart.com', 'google123')}
              activeOpacity={0.8}
            >
              <Ionicons name="logo-google" size={18} color="#EA4335" style={{ marginRight: 8 }} />
              <Text style={styles.socialBtnText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => performLogin('apple.user@recart.com', 'apple123')}
              activeOpacity={0.8}
            >
              <Ionicons name="logo-apple" size={19} color="#000000" style={{ marginRight: 8 }} />
              <Text style={styles.socialBtnText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Discreet Demo Autofill Link */}
          <TouchableOpacity
            style={styles.demoLinkBtn}
            onPress={handleQuickDemo}
            activeOpacity={0.7}
          >
            <Ionicons name="flash" size={12} color={Colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.demoLinkText}>Demo account autofill</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: 16,
    paddingBottom: 36,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    marginBottom: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#FFF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FFE3D3',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  logoImage: {
    width: 42,
    height: 42,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 290,
    lineHeight: 18,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorBannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B91C1C',
    flex: 1,
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 52,
  },
  inputBoxFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  clearBtn: {
    padding: 4,
    marginRight: 2,
  },
  eyeBtn: {
    padding: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 2,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rememberMeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  forgotBtn: {
    paddingVertical: 2,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnDisabled: {
    opacity: 0.7,
  },
  loginBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  demoLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 4,
  },
  demoLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  dividerText: {
    fontSize: 11,
    color: '#94A3B8',
    marginHorizontal: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signupPromptText: {
    fontSize: 13,
    color: '#64748B',
  },
  signupLinkText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
});
