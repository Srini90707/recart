import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Spacing from '../../constants/Spacing';

export default function AppHeader({ title, leftIcon, onLeftPress, rightIcon, onRightPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {leftIcon ? (
          <TouchableOpacity 
            onPress={onLeftPress} 
            style={styles.iconButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
          >
            {leftIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity 
            onPress={onRightPress} 
            style={styles.iconButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: Spacing.md,
  },
  titleContainer: {
    flex: 3,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: Spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});
