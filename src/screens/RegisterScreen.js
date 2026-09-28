import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import ScreenContainer from '../components/common/ScreenContainer';
import AppInput from '../components/common/AppInput';
import AppButton from '../components/common/AppButton';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';
import { MOCK_USER } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    // Simulate network delay
    setTimeout(async () => {
      setLoading(false);
      // Create a mock user
      const newUser = {
        ...MOCK_USER,
        name,
        email,
        phone,
        location,
      };
      await login(newUser);
    }, 1000);
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Join ReCart and start buying & selling</Text>
          
          <AppButton 
            title="Continue with Google" 
            variant="outline" 
            style={styles.socialBtn}
          />
          <AppButton 
            title="Continue with Apple" 
            variant="outline" 
            style={styles.socialBtn}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <AppInput 
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
          />

          <AppInput 
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="test@example.com"
            keyboardType="email-address"
          />

          <AppInput 
            label="Mobile Number"
            value={phone}
            onChangeText={setPhone}
            placeholder="+91 98765 43210"
            keyboardType="phone-pad"
          />
          
          <AppInput 
            label="Location"
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Bengaluru, Karnataka"
          />
          
          <AppInput 
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          <AppInput 
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
            secureTextEntry
          />
          
          <AppButton 
            title="Create Account" 
            onPress={handleRegister} 
            loading={loading}
            style={styles.registerBtn}
          />
          
          <View style={styles.loginContainer}>
            <Text style={styles.haveAccount}>Already have an account? </Text>
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  backButton: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  socialBtn: {
    marginBottom: Spacing.md,
    borderRadius: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.textSecondary,
    fontSize: Typography.sizes.sm,
  },
  registerBtn: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    borderRadius: 30,
    paddingVertical: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: Spacing.xxxl,
  },
  haveAccount: {
    color: Colors.textSecondary,
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  }
});
