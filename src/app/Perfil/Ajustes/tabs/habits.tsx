import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '../../../../hooks/marcado_y_calculos/components/ThemedView';
import { ThemedText } from '../../../../hooks/marcado_y_calculos/components/ThemedText';
import {
  useHabits,
  WATER_OPTIONS,
  DAILY_WATER_GOAL,
} from '../../../../hooks/useHabits';

export default function HabitsScreen() {
  const {
    habits,
    selectedDay,
    toggleHabitDay,
    selectedDayWaterLiters,
    setWaterLitersForDay,
  } = useHabits();

  const goalReached = selectedDayWaterLiters >= DAILY_WATER_GOAL;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} className="flex-1">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText variant="title" style={styles.title} className="mb-1">
            Hábitos
          </ThemedText>
          <ThemedText variant="caption" style={styles.subtitle} className="mb-4">
            Marca tus hábitos del Día {selectedDay + 1} y registra tu hidratación
          </ThemedText>

          {/* Selector de litros de agua del día */}
          <View style={styles.waterCard}>
            <View style={styles.waterHeader}>
              <View style={styles.waterBadge}>
                <Ionicons name="water" size={20} color="#E07A3F" />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText variant="subtitle" style={styles.cardTitle}>
                  Agua al día · Día {selectedDay + 1}
                </ThemedText>
                <ThemedText variant="caption" style={styles.cardCaption}>
                  {selectedDayWaterLiters > 0
                    ? `Seleccionado: ${selectedDayWaterLiters} L ${
                        goalReached ? '(Meta cumplida)' : `(Meta: ${DAILY_WATER_GOAL} L)`
                      }`
                    : `Elige cuántos litros tomaste hoy (Meta: ${DAILY_WATER_GOAL} L)`}
                </ThemedText>
              </View>
            </View>

            <View style={styles.waterChips}>
              {WATER_OPTIONS.map((liters) => {
                const active = selectedDayWaterLiters === liters;
                return (
                  <TouchableOpacity
                    key={liters}
                    activeOpacity={0.8}
                    onPress={() => setWaterLitersForDay(liters, selectedDay)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <ThemedText style={[styles.chipText, active && styles.chipTextActive]}>
                      {liters} L
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Lista seleccionable de hábitos con mini barra de progreso */}
          {habits.map((habit) => {
            const isDone = Boolean(habit.completedDays[selectedDay]);
            const completedTotal = habit.completedDays.filter(Boolean).length;
            const habitProgress = Math.round((completedTotal / 21) * 100);

            return (
              <TouchableOpacity
                key={habit.id}
                activeOpacity={0.8}
                onPress={() => toggleHabitDay(habit.id, selectedDay)}
                style={[styles.habitCard, isDone && styles.habitCardDone]}
              >
                <View style={[styles.iconBox, isDone && styles.iconBoxDone]}>
                  <Ionicons
                    name={(habit.icon as any) || 'checkmark-circle'}
                    size={20}
                    color={isDone ? '#FFFFFF' : '#E07A3F'}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={styles.rowBetween}>
                    <ThemedText variant="subtitle" style={styles.cardTitle}>
                      {habit.title}
                    </ThemedText>
                    <ThemedText style={styles.streakText}>{completedTotal}/21 días</ThemedText>
                  </View>

                  <ThemedText variant="caption" style={styles.cardCaption}>
                    {habit.description}
                  </ThemedText>

                  <View style={styles.miniTrack}>
                    <View style={[styles.miniFill, { width: `${habitProgress}%` }]} />
                  </View>
                </View>

                <Ionicons
                  name={isDone ? 'checkbox' : 'square-outline'}
                  size={24}
                  color={isDone ? '#E07A3F' : '#C7AF91'}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  container: {
    flex: 1,
    backgroundColor: '#FDF6EC',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  title: {
    color: '#2D221A',
    fontWeight: '800',
  },
  subtitle: {
    color: '#7A6656',
  },
  waterCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1DEC6',
  },
  waterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  waterBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FBE5CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#2D221A',
    fontWeight: '700',
  },
  cardCaption: {
    color: '#7A6656',
    marginTop: 2,
  },
  waterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#FDF6EC',
    borderWidth: 1,
    borderColor: '#EAD2B5',
    minWidth: 74,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: '#E07A3F',
    borderColor: '#E07A3F',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D221A',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1DEC6',
  },
  habitCardDone: {
    borderColor: '#E07A3F',
    backgroundColor: '#FFF7EE',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FBE5CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxDone: {
    backgroundColor: '#E07A3F',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E07A3F',
  },
  miniTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#F1DEC6',
    overflow: 'hidden',
    marginTop: 8,
  },
  miniFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#E07A3F',
  },
});