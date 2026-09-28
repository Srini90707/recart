import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/common/ScreenContainer';
import AppHeader from '../components/header/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function EditProfileScreen() {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <AppHeader 
        title="Edit Profile" 
        leftIcon={<Ionicons name="arrow-back" size={24} color={Colors.text} />} 
        onLeftPress={() => navigation.goBack()} 
      />
      <View style={styles.center}>
        <Text>Edit Profile Screen (Coming Soon)</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
