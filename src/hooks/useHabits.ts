import { useState, useMemo } from 'react';
import { Habit, ProgressStats } from '../types/habit';
import { INITIAL_HABITS } from '../data/initialHabits';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  // Día activo seleccionado en el reto (0 = Día 1, hasta 20 = Día 21)
  const [selectedDay, setSelectedDay] = useState<number>(0);

  // Marcar o desmarcar un hábito en un día específico del reto
  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const updatedDays = [...habit.completedDays];
        updatedDays[dayIndex] = !updatedDays[dayIndex];

        return {
          ...habit,
          completedDays: updatedDays,
        };
      })
    );
  };

  // Cálculo automático del porcentaje de progreso diario y global
  const stats: ProgressStats = useMemo(() => {
    const totalHabits = habits.length;
    const completedToday = habits.filter(
      (h) => h.completedDays[selectedDay]
    ).length;

    const dailyPercentage =
      totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

    const totalPossibleChecks = totalHabits * 21;
    const totalCompletedChecks = habits.reduce(
      (acc, h) => acc + h.completedDays.filter(Boolean).length,
      0
    );

    const overallPercentage =
      totalPossibleChecks > 0
        ? Math.round((totalCompletedChecks / totalPossibleChecks) * 100)
        : 0;

    return {
      completedToday,
      totalHabits,
      dailyPercentage,
      overallPercentage,
    };
  }, [habits, selectedDay]);

  return {
    habits,
    selectedDay,
    setSelectedDay,
    toggleHabitDay,
    stats,
  };
}