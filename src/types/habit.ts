import React from 'react';
import { ViewProps, TextProps } from 'react-native';

export interface Habit {
  id: string;
  title: string;
  description: string;
  category: 'estudio' | 'lectura' | 'salud' | 'bienestar';
  icon: string;
  completedDays: boolean[];
}

export interface ProgressStats {
  completedToday: number;
  totalHabits: number;
  dailyPercentage: number;
  overallPercentage: number;
}

export interface ThemedViewProps extends ViewProps {
  className?: string;
}

export interface ThemedTextProps extends TextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  className?: string;
}

export interface HabitCardProps {
  habit: Habit;
  currentDay: number;
  onToggle: (habitId: string, dayIndex: number) => void;
}

export interface ProgressCardProps {
  title: string;
  percentage: number;
  completedCount: number;
  totalCount: number;
  subtitle?: string;
}

export interface MenuItemProps {
  title: string;
  subtitle?: string;
  iconName: string;
  onPress: () => void;
  rightElement?: React.ReactNode;
}