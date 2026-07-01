import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

export default function VotacionScreen({ route, navigation }) {
    const { jugadores, palabra, categoria } = route.params || {};
    
    const [votos, setVotos] = useState({});
    const [jugadorActual, setJugadorActual] = useState(0);
    const [votacionFinalizada, setVotacionFinalizada] = useState(false);
    const [eliminado, setEliminado] = useState(null);
    const [empate, setEmpate] = useState(false);

    const jugadoresActivos = jugadores.filter(j => !j.eliminado);

    const handleVoto = (votadoId) => {
        const votante = jugadoresActivos[jugadorActual];
        setVotos(prev => ({
            ...prev,
            [votante.id]: votadoId
        }));
        setJugadorActual(prev => prev + 1);
    };

    const finalizarVotacion = () => {
        // Contar votos
        const conteo = {};
        Object.values(votos).forEach(votadoId => {
            conteo[votadoId] = (conteo[votadoId] || 0) + 1;
        });

        // Verificar si hay votos
        if (Object.keys(conteo).length === 0) {
            Alert.alert('Sin votos', 'Nadie ha votado. Deben votar al menos una vez.');
            return;
        }

        // Encontrar el máximo
        const maxVotos = Math.max(...Object.values(conteo));
        const candidatos = Object.keys(conteo).filter(id => conteo[id] === maxVotos);

        if (candidatos.length > 1) {
            // Empate
            setEmpate(true);
            setVotacionFinalizada(true);
            Alert.alert('¡Empate!', 'Hay un empate en la votación. Volverán a votar.');
        } else {
            // Hay un ganador
            const eliminadoId = candidatos[0];
            const jugadorEliminado = jugadores.find(j => String(j.id) === String(eliminadoId));
            
            if (!jugadorEliminado) {
                Alert.alert('Error', 'No se encontró el jugador eliminado.');
                return;
            }
            
            setEliminado(jugadorEliminado);
            setVotacionFinalizada(true);
        }
    };

    const reiniciarVotacion = () => {
        setVotos({});
        setJugadorActual(0);
        setVotacionFinalizada(false);
        setEliminado(null);
        setEmpate(false);
    };

    const continuarJuego = () => {
        // Marcar al jugador como eliminado
        const jugadoresActualizados = jugadores.map(j => 
            j.id === eliminado.id ? { ...j, eliminado: true } : j
        );

        // Verificar condiciones de victoria
        const impostoresVivos = jugadoresActualizados.filter(j => j.esImpostor && !j.eliminado).length;
        const civilesVivos = jugadoresActualizados.filter(j => !j.esImpostor && !j.eliminado).length;

        if (impostoresVivos === 0) {
            Alert.alert('¡Ganaron los civiles!', 'Todos los impostores fueron eliminados.', [
                { text: 'OK', onPress: () => navigation.popToTop() }
            ]);
            return;
        }

        if (impostoresVivos >= civilesVivos) {
            Alert.alert('¡Ganaron los impostores!', 'Los impostores superaron en número a los civiles.', [
                { text: 'OK', onPress: () => navigation.popToTop() }
            ]);
            return;
        }

        // Continuar con otra ronda de votación (sin revelar roles de nuevo)
        navigation.replace('Votacion', {
            jugadores: jugadoresActualizados,
            palabra,
            categoria,
        });
    };

    if (votacionFinalizada && empate) {
        return (
            <View style={estilos.container}>
                <Text style={estilos.titulo}>¡Empate!</Text>
                <Text style={estilos.subtitulo}>Hubo un empate en la votación.</Text>
                <Text style={estilos.mensaje}>Deben volver a votar.</Text>
                
                <TouchableOpacity style={estilos.boton} onPress={reiniciarVotacion}>
                    <Text style={estilos.botonTexto}>Volver a Votar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (votacionFinalizada && eliminado) {
        return (
            <View style={estilos.container}>
                <Text style={estilos.titulo}>Votación Finalizada</Text>
                <View style={estilos.card}>
                    <Text style={estilos.eliminadoLabel}>Jugador Eliminado:</Text>
                    <Text style={estilos.eliminadoNombre}>{eliminado.nombre}</Text>
                    <Text style={estilos.eliminadoRol}>
                        {eliminado.esImpostor ? '🕵️ IMPOSTOR' : `👤 ${eliminado.rol}`}
                    </Text>
                </View>
                
                <TouchableOpacity style={estilos.boton} onPress={continuarJuego}>
                    <Text style={estilos.botonTexto}>Continuar Juego</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (jugadorActual >= jugadoresActivos.length) {
        return (
            <View style={estilos.container}>
                <Text style={estilos.titulo}>Votación</Text>
                <Text style={estilos.subtitulo}>Todos los jugadores han votado.</Text>
                
                <ScrollView style={estilos.lista}>
                    {jugadoresActivos.map(jugador => {
                        const votadoId = votos[jugador.id];
                        const votado = jugadoresActivos.find(j => j.id === votadoId);
                        return (
                            <View key={jugador.id} style={estilos.votoItem}>
                                <Text style={estilos.votante}>{jugador.nombre}</Text>
                                <Text style={estilos.flecha}>→</Text>
                                <Text style={estilos.votado}>{votado ? votado.nombre : 'No votó'}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
                
                <TouchableOpacity style={estilos.boton} onPress={finalizarVotacion}>
                    <Text style={estilos.botonTexto}>Finalizar Votación</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const votante = jugadoresActivos[jugadorActual];

    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>Votación</Text>
            <Text style={estilos.subtitulo}>
                Turno de: {votante.nombre}
            </Text>
            <Text style={estilos.progreso}>
                {jugadorActual + 1} / {jugadoresActivos.length}
            </Text>

            <ScrollView style={estilos.lista}>
                {jugadoresActivos
                    .filter(j => j.id !== votante.id)
                    .map(jugador => (
                    <TouchableOpacity
                        key={jugador.id}
                        style={estilos.jugadorCard}
                        onPress={() => handleVoto(jugador.id)}
                    >
                        <Text style={estilos.jugadorNombre}>{jugador.nombre}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#087c4f',
        padding: 20,
        paddingTop: 40,
    },
    titulo: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitulo: {
        color: '#a8e6bd',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 8,
    },
    mensaje: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    progreso: {
        color: '#f5c518',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    lista: {
        flex: 1,
        marginBottom: 20,
    },
    jugadorCard: {
        backgroundColor: '#075c35',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        alignItems: 'center',
    },
    jugadorNombre: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    votoItem: {
        backgroundColor: '#075c35',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    votante: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    flecha: {
        color: '#f5c518',
        fontSize: 20,
        marginHorizontal: 10,
    },
    votado: {
        color: '#a8e6bd',
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
    },
    card: {
        backgroundColor: '#075c35',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 20,
    },
    eliminadoLabel: {
        color: '#a8e6bd',
        fontSize: 14,
        marginBottom: 8,
    },
    eliminadoNombre: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eliminadoRol: {
        color: '#f5c518',
        fontSize: 20,
        fontWeight: 'bold',
    },
    boton: {
        backgroundColor: '#f5c518',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    botonTexto: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
