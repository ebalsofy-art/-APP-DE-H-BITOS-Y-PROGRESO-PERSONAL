import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../../../hooks/marcado_y_calculos/components/ThemedView';
import { ThemedText } from '../../../../hooks/marcado_y_calculos/components/ThemedText';
import { ProgressCard } from '../../../../hooks/marcado_y_calculos/components/ProgressCard';
import { useHabits } from '../../../../hooks/useHabits';

export default function ProgressScreen() {
  const { habits, selectedDay, stats } = useHabits();
  const totalCompletedAllDays = stats.totalCompleted;
  const currentDayNum = selectedDay + 1;
  const nextMilestone = currentDayNum <= 7 ? 7 : currentDayNum <= 14 ? 14 : 21;
  const daysLeft = Math.max(nextMilestone - currentDayNum, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} className="flex-1">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText variant="title" style={styles.title} className="mb-1">
            Tu Progreso
          </ThemedText>
          <ThemedText variant="caption" style={styles.subtitle} className="mb-4">
            Estadísticas de cumplimiento del reto
          </ThemedText>

          <ProgressCard
            title="Avance Global (21 Días)"
            percentage={stats.globalPercentage}
            completedCount={totalCompletedAllDays}
            totalCount={habits.length * 21}
            subtitle={`Has completado ${totalCompletedAllDays} de ${habits.length * 21} metas totales`}
          />

          <ProgressCard
            title={`Resumen del Día ${currentDayNum}`}
            percentage={stats.dayPercentage}
            completedCount={stats.dayCompletedCount}
            totalCount={stats.dayTotalCount}
          />

          <View style={styles.milestoneCard}>
            <ThemedText variant="subtitle" style={styles.cardTitle}>
              Hito del reto: Día {nextMilestone}
            </ThemedText>
            <ThemedText variant="caption" style={styles.cardCaption}>
              {currentDayNum >= 21 && stats.globalPercentage === 100
                ? '¡Completaste todo el ciclo de 21 días!'
                : `Estás en el Día ${currentDayNum}. Te faltan ${daysLeft} día(s) para alcanzar el hito del Día ${nextMilestone}.`}
            </ThemedText>
          </View>

          <ThemedText variant="subtitle" style={styles.sectionTitle} className="mt-2 mb-3">
            Rendimiento por Hábito
          </ThemedText>

          {habits.map((habit) => {
            const daysDone = habit.completedDays.filter(Boolean).length;
            const habitPercent = Math.round((daysDone / 21) * 100);
            return (
              <View key={habit.id} style={styles.habitRowCard}>
                <View style={styles.rowBetween}>
                  <ThemedText variant="subtitle" style={styles.cardTitle}>
                    {habit.title}
                  </ThemedText>
                  <ThemedText style={styles.percentText}>{habitPercent}%</ThemedText>
                </View>
                <ThemedText variant="caption" style={styles.cardCaption}>
                  {daysDone} de 21 días completados
                </ThemedText>
              </View>
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
  milestoneCard: {
    backgroundColor: '#FFF7EE',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E07A3F',
  },
  habitRowCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1DEC6',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#2D221A',
    fontWeight: '700',
  },
  cardCaption: {
    color: '#7A6656',
    marginTop: 4,
  },
  percentText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#E07A3F',
  },
});