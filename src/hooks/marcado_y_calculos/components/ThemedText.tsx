import React from 'react';
import { Text } from 'react-native';
import { ThemedTextProps } from '../../types/habit';

export function ThemedText({ children, variant = 'body', className = '', ...props }: ThemedTextProps) {
  let variantStyles = 'text-gray-800 dark:text-gray-100 text-base';

  if (variant === 'title') variantStyles = 'text-2xl font-bold text-gray-900 dark:text-white';
  if (variant === 'subtitle') variantStyles = 'text-lg font-semibold text-gray-800 dark:text-gray-200';
  if (variant === 'caption') variantStyles = 'text-sm text-gray-500 dark:text-gray-400';

  return (
    <Text className={`${variantStyles} ${className}`} {...props}>
      {children}
    </Text>
  );
}