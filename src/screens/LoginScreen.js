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

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    // Simulate network delay
    setTimeout(async () => {
      setLoading(false);
      // Hardcoded mock login check or anything just to let the user login
      // Because we are frontend only, we will just let them in
      const newUser = {
        ...MOCK_USER,
        email: identifier.includes('@') ? identifier : 'user@example.com',
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

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your ReCart account</Text>
          
          <AppInput 
            label="Email / Mobile Number"
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="test@example.com or +91..."
            keyboardType="email-address"
          />
          
          <AppInput 
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />
          
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <AppButton 
            title="Login" 
            onPress={handleLogin} 
            loading={loading}
            style={styles.loginBtn}
          />
          
          <View style={styles.registerContainer}>
            <Text style={styles.noAccount}>Don't have an account? </Text>
            <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
              Create Account
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
    marginBottom: Spacing.xxl,
  },
  forgotPassword: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    textAlign: 'right',
    marginTop: -Spacing.sm,
    marginBottom: Spacing.xl,
    fontWeight: Typography.weights.bold,
  },
  loginBtn: {
    marginBottom: Spacing.xl,
    borderRadius: 30,
    paddingVertical: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccount: {
    color: Colors.textSecondary,
  },
  registerLink: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  }
});
