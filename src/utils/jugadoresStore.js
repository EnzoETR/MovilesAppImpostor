// Almacén simple en memoria para guardar la lista de jugadores
// entre partidas. Sobrevive mientras la app esté abierta.

let jugadoresGuardados = [
    { id: '1', nombre: 'Juan' },
    { id: '2', nombre: 'Pedro' },
];

export const getJugadoresGuardados = () => jugadoresGuardados;

export const setJugadoresGuardados = (jugadores) => {
    jugadoresGuardados = jugadores;
};
