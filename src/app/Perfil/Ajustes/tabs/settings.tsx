import React, { useState } from 'react';
import { ScrollView, Switch, View, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '../../../../hooks/marcado_y_calculos/components/ThemedView';
import { ThemedText } from '../../../../hooks/marcado_y_calculos/components/ThemedText';
import { MenuItem } from '../../../../hooks/marcado_y_calculos/components/MenuItem';

export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);

  const handleAbout = () => {
    Alert.alert(
      'Reto 21 Días',
      'Seguimiento diario de hábitos, hidratación y progreso personal.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container} className="flex-1">
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <ThemedText variant="title" style={styles.title} className="mb-1">
            Ajustes
          </ThemedText>
          <ThemedText variant="caption" style={styles.subtitle} className="mb-4">
            Configuración de la aplicación
          </ThemedText>

          <View style={styles.appInfoCard}>
            <ThemedText variant="subtitle" style={styles.cardTitle}>
              Reto 21 Días · Edición Personal
            </ThemedText>
            <ThemedText variant="caption" style={styles.cardCaption}>
              Control diario de hábitos, hidratación y constancia con guardado local.
            </ThemedText>
          </View>

          <View style={styles.switchCard}>
            <ThemedText variant="subtitle" style={styles.cardTitle}>
              Modo oscuro
            </ThemedText>
            <Switch
              value={isDark}
              onValueChange={setIsDark}
              trackColor={{ false: '#EAD2B5', true: '#F3A675' }}
              thumbColor={isDark ? '#E07A3F' : '#FFFFFF'}
            />
          </View>

          <MenuItem
            title="Acerca de"
            subtitle="Reto 21 Días"
            iconName="information-circle-outline"
            onPress={handleAbout}
          />
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
  appInfoCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1DEC6',
  },
  switchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1DEC6',
  },
  cardTitle: {
    color: '#2D221A',
    fontWeight: '700',
  },
  cardCaption: {
    color: '#7A6656',
    marginTop: 4,
  },
});