import { Text, View, FlatList, TextInput, ScrollView } from 'react-native';
import { styles } from '../styles/EstilosConfigurarPartida';
import { Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import BotonIncremental from '../components/botonIncremental';
import Checkbox from 'expo-checkbox';
import { categorias } from '../data/categoriasLocal';
import { getJugadoresGuardados, setJugadoresGuardados } from '../utils/jugadoresStore';
import { useAuth } from '../context/AuthContext';

export default function ConfigurarPartidaScreen({ navigation }) {

    const { usuario } = useAuth();
    const estaLogueado = usuario !== null;

    console.log('ConfigurarPartida - Usuario:', usuario);
    console.log('ConfigurarPartida - estaLogueado:', estaLogueado);

    const API_URL = "http://172.20.10.2:8088/api/v1";

    const cargarCategoriasBackend = async () => {
        try {
            const response = await fetch(`${API_URL}/categoria/listarCategorias`);

            if (!response.ok) {
                throw new Error("Error al cargar categorías");
            }

            const data = await response.json();

            const nuevasItems = [
                ...categorias.map((c) => ({
                    label: c.nombre,
                    value: `local_${c.id}`,
                    esLocal: true
                })),
                ...data.map((c) => ({
                    label: c.nombre,
                    value: `backend_${c.id}`,
                    esLocal: false
                })),
            ];

            setItems(nuevasItems);
            setCategoriasBackend(data);

        } catch (error) {
            alert("Error al cargar categorías: " + error.message);
        }
    };
    const [palabra, setPalabra] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(
        categorias.map((categoria) => ({
            label: categoria.nombre,
            value: `local_${categoria.id}`,
            esLocal: true,
        }))
    );
    const [impostores, setImpostores] = useState(1);
    const [pista, setPista] = useState(false);
    const [jugadores, setJugadores] = useState(() => {
        const lista = getJugadoresGuardados();
        if (usuario && lista.length > 0) {
            lista[0] = {
                ...lista[0],
                nombre: usuario.nombre
            };
        }
        return lista;
    });
    const [categoriasBackend, setCategoriasBackend] = useState([]);

    useEffect(() => {
        if (estaLogueado) {
            cargarCategoriasBackend();
        }
    }, [estaLogueado]);


    const iniciarPartida = async () => {
        if (!value) {
            alert('Selecciona una categoría antes de iniciar.');
            return;
        }
        if (jugadores.length < 3) {
            alert('Se necesitan al menos 3 jugadores para jugar.');
            return;
        }
        if (impostores >= jugadores.length) {
            alert('La cantidad de impostores debe ser menor que la cantidad de jugadores.');
            return;
        }

        let palabraAleatoria;
        let nombreCategoria;

        if (value.startsWith('local_')) {
            // Categoría local (Películas)
            const idLocal = parseInt(value.replace('local_', ''));
            const categoriaSeleccionada = categorias.find((c) => c.id === idLocal);
            if (!categoriaSeleccionada || !categoriaSeleccionada.palabras?.length) {
                alert('La categoría seleccionada no tiene palabras.');
                return;
            }
            const p = categoriaSeleccionada.palabras[
                Math.floor(Math.random() * categoriaSeleccionada.palabras.length)
            ];
            const responsePistas = await fetch(`${API_URL}/pista/palabra/${palabraElegida.id}`);

            if (!responsePistas.ok) {
                alert('No se pudieron cargar las pistas.');
                return;
            }

            const pistas = await responsePistas.json();

            palabraAleatoria = {
                palabra: palabraElegida.nombre,
                pistas: pistas?.map((p) => p.nombre) || []
            };
            nombreCategoria = categoriaSeleccionada.nombre;

        } else {

            const idCategoriaBackend = parseInt(value.replace('backend_', ''));
            nombreCategoria = categoriasBackend.find((c) => c.id === idCategoriaBackend)?.nombre;

            const response = await fetch(`${API_URL}/categoria/${idCategoriaBackend}/palabras`);

            if (!response.ok) {
                alert('No se pudieron cargar las palabras.');
                return;
            }

            const palabras = await response.json();

            if (!palabras?.length) {
                alert('La categoría seleccionada no tiene palabras.');
                return;
            }

            const palabraElegida = palabras[Math.floor(Math.random() * palabras.length)];

            const responsePistas = await fetch(`${API_URL}/pista/palabra/${palabraElegida.id}`);

            if (!responsePistas.ok) {
                alert('No se pudieron cargar las pistas.');
                return;
            }

            const pistas = await responsePistas.json();

            palabraAleatoria = {
                palabra: palabraElegida.nombre,
                pistas: pistas?.map((p) => p.nombre) || []
            };
        }

        // Crear índices aleatorios para los impostores
        const indices = jugadores.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        const indicesImpostores = new Set(indices.slice(0, impostores));

        // Asignar roles
        const jugadoresConRol = jugadores.map((jugador, index) => ({
            ...jugador,
            rol: indicesImpostores.has(index) ? 'IMPOSTOR' : palabraAleatoria.palabra,
            esImpostor: indicesImpostores.has(index),
            pista: palabraAleatoria.pistas?.length
                ? palabraAleatoria.pistas[Math.floor(Math.random() * palabraAleatoria.pistas.length)]
                : '',
        }));

        setJugadoresGuardados(jugadores.map((j) => ({ id: j.id, nombre: j.nombre })));

        navigation.navigate('RevelarRoles', {
            jugadores: jugadoresConRol,
            palabra: palabraAleatoria.palabra,
            categoria: nombreCategoria,
            mostrarPista: pista,
        });
    };


    return (
        <FlatList
            style={styles.container}
            data={[]}
            renderItem={null}
            ListHeaderComponent={
                <>
                    <View style={styles.header}>
                        <Text style={styles.titulo}>Configurar Partida</Text>
                    </View>

                    <View style={styles.opciones}>
                        <View style={styles.cardOpcion}>
                            <Text style={styles.textOpcion}>Pista</Text>
                            <View style={styles.controlesPista}>
                                <Checkbox value={pista} onValueChange={setPista} />
                            </View>
                        </View>

                        <View style={styles.cardOpcion}>
                            <Text style={styles.textOpcion}>Impostores</Text>
                            <View style={styles.controlesImpostores}>
                                <BotonIncremental title='-' onPress={() => setImpostores(Math.max(1, impostores - 1))} />
                                <Text style={styles.numeroImpostores}>{impostores}</Text>
                                <BotonIncremental title='+' onPress={() => setImpostores(impostores + 1)} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardCategorias}>
                        <Text style={styles.subtitulo}>CATEGORÍAS</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="Seleccionar categoría"
                            style={styles.dropdown}
                            textStyle={styles.dropdownText}
                        />
                    </View>

                    <View style={styles.cardJugadores}>
                        <Text style={styles.subtitulo}>Jugadores</Text>

                        <View style={styles.listaJugadores}>
                            <View style={styles.jugadoresScrollContainer}>
                                <ScrollView
                                    style={styles.jugadoresScroll}
                                    contentContainerStyle={styles.jugadoresScrollContent}
                                    showsVerticalScrollIndicator={true}
                                    nestedScrollEnabled={true}
                                >
                                    {jugadores.map((item) => (
                                        <TextInput
                                            key={item.id}
                                            style={styles.inputJugador}
                                            value={item.nombre}
                                            onChangeText={(texto) => {
                                                setJugadores(
                                                    jugadores.map((j) =>
                                                        j.id === item.id
                                                            ? { ...j, nombre: texto }
                                                            : j
                                                    )
                                                );
                                            }}
                                        />
                                    ))}
                                </ScrollView>
                            </View>
                            <View style={styles.botonesJugadores}>
                                <View style={styles.botonJugador}>
                                    <Button
                                        title="Agregar"
                                        color="#06a837"
                                        onPress={() => {
                                            setJugadores([
                                                ...jugadores,
                                                {
                                                    id: Date.now().toString(),
                                                    nombre: `Jugador ${jugadores.length + 1}`
                                                }
                                            ]);
                                        }}
                                    />
                                </View>
                                <View style={styles.botonJugador}>
                                    <Button
                                        title="Eliminar"
                                        color="#06a837"
                                        onPress={() => {
                                            setJugadores(jugadores.slice(0, -1));
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.botonesFinales}>
                        <Button title='Volver' onPress={() => navigation.goBack()} />
                        <Button title='Iniciar Partida' onPress={iniciarPartida} />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Versión 1.0</Text>
                        <Text style={styles.footerText}>UTEC</Text>
                    </View>
                </>
            }
            contentContainerStyle={styles.containerScroll}
            keyboardShouldPersistTaps='handled'
        />
    );
}