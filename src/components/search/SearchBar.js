import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { styles } from './SearchBar.styles';

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = 'Search cars, phones, laptops...',
  onFilterPress,
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.searchIconWrap}>
        <Ionicons name="search" size={17} color={Colors.primary} />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        returnKeyType="search"
        autoCorrect={false}
        multiline={false}
        numberOfLines={1}
      />
      {value ? (
        <TouchableOpacity 
          style={styles.clearBtn} 
          onPress={() => onChangeText('')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close-circle" size={18} color="#94A3B8" />
        </TouchableOpacity>
      ) : null}
      {onFilterPress ? (
        <TouchableOpacity 
          style={styles.filterBtn}
          onPress={onFilterPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.75}
          accessibilityLabel="Filter options"
        >
          <Ionicons name="options-outline" size={17} color="#0F172A" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

