import { useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types/habit';
import { INITIAL_HABITS } from '../data/initialHabits';

const STORAGE_KEY_HABITS = '@reto21_habits_v1';
const STORAGE_KEY_WATER = '@reto21_water_liters_v1';

export const WATER_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3];
export const DAILY_WATER_GOAL = 2;

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [waterLitersByDay, setWaterLitersByDay] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [savedHabits, savedWater] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY_HABITS),
          AsyncStorage.getItem(STORAGE_KEY_WATER),
        ]);
        if (savedHabits) setHabits(JSON.parse(savedHabits));
        if (savedWater) setWaterLitersByDay(JSON.parse(savedWater));
      } catch (e) {
        console.warn('Error cargando datos:', e);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY_HABITS, JSON.stringify(habits)).catch(() => {});
  }, [habits, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem(STORAGE_KEY_WATER, JSON.stringify(waterLitersByDay)).catch(() => {});
  }, [waterLitersByDay, isLoaded]);

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const updatedDays = [...habit.completedDays];
        updatedDays[dayIndex] = !updatedDays[dayIndex];
        return { ...habit, completedDays: updatedDays };
      })
    );
  };

  const setWaterLitersForDay = (liters: number, dayIndex: number = selectedDay) => {
    setWaterLitersByDay((prev) => {
      const nextValue = prev[dayIndex] === liters ? 0 : liters;
      const updated = { ...prev, [dayIndex]: nextValue };

      setHabits((prevHabits) =>
        prevHabits.map((habit) => {
          const isWater =
            habit.id.toLowerCase().includes('water') ||
            habit.id.toLowerCase().includes('agua') ||
            habit.title.toLowerCase().includes('agua');
          if (!isWater) return habit;
          const updatedDays = [...habit.completedDays];
          updatedDays[dayIndex] = nextValue >= DAILY_WATER_GOAL;
          return { ...habit, completedDays: updatedDays };
        })
      );

      return updated;
    });
  };

  const stats = useMemo(() => {
    const totalDays = 21;
    const totalGoals = habits.length * totalDays;
    let totalCompleted = 0;

    habits.forEach((h) => {
      totalCompleted += h.completedDays.filter(Boolean).length;
    });

    const dayCompletedCount = habits.filter((h) => Boolean(h.completedDays[selectedDay])).length;
    const dayPercentage =
      habits.length > 0 ? Math.round((dayCompletedCount / habits.length) * 100) : 0;
    const globalPercentage = totalGoals > 0 ? Math.round((totalCompleted / totalGoals) * 100) : 0;

    return {
      totalCompleted,
      totalGoals,
      globalPercentage,
      overallPercentage: globalPercentage,
      dayCompletedCount,
      completedToday: dayCompletedCount,
      dayTotalCount: habits.length,
      totalHabits: habits.length,
      dayPercentage,
      dailyPercentage: dayPercentage,
    };
  }, [habits, selectedDay]);

  return {
    habits,
    selectedDay,
    setSelectedDay,
    toggleHabitDay,
    waterLitersByDay,
    selectedDayWaterLiters: waterLitersByDay[selectedDay] ?? 0,
    setWaterLitersForDay,
    stats,
  };
}