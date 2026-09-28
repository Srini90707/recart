import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { styles } from './SearchBar.styles';

export default function SearchBar({ value, onChangeText, placeholder = 'Search for laptops, cars, phones...' }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
      />
    </View>
  );
}
