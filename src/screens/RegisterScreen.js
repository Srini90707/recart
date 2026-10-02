import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { LocationContext } from '../context/LocationContext';
import { resetRoot } from '../navigation/navigationRef';
import ScreenContainer from '../components/common/ScreenContainer';
import Colors from '../constants/Colors';
import { MOCK_USER } from '../data/mockData';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const { currentLocation, requestLocation } = useContext(LocationContext) || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(currentLocation?.formatted || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleUseCurrentLocation = async () => {
    if (!requestLocation) return;
    try {
      setLocating(true);
      const loc = await requestLocation(true);
      if (loc?.formatted) {
        setLocation(loc.formatted);
      }
    } catch (_err) {
      // Ignored
    } finally {
      setLocating(false);
    }
  };

  const handleQuickFill = () => {
    setName('Rahul Sharma');
    setEmail('rahul.sharma@example.com');
    setPhone('9876543210');
    setLocation(currentLocation?.formatted || 'Bengaluru, Karnataka');
    setPassword('Pass@123');
    setConfirmPassword('Pass@123');
  };

  const handleSocialRegister = async (provider) => {
    setGoogleLoading(true);
    try {
      const socialUser = {
        ...MOCK_USER,
        name: provider === 'Google' ? 'Google User' : 'Apple User',
        email: provider === 'Google' ? 'google.user@recart.com' : 'apple.user@recart.com',
        location: location || currentLocation?.formatted || 'Bengaluru, Karnataka',
      };
      await login(socialUser);
      resetRoot('Main');
    } catch (err) {
      console.error('Social login error:', err);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      const newUser = {
        ...MOCK_USER,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        location: location.trim() || currentLocation?.formatted || 'Bengaluru, Karnataka',
      };
      await login(newUser);
      resetRoot('Main');
    } catch (err) {
      console.error('Register error:', err);
      Alert.alert('Registration Failed', 'Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isPasswordLongEnough = password.length >= 6;
  const passwordsMatch = Boolean(confirmPassword && password === confirmPassword);
  const passwordsMismatch = Boolean(confirmPassword && password !== confirmPassword);

  return (
    <ScreenContainer noPadding>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#F8FAFC' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top Header Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={20} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.headerLogoContainer}>
            <Image
              source={require('../../assets/images/app-logo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <Text style={styles.headerBrandText}>ReCart</Text>
          </View>

          <TouchableOpacity
            style={styles.demoFillBtn}
            onPress={handleQuickFill}
            activeOpacity={0.75}
          >
            <Ionicons name="flash" size={12} color={Colors.primary} />
            <Text style={styles.demoFillText}>Demo</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Title */}
          <View style={styles.headerTitleArea}>
            <Text style={styles.screenTitle}>Create Account</Text>
            <Text style={styles.screenSubtitle}>Join ReCart to buy, sell and rent pre-loved items</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Full Name <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'name' && styles.inputBoxFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={focusedField === 'name' ? Colors.primary : '#64748B'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Rahul Sharma"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="words"
                />
                {name.trim().length > 2 && (
                  <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                )}
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email Address <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'email' && styles.inputBoxFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={focusedField === 'email' ? Colors.primary : '#64748B'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="name@example.com"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {email.includes('@') && email.includes('.') && (
                  <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                )}
              </View>
            </View>

            {/* Phone Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Mobile Number <Text style={styles.requiredStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'phone' && styles.inputBoxFocused,
                ]}
              >
                <View style={styles.phonePrefixBox}>
                  <Text style={styles.phonePrefixFlag}>🇮🇳</Text>
                  <Text style={styles.prefixText}>+91</Text>
                  <View style={styles.phoneDivider} />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="98765 43210"
                  placeholderTextColor="#94A3B8"
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                {phone.replace(/\D/g, '').length === 10 && (
                  <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                )}
              </View>
            </View>

            {/* City / Location with Auto Detect */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  City / Location <Text style={styles.requiredStar}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.detectBtn}
                  onPress={handleUseCurrentLocation}
                  activeOpacity={0.7}
                  disabled={locating}
                >
                  {locating ? (
                    <ActivityIndicator size="small" color={Colors.primary} style={{ marginRight: 4 }} />
                  ) : (
                    <Ionicons name="navigate" size={12} color={Colors.primary} style={{ marginRight: 3 }} />
                  )}
                  <Text style={styles.detectBtnText}>
                    {locating ? 'Detecting...' : 'Auto Detect'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'location' && styles.inputBoxFocused,
                ]}
              >
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={focusedField === 'location' ? Colors.primary : '#64748B'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  placeholderTextColor="#94A3B8"
                  value={location}
                  onChangeText={setLocation}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Password <Text style={styles.requiredStar}>*</Text>
                </Text>
                {isPasswordLongEnough && (
                  <View style={styles.badgeSuccess}>
                    <Ionicons name="shield-checkmark" size={11} color="#16A34A" style={{ marginRight: 2 }} />
                    <Text style={styles.badgeSuccessText}>Strong</Text>
                  </View>
                )}
              </View>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'password' && styles.inputBoxFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={focusedField === 'password' ? Colors.primary : '#64748B'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Minimum 6 characters"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={19}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Confirm Password <Text style={styles.requiredStar}>*</Text>
                </Text>
                {passwordsMatch && (
                  <View style={styles.badgeSuccess}>
                    <Ionicons name="checkmark-circle" size={11} color="#16A34A" style={{ marginRight: 2 }} />
                    <Text style={styles.badgeSuccessText}>Match</Text>
                  </View>
                )}
                {passwordsMismatch && (
                  <View style={styles.badgeError}>
                    <Ionicons name="alert-circle" size={11} color="#DC2626" style={{ marginRight: 2 }} />
                    <Text style={styles.badgeErrorText}>Mismatch</Text>
                  </View>
                )}
              </View>
              <View
                style={[
                  styles.inputBox,
                  focusedField === 'confirm' && styles.inputBoxFocused,
                  passwordsMatch && styles.inputBoxMatch,
                  passwordsMismatch && styles.inputBoxError,
                ]}
              >
                <Ionicons
                  name="shield-outline"
                  size={18}
                  color={focusedField === 'confirm' ? Colors.primary : '#64748B'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Re-enter password"
                  placeholderTextColor="#94A3B8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField('confirm')}
                  onBlur={() => setFocusedField(null)}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={19}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms of Service Notice */}
            <Text style={styles.termsText}>
              {"By signing up, you agree to ReCart's "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>

            {/* Create Account Submit Button */}
            <TouchableOpacity
              style={styles.registerBtn}
              onPress={handleRegister}
              activeOpacity={0.85}
              disabled={loading || googleLoading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <View style={styles.btnInner}>
                  <Text style={styles.registerBtnText}>Create Account</Text>
                  <Ionicons name="arrow-forward" size={17} color="#FFFFFF" style={{ marginLeft: 6 }} />
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.bottomDividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue with Google Button */}
          <TouchableOpacity
            style={styles.googleContinueBtn}
            activeOpacity={0.85}
            onPress={() => handleSocialRegister('Google')}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#EA4335" size="small" />
            ) : (
              <View style={styles.googleBtnInner}>
                <Ionicons name="logo-google" size={20} color="#EA4335" style={{ marginRight: 10 }} />
                <Text style={styles.googleContinueText}>Continue with Google</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.haveAccount}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 26,
    height: 26,
    borderRadius: 7,
    marginRight: 6,
  },
  headerBrandText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFE3D3',
    gap: 3,
  },
  demoFillText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerTitleArea: {
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 13,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 5,
  },
  requiredStar: {
    color: Colors.primary,
    fontWeight: '700',
  },
  detectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE3D3',
  },
  detectBtnText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: Colors.primary,
  },
  badgeSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeSuccessText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#16A34A',
  },
  badgeError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeErrorText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DC2626',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    height: 48,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
  },
  inputBoxFocused: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  inputBoxMatch: {
    borderColor: '#86EFAC',
  },
  inputBoxError: {
    borderColor: '#FCA5A5',
  },
  inputIcon: {
    marginRight: 9,
  },
  phonePrefixBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 6,
  },
  phonePrefixFlag: {
    fontSize: 13,
    marginRight: 3,
  },
  prefixText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  phoneDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#CBD5E1',
    marginLeft: 6,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  eyeBtn: {
    padding: 6,
  },
  termsText: {
    fontSize: 11.5,
    lineHeight: 17,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 16,
    fontWeight: '500',
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '700',
  },
  registerBtn: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  bottomDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    paddingHorizontal: 12,
  },
  googleContinueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginTop: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  googleBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleContinueText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  haveAccount: {
    fontSize: 13.5,
    color: '#64748B',
    fontWeight: '500',
  },
  loginLink: {
    fontSize: 13.5,
    fontWeight: '800',
    color: Colors.primary,
  },
});
