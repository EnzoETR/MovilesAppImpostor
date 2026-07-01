// Almacén simple en memoria para guardar la lista de jugadores
// entre partidas. Sobrevive mientras la app esté abierta.

let jugadoresGuardados = [
    { id: '1', nombre: 'Jugador 1' },
    { id: '2', nombre: 'Jugador 2' },
    { id: '3', nombre: 'Jugador 3' },
];

export const getJugadoresGuardados = () => jugadoresGuardados;

export const setJugadoresGuardados = (jugadores) => {
    jugadoresGuardados = jugadores;
};
