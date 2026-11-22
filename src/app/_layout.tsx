import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import '../../global.css';  Asegúrate de que apunte a tu global.css en la raíz

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Carga la pantalla inicial o redirige al Drawer */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="navegacion_general/drawer" 
          options={{ headerShown: false }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}