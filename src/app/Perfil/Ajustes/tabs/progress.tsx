import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '../../../../hooks/marcado_y_calculos/components/ThemedView';
import { ThemedText } from '../../../../hooks/marcado_y_calculos/components/ThemedText';
import { ProgressCard } from '../../../../hooks/marcado_y_calculos/components/ProgressCard';
import { useHabits } from '../../../../hooks/useHabits';

export default function ProgressScreen() {
  const { habits, selectedDay, stats } = useHabits();

  const totalCompletedAllDays = habits.reduce(
    (acc, h) => acc + h.completedDays.filter(Boolean).length,
    0
  );

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 px-5 pt-6">
        <ThemedText variant="title" className="mb-1">
          Tu Progreso
        </ThemedText>
        <ThemedText variant="caption" className="mb-5">
          Estadísticas de cumplimiento del reto
        </ThemedText>

        {/* Progreso Global del Reto */}
        <ProgressCard
          title="Avance Global (21 Días)"
          percentage={stats.overallPercentage}
          completedCount={totalCompletedAllDays}
          totalCount={habits.length * 21}
          subtitle={`Has completado ${totalCompletedAllDays} de ${habits.length * 21} metas totales`}
        />

        {/* Progreso del Día Seleccionado */}
        <ProgressCard
          title={`Resumen del Día ${selectedDay + 1}`}
          percentage={stats.dailyPercentage}
          completedCount={stats.completedToday}
          totalCount={stats.totalHabits}
        />

        {/* Desglose individual por hábito */}
        <ThemedText variant="subtitle" className="mt-3 mb-3">
          Rendimiento por Hábito
        </ThemedText>

        {habits.map((habit) => {
          const daysDone = habit.completedDays.filter(Boolean).length;
          const habitPercent = Math.round((daysDone / 21) * 100);

          return (
            <ProgressCard
              key={habit.id}
              title={habit.title}
              percentage={habitPercent}
              completedCount={daysDone}
              totalCount={21}
              subtitle={`${daysDone} de 21 días completados`}
            />
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}