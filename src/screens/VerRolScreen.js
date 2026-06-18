import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function VerRolScreen({ route, navigation }) {
    const { jugador = {}, mostrarPista } = route.params || {};
    const [revelado, setRevelado] = useState(false);

    const esImpostor = jugador?.esImpostor;

    const volver = () => {
        
        navigation.goBack();
    };

    return (
        <View style={estilos.container}>
            <Text style={estilos.nombre}>{jugador.nombre}</Text>

            <View style={estilos.cardRol}>
                {revelado ? (
                    <>
                        <Text style={estilos.etiquetaRol}>Tu rol es:</Text>
                        <Text
                            style={[
                                estilos.rol,
                                esImpostor ? estilos.rolImpostor : estilos.rolCiudadano,
                            ]}
                        >
                            {jugador.rol}
                        </Text>
                        {esImpostor && (
                            <Text style={estilos.mensajeImpostor}>
                                ¡Eres el impostor!
                            </Text>
                        )}
                        {!esImpostor && mostrarPista && jugador.pista && (
                            <Text style={estilos.pista}>
                                Pista: {jugador.pista}
                            </Text>
                        )}
                    </>
                ) : (
                    <TouchableOpacity
                        style={estilos.botonRevelar}
                        onPress={() => setRevelado(true)}
                    >
                        <Text style={estilos.botonRevelarTexto}>
                            Toca para revelar tu rol
                        </Text>
                        <Text style={estilos.botonRevelarEmoji}>👁️</Text>
                    </TouchableOpacity>
                )}
            </View>

            {revelado && (
                <TouchableOpacity style={estilos.botonVolver} onPress={volver}>
                    <Text style={estilos.botonVolverTexto}>Listo</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#087c4f',
        padding: 18,
        paddingTop: 60,
        alignItems: 'center',
    },
    nombre: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    cardRol: {
        backgroundColor: '#075c35',
        borderRadius: 16,
        padding: 30,
        width: '100%',
        alignItems: 'center',
        minHeight: 200,
        justifyContent: 'center',
    },
    etiquetaRol: {
        color: '#a8e6bd',
        fontSize: 16,
        marginBottom: 10,
    },
    rol: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rolImpostor: {
        color: '#ff4444',
    },
    rolCiudadano: {
        color: '#ffffff',
    },
    mensajeImpostor: {
        color: '#ff8888',
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    pista: {
        color: '#f5c518',
        fontSize: 16,
        marginTop: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    botonRevelar: {
        alignItems: 'center',
    },
    botonRevelarTexto: {
        color: '#a8e6bd',
        fontSize: 18,
        fontWeight: '600',
    },
    botonRevelarEmoji: {
        fontSize: 48,
        marginTop: 12,
    },
    botonVolver: {
        backgroundColor: '#f5c518',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    botonVolverTexto: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
