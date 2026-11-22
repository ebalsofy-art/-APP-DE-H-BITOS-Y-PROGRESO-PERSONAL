import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '../../../../hooks/marcado_y_calculos/components/ThemedView';
import { ThemedText } from '../../../../hooks/marcado_y_calculos/components/ThemedText';
import { ProgressCard } from '../../../../hooks/marcado_y_calculos/components/ProgressCard';
import { HabitCard } from '../../../../hooks/marcado_y_calculos/components/HabitCard';
import { useHabits } from '../../../../hooks/useHabits';

export default function HomeScreen() {
  const { habits, selectedDay, setSelectedDay, toggleHabitDay, stats } = useHabits();

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 px-5 pt-6">
        <ThemedText variant="title" className="mb-1">
          Reto 21 Días
        </ThemedText>
        <ThemedText variant="caption" className="mb-5">
          Construye tu mejor versión día a día
        </ThemedText>

        {/* Selector horizontal de días (Día 1 al 21) */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {Array.from({ length: 21 }, (_, index) => {
            const isSelected = selectedDay === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDay(index)}
                className={`mr-2 px-4 py-2 rounded-xl border ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <ThemedText
                  className={`font-semibold ${
                    isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Día {index + 1}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tarjeta de progreso del día */}
          <ProgressCard
          title={`Progreso del Día ${selectedDay + 1}`}
          percentage={stats.dayPercentage}
          completedCount={stats.dayCompletedCount}
          totalCount={stats.dayTotalCount}
        />

        {/* Lista de hábitos del día */}
        <ThemedText variant="subtitle" className="mt-2 mb-3">
          Hábitos de Hoy
        </ThemedText>

        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            currentDay={selectedDay}
            onToggle={toggleHabitDay}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}