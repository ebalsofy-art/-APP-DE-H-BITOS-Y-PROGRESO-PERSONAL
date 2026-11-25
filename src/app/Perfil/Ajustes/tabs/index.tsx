import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '../../../../hooks/marcado_y_calculos/components/ThemedView';
import { ThemedText } from '../../../../hooks/marcado_y_calculos/components/ThemedText';
import { ProgressCard } from '../../../../hooks/marcado_y_calculos/components/ProgressCard';
import { useHabits } from '../../../../hooks/useHabits';

export default function HomeScreen() {
  const { habits, selectedDay, setSelectedDay, toggleHabitDay, stats } = useHabits();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} className="flex-1">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText variant="title" style={styles.title} className="mb-1">
            Inicio
          </ThemedText>
          <ThemedText variant="caption" style={styles.subtitle} className="mb-4">
            Selecciona un día y marca tus hábitos de hoy
          </ThemedText>

          {/* Selector horizontal de días (1-21) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.daysRow}
            style={{ marginBottom: 18 }}
          >
            {Array.from({ length: 21 }, (_, index) => {
              const isSelected = selectedDay === index;
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDay(index)}
                  style={[styles.dayPill, isSelected && styles.dayPillActive]}
                >
                  <ThemedText style={[styles.dayLabel, isSelected && styles.dayTextActive]}>
                    Día
                  </ThemedText>
                  <ThemedText style={[styles.dayNum, isSelected && styles.dayTextActive]}>
                    {index + 1}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <ProgressCard
            title={`Progreso del Día ${selectedDay + 1}`}
            percentage={stats.dayPercentage}
            completedCount={stats.dayCompletedCount}
            totalCount={stats.dayTotalCount}
          />

          <ThemedText variant="subtitle" style={styles.sectionTitle} className="mt-2 mb-3">
            Hábitos de Hoy (Día {selectedDay + 1})
          </ThemedText>

          {habits.map((habit) => {
            const isDone = Boolean(habit.completedDays[selectedDay]);
            return (
              <TouchableOpacity
                key={habit.id}
                activeOpacity={0.8}
                onPress={() => toggleHabitDay(habit.id, selectedDay)}
                style={[styles.selectableCard, isDone && styles.selectableCardDone]}
              >
                <View style={[styles.leftIconBox, isDone && styles.leftIconBoxDone]}>
                  <Ionicons
                    name={(habit.icon as any) || 'checkmark-circle'}
                    size={20}
                    color={isDone ? '#FFFFFF' : '#E07A3F'}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <ThemedText variant="subtitle" style={styles.cardTitle}>
                    {habit.title}
                  </ThemedText>
                  <ThemedText variant="caption" style={styles.cardCaption}>
                    {habit.description}
                  </ThemedText>
                </View>

                <Ionicons
                  name={isDone ? 'checkmark-circle' : 'ellipse-outline'}
                  size={26}
                  color={isDone ? '#E07A3F' : '#D5BFA5'}
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
  sectionTitle: {
    color: '#2D221A',
    fontWeight: '700',
  },
  daysRow: {
    gap: 8,
    paddingRight: 8,
  },
  dayPill: {
    width: 54,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#EAD2B5',
    alignItems: 'center',
  },
  dayPillActive: {
    backgroundColor: '#E07A3F',
    borderColor: '#E07A3F',
  },
  dayLabel: {
    fontSize: 11,
    color: '#7A6656',
    fontWeight: '600',
  },
  dayNum: {
    fontSize: 15,
    color: '#2D221A',
    fontWeight: '800',
    marginTop: 1,
  },
  dayTextActive: {
    color: '#FFFFFF',
  },
  selectableCard: {
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
  selectableCardDone: {
    borderColor: '#E07A3F',
    backgroundColor: '#FFF7EE',
  },
  leftIconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FBE5CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconBoxDone: {
    backgroundColor: '#E07A3F',
  },
  cardTitle: {
    color: '#2D221A',
    fontWeight: '700',
  },
  cardCaption: {
    color: '#7A6656',
    marginTop: 2,
  },
});