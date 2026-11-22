import React, { useState } from 'react';
import { ScrollView, Switch, View, Alert, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedView } from '../../../../hooks/marcado_y_calculos/components/ThemedView';
import { ThemedText } from '../../../../hooks/marcado_y_calculos/components/ThemedText';
import { MenuItem } from '../../../../hooks/marcado_y_calculos/components/MenuItem';

export default function SettingsScreen() {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const router = useRouter();

  const toggleColorScheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1 px-5 pt-6">
        <ThemedText variant="title" className="mb-4">
          Ajustes
        </ThemedText>

        <View className="flex-row items-center justify-between p-4 mb-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <ThemedText variant="subtitle">Modo oscuro</ThemedText>
          <Switch value={isDark} onValueChange={toggleColorScheme} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}