import React from 'react';
import { View } from 'react-native';
import { ProgressCardProps } from '../../../types/habit';
import { ThemedText } from './ThemedText';

export function ProgressCard({ title, percentage, completedCount, totalCount, subtitle }: ProgressCardProps) {
  return (
    <View className="p-5 mb-4 bg-blue-50 dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700">
      <View className="flex-row justify-between items-center mb-2">
        <ThemedText variant="subtitle" className="font-bold">{title}</ThemedText>
        <ThemedText variant="title" className="text-blue-600 dark:text-blue-400 font-bold">
          {percentage}%
        </ThemedText>
      </View>

      {/* Barra de progreso visual */}
      <View className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden my-2">
        <View 
          className="h-full bg-blue-600 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </View>

      <ThemedText variant="caption">
        {subtitle || `Completados ${completedCount} de ${totalCount} hábitos`}
      </ThemedText>
    </View>
  );
}