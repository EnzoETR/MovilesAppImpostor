import AsyncStorage from '@react-native-async-storage/async-storage';

const PARTIDAS_KEY = '@partidas_guardadas';

export const getPartidasGuardadas = async () => {
  try {
    const json = await AsyncStorage.getItem(PARTIDAS_KEY);
    if (!json) {
      return [];
    }

    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('No se pudieron leer las partidas guardadas:', error);
    return [];
  }
};

export const guardarPartidaLocal = async (partida) => {
  try {
    const partidas = await getPartidasGuardadas();
    const nuevaPartida = {
      ...partida,
      id: `${Date.now()}`,
      fecha: new Date().toISOString(),
    };

    const actualizadas = [nuevaPartida, ...partidas];
    await AsyncStorage.setItem(PARTIDAS_KEY, JSON.stringify(actualizadas));
    return nuevaPartida;
  } catch (error) {
    console.warn('No se pudo guardar la partida localmente:', error);
    throw error;
  }
};
