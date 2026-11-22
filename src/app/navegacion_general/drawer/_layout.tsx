import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#111827' : '#ffffff',
        },
        headerTintColor: isDark ? '#f9fafb' : '#111827',
        drawerStyle: {
          backgroundColor: isDark ? '#111827' : '#ffffff',
        },
        drawerActiveTintColor: '#3b82f6',
        drawerInactiveTintColor: isDark ? '#9ca3af' : '#4b5563',
      }}
    >
      <Drawer.Screen
        name="../../Perfil/Ajustes/tabs"
        options={{
          drawerLabel: 'Reto 21 Días',
          title: 'Reto 21 Días',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              size={size}
              color={color as string}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="../../Perfil/Ajustes/settings"
        options={{
          drawerLabel: 'Perfil y Ajustes',
          title: 'Perfil y Ajustes',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color as string}
            />
          ),
        }}
      />
    </Drawer>
  );
}