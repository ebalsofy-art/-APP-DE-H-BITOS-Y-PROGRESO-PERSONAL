import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItemProps } from '../../types/habit';
import { ThemedText } from './ThemedText';

export function MenuItem({ title, subtitle, iconName, onPress, rightElement }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between p-4 mb-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"
    >
      <View className="flex-row items-center flex-1 mr-3">
        <View className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 items-center justify-center mr-3">
          <Ionicons name={iconName as any} size={20} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <ThemedText variant="subtitle" className="text-base font-semibold">
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText variant="caption" numberOfLines={1}>
              {subtitle}
            </ThemedText>
          )}
        </View>
      </View>

      {rightElement || <Ionicons name="chevron-forward" size={18} color="#9ca3af" />}
    </TouchableOpacity>
  );
}