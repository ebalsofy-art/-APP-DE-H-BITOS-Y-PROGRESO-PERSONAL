import React from 'react';
import { View } from 'react-native';
import { ThemedViewProps } from '../../types/habit';

export function ThemedView({ children, className = '', ...props }: ThemedViewProps) {
  return (
    <View
      className={`bg-white dark:bg-gray-900 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}