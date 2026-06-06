import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useState } from 'react';

export default function PartidaScreen({ route, navigation }) {
    const { jugadores = [], palabra, categoria, mostrarPista } = route.params || {};

    // Fases: 'votacion', 'resultados'
    const [fase, setFase] = useState('votacion');
    const [indiceVotante, setIndiceVotante] = useState(0);
    const [votos, setVotos] = useState({});
    const [seleccionado, setSeleccionado] = useState(null);
    const [resultadoEliminado, setResultadoEliminado] = useState(null);

    const votanteActual = jugadores[indiceVotante];
    const esUltimoVotante = indiceVotante === jugadores.length - 1;

    const confirmarVoto = () => {
        if (!seleccionado) {
            Alert.alert('Selecciona un jugador', 'Debes elegir a quién acusar.');
            return;
        }

        const nuevosVotos = { ...votos };
        nuevosVotos[seleccionado] = (nuevosVotos[seleccionado] || 0) + 1;
        setVotos(nuevosVotos);
        setSeleccionado(null);

        if (esUltimoVotante) {
            // Calcular quién fue eliminado (más votos)
            let maxVotos = 0;
            let eliminado = null;
            for (const j of jugadores) {
                const cant = nuevosVotos[j.id] || 0;
                if (cant > maxVotos) {
                    maxVotos = cant;
                    eliminado = j;
                }
            }
            setResultadoEliminado(eliminado);
            setFase('resultados');
        } else {
            setIndiceVotante(indiceVotante + 1);
        }
    };

    const siguienteRonda = () => {
        navigation.navigate('ConfigurarPartida');
    };

    const volverAlInicio = () => {
        navigation.popToTop();
    };

    // ─── PANTALLA DE VOTACIÓN ───────────────────────────────────────────────
    if (fase === 'votacion') {
        return (
            <View style={estilos.container}>
                <Text style={estilos.titulo}>Votación</Text>
                <Text style={estilos.subtituloVotante}>
                    Turno de: <Text style={estilos.nombreVotante}>{votanteActual?.nombre}</Text>
                </Text>
                <Text style={estilos.instruccion}>
                    ¿Quién crees que es el impostor?
                </Text>

                <FlatList
                    data={jugadores.filter((j) => j.id !== votanteActual?.id)}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={estilos.lista}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                estilos.jugadorCardVotacion,
                                seleccionado === item.id && estilos.jugadorCardSeleccionado,
                            ]}
                            onPress={() => setSeleccionado(item.id)}
                        >
                            <Text style={estilos.jugadorNombre}>{item.nombre}</Text>
                            {seleccionado === item.id && (
                                <Text style={estilos.check}>✓</Text>
                            )}
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity
                    style={estilos.botonPrimario}
                    onPress={confirmarVoto}
                >
                    <Text style={estilos.botonPrimarioTexto}>
                        {esUltimoVotante ? 'Ver resultados' : 'Siguiente votante'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ─── PANTALLA DE RESULTADOS ─────────────────────────────────────────────
    if (fase === 'resultados') {
        const eliminadoEsImpostor = resultadoEliminado?.esImpostor;
        const impostores = jugadores.filter((j) => j.esImpostor);

        return (
            <View style={estilos.container}>
                <Text style={estilos.titulo}>Resultados</Text>

                <View style={estilos.cardResultado}>
                    <Text style={estilos.resultadoLabel}>Jugador eliminado:</Text>
                    <Text style={estilos.resultadoEliminado}>
                        {resultadoEliminado?.nombre}
                    </Text>
                    <Text
                        style={[
                            estilos.resultadoRol,
                            eliminadoEsImpostor ? estilos.textoVerde : estilos.textoRojo,
                        ]}
                    >
                        {eliminadoEsImpostor
                            ? '¡Era el IMPOSTOR! 🎉'
                            : `NO era el impostor.\nEra: ${resultadoEliminado?.rol}`}
                    </Text>
                </View>

                <View style={estilos.cardPalabra}>
                    <Text style={estilos.palabraLabel}>La palabra era:</Text>
                    <Text style={estilos.palabraValor}>{palabra}</Text>
                </View>

                {eliminadoEsImpostor ? (
                    <View style={estilos.cardVictoria}>
                        <Text style={estilos.victoriaTitulo}>🏆 ¡Ciudadanos ganan!</Text>
                        <Text style={estilos.victoriaSub}>Descubrieron al impostor</Text>
                    </View>
                ) : (
                    <View style={[estilos.cardVictoria, estilos.cardDerrota]}>
                        <Text style={estilos.victoriaTitulo}>🕵️ ¡Impostor gana!</Text>
                        <Text style={estilos.victoriaSub}>No lograron descubrirlo</Text>
                    </View>
                )}

                <Text style={estilos.subtitulo}>
                    Impostor(es): {impostores.map((j) => j.nombre).join(', ')}
                </Text>

                <TouchableOpacity
                    style={estilos.botonPrimario}
                    onPress={siguienteRonda}
                >
                    <Text style={estilos.botonPrimarioTexto}>Siguiente Ronda</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={estilos.botonSecundario}
                    onPress={volverAlInicio}
                >
                    <Text style={estilos.botonSecundarioTexto}>Volver al Inicio</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#087c4f',
        padding: 18,
        paddingTop: 40,
    },
    titulo: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitulo: {
        color: '#a8e6bd',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtituloVotante: {
        color: '#a8e6bd',
        fontSize: 16,
        textAlign: 'center',
    },
    nombreVotante: {
        color: '#f5c518',
        fontWeight: 'bold',
        fontSize: 20,
    },
    instruccion: {
        color: '#ffffff',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
        marginTop: 8,
    },
    lista: {
        paddingBottom: 16,
    },
    jugadorCardVotacion: {
        backgroundColor: '#075c35',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jugadorCardSeleccionado: {
        backgroundColor: '#0a9962',
        borderWidth: 2,
        borderColor: '#f5c518',
    },
    jugadorNombre: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    check: {
        color: '#f5c518',
        fontSize: 24,
        fontWeight: 'bold',
    },
    botonPrimario: {
        backgroundColor: '#f5c518',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    botonPrimarioTexto: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    botonSecundario: {
        padding: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    botonSecundarioTexto: {
        color: '#a8e6bd',
        fontSize: 16,
    },
    cardResultado: {
        backgroundColor: '#075c35',
        borderRadius: 14,
        padding: 20,
        marginBottom: 12,
        alignItems: 'center',
    },
    resultadoLabel: {
        color: '#a8e6bd',
        fontSize: 14,
        marginBottom: 6,
    },
    resultadoEliminado: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    resultadoRol: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textoVerde: {
        color: '#4cff88',
    },
    textoRojo: {
        color: '#ff4444',
    },
    cardPalabra: {
        backgroundColor: '#0a9962',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
    },
    palabraLabel: {
        color: '#a8e6bd',
        fontSize: 14,
        marginBottom: 4,
    },
    palabraValor: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardVictoria: {
        backgroundColor: '#1a7a3a',
        borderRadius: 14,
        padding: 20,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4cff88',
    },
    cardDerrota: {
        borderColor: '#ff4444',
        backgroundColor: '#4a1a1a',
    },
    victoriaTitulo: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    victoriaSub: {
        color: '#a8e6bd',
        fontSize: 14,
    },
});
