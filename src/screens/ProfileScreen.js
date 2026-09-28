import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import AppButton from '../components/common/AppButton';
import { AuthContext } from '../context/AuthContext';
import Spacing from '../constants/Spacing';
import Typography from '../constants/Typography';
import Colors from '../constants/Colors';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <ScreenContainer noPadding>
      <AppHeader title="Profile" rightIcon={<Ionicons name="settings-outline" size={24} color={Colors.text} />} />
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{user.listingsCount || 0}</Text>
              <Text style={styles.statLabel}>Listings</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}><Ionicons name="star" size={16} color={Colors.warning} /> {user.rating || 5.0}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.menu}>
          <AppButton title="My Listings" variant="secondary" style={styles.menuItem} />
          <AppButton title="Messages" variant="secondary" style={styles.menuItem} />
          <AppButton title="Payment Methods" variant="secondary" style={styles.menuItem} />
          <AppButton title="Settings" variant="secondary" style={styles.menuItem} />
          <AppButton title="Logout" variant="danger" onPress={logout} style={styles.menuItem} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.md,
  },
  name: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  email: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  stats: {
    flexDirection: 'row',
    marginTop: Spacing.md,
  },
  statBox: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  statValue: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  menu: {
    padding: Spacing.lg,
  },
  menuItem: {
    marginBottom: Spacing.md,
  },
});
