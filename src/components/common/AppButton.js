import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { styles } from './AppButton.styles';

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}) {
  const getBackgroundColor = () => {
    if (disabled) return Colors.border;
    if (variant === 'secondary') return Colors.transparent;
    if (variant === 'danger') return Colors.error;
    if (variant === 'outline') return Colors.transparent;
    return Colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return Colors.textSecondary;
    if (variant === 'secondary') return Colors.text;
    if (variant === 'outline') return Colors.primary;
    return Colors.card;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        (variant === 'secondary' || variant === 'outline') && styles.secondaryBorder,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
