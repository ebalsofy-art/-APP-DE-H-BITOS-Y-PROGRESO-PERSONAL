import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

export default function DrawerLayout() {
  const { colorScheme } = useColorScheme();
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
      {/* Opción 1: Abre las pestañas principales (Inicio, Hábitos, Progreso) */}
      <Drawer.Screen
        name="../../Perfil/Ajustes/tabs"
        options={{
          drawerLabel: 'Reto 21 Días',
          title: 'Reto 21 Días',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Opción 2: Abre la pantalla de Perfil / Ajustes */}
      <Drawer.Screen
        name="../../Perfil/Ajustes/settings"
        options={{
          drawerLabel: 'Perfil y Ajustes',
          title: 'Perfil y Ajustes',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}