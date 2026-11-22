import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '../../../../components/ThemedView';
import { ThemedText } from '../../../../components/ThemedText';
import { useHabits } from '../../../../hooks/useHabits';

export default function HabitsScreen() {
  const { habits, toggleHabitDay } = useHabits();

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 px-5 pt-6">
        <ThemedText variant="title" className="mb-1">
          Mis Hábitos
        </ThemedText>
        <ThemedText variant="caption" className="mb-5">
          Toca cualquier día (1-21) para marcar tu avance
        </ThemedText>

        {habits.map((habit) => {
          const completedCount = habit.completedDays.filter(Boolean).length;

          return (
            <View
              key={habit.id}
              className="p-4 mb-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center flex-1">
                  <View className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 items-center justify-center mr-3">
                    <Ionicons name={habit.icon as any} size={18} color="#3b82f6" />
                  </View>
                  <View className="flex-1">
                    <ThemedText variant="subtitle" className="font-bold">
                      {habit.title}
                    </ThemedText>
                    <ThemedText variant="caption">{habit.description}</ThemedText>
                  </View>
                </View>
                <ThemedText className="text-blue-600 dark:text-blue-400 font-bold ml-2">
                  {completedCount}/21
                </ThemedText>
              </View>

              {/* Cuadrícula de 21 días */}
              <View className="flex-row flex-wrap gap-1.5 mt-2">
                {habit.completedDays.map((done, dayIndex) => (
                  <TouchableOpacity
                    key={dayIndex}
                    onPress={() => toggleHabitDay(habit.id, dayIndex)}
                    className={`w-8 h-8 rounded-lg items-center justify-center border ${
                      done
                        ? 'bg-blue-600 border-blue-600'
                        : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <ThemedText
                      className={`text-xs font-semibold ${
                        done ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {dayIndex + 1}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}