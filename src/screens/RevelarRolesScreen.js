import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState, useRef, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function RevelarRolesScreen({ route, navigation }) {
    const { jugadores = [], palabra, categoria, mostrarPista } = route.params || {};

    const [vistos, setVistos] = useState([]);

    const jugadorActualRef = useRef(null);

    const [revelarTodo, setRevelarTodo] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (jugadorActualRef.current !== null) {
                const id = jugadorActualRef.current;
                if (!vistos.includes(id)) {
                    setVistos((prev) => [...prev, id]);
                }
                jugadorActualRef.current = null;
            }
        }, [vistos])
    );

    const todosVieron = jugadores.length > 0 && vistos.length === jugadores.length;

    const verRolDe = (item) => {
        if (vistos.includes(item.id)) {
            Alert.alert('Ya viste tu rol', `${item.nombre} ya vio su rol.`);
            return;
        }
        // Guardamos el ID antes de navegar
        jugadorActualRef.current = item.id;
        navigation.navigate('VerRol', {
            jugador: item,
            mostrarPista,
        });
    };

    const impostores = jugadores.filter((j) => j.esImpostor);

    if (revelarTodo) {
        return (
            <View style={estilos.container}>
                <Text style={estilos.titulo}>¡Todos vieron su rol!</Text>

                <View style={estilos.cardRevelar}>
                    <Text style={estilos.revelarLabel}>Categoría</Text>
                    <Text style={estilos.revelarCategoria}>{categoria}</Text>

                    <View style={estilos.divisor} />

                    <Text style={estilos.revelarLabel}>La palabra secreta es</Text>
                    <Text style={estilos.revelarPalabra}>{palabra}</Text>
                </View>

                <View style={estilos.cardImpostor}>
                    <Text style={estilos.revelarLabel}>
                        {impostores.length === 1 ? 'El impostor es' : 'Los impostores son'}
                    </Text>
                    {impostores.map((imp) => (
                        <Text key={imp.id} style={estilos.revelarImpostor}>
                            🕵️ {imp.nombre}
                        </Text>
                    ))}
                </View>


                <TouchableOpacity
                    style={estilos.botonPrimario}
                    onPress={() => navigation.popToTop()}
                >
                    <Text style={estilos.botonPrimarioTexto}>Volver al Inicio</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={estilos.botonSecundario}
                    onPress={() => setRevelarTodo(false)}
                >
                    <Text style={estilos.botonSecundarioTexto}>Volver a ver roles</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>Revelar Roles</Text>
            <Text style={estilos.subtitulo}>
                Pasen el celular entre todos.{'\n'}Cada jugador toca su nombre para ver su rol en secreto.
            </Text>
            <Text style={estilos.categoria}>Categoría: {categoria}</Text>
            <Text style={estilos.progreso}>
                {vistos.length} / {jugadores.length} jugadores vieron su rol
            </Text>

            <FlatList
                data={jugadores}
                keyExtractor={(item) => item.id}
                contentContainerStyle={estilos.lista}
                renderItem={({ item }) => {
                    const yaVio = vistos.includes(item.id);
                    return (
                        <TouchableOpacity
                            style={[estilos.jugadorCard, yaVio && estilos.jugadorCardVisto]}
                            onPress={() => verRolDe(item)}
                        >
                            <Text style={estilos.jugadorNombre}>{item.nombre}</Text>
                            <Text style={estilos.estado}>
                                {yaVio ? ' Visto' : 'Toca para ver'}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />

            {todosVieron && (
                <TouchableOpacity
                    style={estilos.botonPrimario}
                    onPress={() => setRevelarTodo(true)}
                >
                    <Text style={estilos.botonPrimarioTexto}>Ver palabra e impostor</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={estilos.botonVolver}
                onPress={() => navigation.goBack()}
            >
                <Text style={estilos.botonVolverTexto}>Volver a configurar</Text>
            </TouchableOpacity>
        </View>
    );
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
        lineHeight: 20,
    },
    categoria: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 4,
        fontWeight: '600',
    },
    progreso: {
        color: '#f5c518',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: '600',
    },
    lista: {
        paddingBottom: 16,
    },
    jugadorCard: {
        backgroundColor: '#075c35',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jugadorCardVisto: {
        backgroundColor: '#0a9962',
    },
    jugadorNombre: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    estado: {
        color: '#a8e6bd',
        fontSize: 14,
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
        marginTop: 8,
    },
    botonSecundarioTexto: {
        color: '#a8e6bd',
        fontSize: 16,
    },
    botonVolver: {
        padding: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    botonVolverTexto: {
        color: '#a8e6bd',
        fontSize: 14,
    },

    cardRevelar: {
        backgroundColor: '#075c35',
        borderRadius: 16,
        padding: 24,
        marginTop: 16,
        alignItems: 'center',
    },
    revelarLabel: {
        color: '#a8e6bd',
        fontSize: 14,
        marginBottom: 6,
    },
    revelarCategoria: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    divisor: {
        height: 1,
        backgroundColor: '#0a9962',
        width: '100%',
        marginVertical: 16,
    },
    revelarPalabra: {
        color: '#f5c518',
        fontSize: 36,
        fontWeight: 'bold',
    },
    cardImpostor: {
        backgroundColor: '#4a1a1a',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ff4444',
    },
    revelarImpostor: {
        color: '#ff4444',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 4,
    },
    nota: {
        color: '#a8e6bd',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 16,
        fontStyle: 'italic',
    },
});
