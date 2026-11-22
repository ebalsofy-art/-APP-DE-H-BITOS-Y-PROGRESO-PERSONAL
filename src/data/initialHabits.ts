import { Habit } from '../types/habit';

const createEmpty21Days = (): boolean[] => Array(21).fill(false);

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit-1',
    title: 'Estudiar programación',
    description: 'Practicar TypeScript, React Native o lógica por 45 min.',
    category: 'estudio',
    icon: 'code-slash',
    completedDays: createEmpty21Days(),
  },
  {
    id: 'habit-2',
    title: 'Leer 20 minutos',
    description: 'Lectura técnica o literaria sin distracciones.',
    category: 'lectura',
    icon: 'book',
    completedDays: createEmpty21Days(),
  },
  {
    id: 'habit-3',
    title: 'Realizar ejercicio físico',
    description: 'Entrenamiento, caminata o estiramientos diarios.',
    category: 'salud',
    icon: 'fitness',
    completedDays: createEmpty21Days(),
  },
  {
    id: 'habit-4',
    title: 'Beber agua',
    description: 'Completar al menos 2 litros de agua durante el día.',
    category: 'bienestar',
    icon: 'water',
    completedDays: createEmpty21Days(),
  },
];