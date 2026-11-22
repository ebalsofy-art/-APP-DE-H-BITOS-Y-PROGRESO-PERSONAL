import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WATER_OPTIONS, DAILY_WATER_GOAL } from '../../../../hooks/useHabits';

interface WaterIntakeCardProps {
  dayNumber: number;
  selectedLiters: number;
  onSelectLiters: (liters: number) => void;
}

export function WaterIntakeCard({
  dayNumber,
  selectedLiters,
  onSelectLiters,
}: WaterIntakeCardProps) {
  const goalReached = selectedLiters >= DAILY_WATER_GOAL;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconBadge}>
          <Ionicons name="water" size={20} color="#E07A3F" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Agua al día · Día {dayNumber}</Text>
          <Text style={styles.subtitle}>
            {selectedLiters > 0
              ? `Seleccionado: ${selectedLiters} L ${goalReached ? '(Meta cumplida)' : `(Meta: ${DAILY_WATER_GOAL} L)`}`
              : `Elige cuántos litros tomaste hoy (Meta: ${DAILY_WATER_GOAL} L)`}
          </Text>
        </View>
      </View>

      <View style={styles.optionsGrid}>
        {WATER_OPTIONS.map((liters) => {
          const active = selectedLiters === liters;
          return (
            <TouchableOpacity
              key={liters}
              activeOpacity={0.8}
              onPress={() => onSelectLiters(liters)}
              style={[styles.optionChip, active && styles.optionChipActive]}
            >
              <Text style={[styles.optionText, active && styles.optionTextActive]}>
                {liters} L
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1DEC6',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#FBE5CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D221A',
  },
  subtitle: {
    fontSize: 13,
    color: '#7A6656',
    marginTop: 2,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#FDF6EC',
    borderWidth: 1,
    borderColor: '#EAD2B5',
    minWidth: 74,
    alignItems: 'center',
  },
  optionChipActive: {
    backgroundColor: '#E07A3F',
    borderColor: '#E07A3F',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D221A',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
});