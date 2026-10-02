import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

export default function ScreenContainer({
  children,
  style,
  noPadding = false,
  edges = ['top', 'left', 'right'],
}) {
  return (
    <SafeAreaView edges={edges} style={styles.safeArea}>
      <View style={[styles.container, !noPadding && styles.padding, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
  },
});
