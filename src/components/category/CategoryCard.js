import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Typography from '../../constants/Typography';
import Spacing from '../../constants/Spacing';

export default function CategoryCard({ category, onPress, isSelected }) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={category.icon} size={28} color={isSelected ? Colors.primary : Colors.textSecondary} style={styles.icon} />
      <Text style={[styles.name, isSelected && styles.selectedName]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: Spacing.sm,
    padding: Spacing.sm,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 80,
  },
  selectedContainer: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  icon: {
    fontSize: Typography.sizes.xl,
    marginBottom: Spacing.xs,
  },
  name: {
    fontSize: Typography.sizes.xs,
    color: Colors.text,
    fontWeight: Typography.weights.medium,
  },
  selectedName: {
    color: Colors.primary,
    fontWeight: Typography.weights.bold,
  },
});
