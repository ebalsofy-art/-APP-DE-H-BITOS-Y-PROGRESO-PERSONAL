import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HabitCardProps } from '../../../types/habit';
import { ThemedText } from './ThemedText';

export function HabitCard({ habit, currentDay, onToggle }: HabitCardProps) {
  const isCompleted = habit.completedDays[currentDay];

  return (
    <View className="flex-row items-center justify-between p-4 mb-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
      <View className="flex-row items-center flex-1 mr-3">
        <View className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 items-center justify-center mr-3">
          <Ionicons name={habit.icon as any} size={20} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <ThemedText variant="subtitle" className="text-base font-bold">
            {habit.title}
          </ThemedText>
          <ThemedText variant="caption" numberOfLines={1}>
            {habit.description}
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onToggle(habit.id, currentDay)}
        className={`w-9 h-9 rounded-xl items-center justify-center border ${
          isCompleted
            ? 'bg-blue-600 border-blue-600'
            : 'border-gray-300 dark:border-gray-600 bg-transparent'
        }`}
      >
        {isCompleted && <Ionicons name="checkmark" size={20} color="#ffffff" />}
      </TouchableOpacity>
    </View>
  );
}