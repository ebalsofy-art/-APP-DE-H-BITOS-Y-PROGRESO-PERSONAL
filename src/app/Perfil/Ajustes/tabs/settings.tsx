import React from 'react';
import { ScrollView, Switch, View, Alert } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Importa tus componentes reutilizables (ajusta la ruta relativa si es necesario)
import { ThemedView } from '../../../components/ThemedView';
import { ThemedText } from '../../../components/ThemedText';
import { MenuItem } from '../../../components/MenuItem';

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleAbout = () => {
    Alert.alert(
      'Reto 21 Días',
      'Aplicación de seguimiento de hábitos desarrollada en React Native, Expo Router y NativeWind (3° Bachillerato Técnico en Informática).'
    );
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 px-5 pt-6">
        {/* Tarjeta de Perfil del Usuario */}
        <View className="items-center mb-8 p-6 rounded-2xl bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
          <View className="w-20 h-20 rounded-full bg-blue-600 items-center justify-center mb-3">
            <Ionicons name="person" size={40} color="#ffffff" />
          </View>
          <ThemedText variant="title" className="text-xl font-bold">
            Emily Sofía Balarezo
          </ThemedText>
          <ThemedText variant="caption" className="text-gray-500 dark:text-gray-400 mt-1">
            3° Bachillerato Técnico • Reto 21 Días
          </ThemedText>
        </View>

        {/* Sección: Apariencia (Requisito clave de la rúbrica) */}
        <ThemedText variant="subtitle" className="mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Apariencia
        </ThemedText>
        
        <MenuItem
          title="Modo Oscuro"
          subtitle={isDark ? 'Tema oscuro activado' : 'Tema claro activado'}
          iconName={isDark ? 'moon' : 'sunny'}
          onPress={toggleColorScheme}
          rightElement={
            <Switch
              value={isDark}
              onValueChange={toggleColorScheme}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor="#ffffff"
            />
          }
        />

        {/* Sección: Navegación y Reto */}
        <ThemedText variant="subtitle" className="mt-6 mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Opciones del Reto
        </ThemedText>

        <MenuItem
          title="Ver Progreso General"
          subtitle="Consulta tu porcentaje de cumplimiento"
          iconName="stats-chart-outline"
          onPress={() => router.push('/Perfil/Ajustes/tabs/progress')}
        />

        <MenuItem
          title="Mis Hábitos Diarios"
          subtitle="Gestiona los hábitos de tus 21 días"
          iconName="checkbox-outline"
          onPress={() => router.push('/Perfil/Ajustes/tabs/habits')}
        />

        {/* Sección: Información */}
        <ThemedText variant="subtitle" className="mt-6 mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Información
        </ThemedText>

        <MenuItem
          title="Acerca de la App"
          subtitle="Versión 1.0.0 • Evaluación Sumativa"
          iconName="information-circle-outline"
          onPress={handleAbout}
        />
      </ScrollView>
    </ThemedView>
  );
}