import { Text, View, FlatList, TextInput, ScrollView } from 'react-native';
import { styles } from '../styles/EstilosConfigurarPartida';
import { Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import BotonIncremental from '../components/botonIncremental';
import Checkbox from 'expo-checkbox';
import { categorias } from '../data/categoriasLocal';
import { getJugadoresGuardados, setJugadoresGuardados } from '../utils/jugadoresStore';

export default function ConfigurarPartidaScreen({ navigation, route }) {

    const usuario = route.params?.usuario || null;
    const estaLogueado = usuario !== null;

    const API_URLS = [
        'http://192.168.1.15:8088/api/v1',
        'http://192.168.10.16:8088/api/v1',
        'http://localhost:8088/api/v1',
        'http://10.0.2.2:8088/api/v1',
    ];

    const fetchConFallback = async (ruta) => {
        let ultimoError = null;

        for (const API_URL of API_URLS) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

                const response = await fetch(`${API_URL}${ruta}`, { 
                    signal: controller.signal 
                });
                
                clearTimeout(timeoutId);

                if (response.ok) {
                    return response;
                }

                ultimoError = new Error(`HTTP ${response.status}`);
            } catch (error) {
                ultimoError = error;
            }
        }

        throw ultimoError || new Error('No se pudo conectar con el servidor');
    };

    const cargarCategoriasBackend = async () => {
        console.log('Cargando categorías...');
        const categoriasLocales = categorias.map((c) => ({
            label: c.nombre,
            value: `local_${c.id}`,
            esLocal: true,
        }));

        console.log('Categorías locales:', categoriasLocales);
        setItems(categoriasLocales);
        setCategoriasBackend([]);

        try {
            const response = await fetchConFallback('/categoria/listarCategorias');
            const data = await response.json();

            const nuevasItems = [
                ...categoriasLocales,
                ...data.map((c) => ({
                    label: c.nombre,
                    value: `backend_${c.id}`,
                    esLocal: false,
                })),
            ];

            setItems(nuevasItems);
            setCategoriasBackend(data);
            console.log('Categorías del backend cargadas:', data);
        } catch (error) {
            console.warn('No se pudo cargar el backend de categorías. Se mostrarán las categorías locales.', error.message);
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
    const [votacion, setVotacion] = useState(false);
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
        const maxImpostores = Math.max(1, Math.floor(jugadores.length / 2) - 1);
        if (impostores > maxImpostores) {
            alert(`La cantidad de impostores no puede superar ${maxImpostores} (${jugadores.length} jugadores / 2 - 1).`);
            return;
        }

        let palabraAleatoria;
        let nombreCategoria;

        if (value.startsWith('local_')) {
            const idLocal = parseInt(value.replace('local_', ''));
            const categoriaSeleccionada = categorias.find((c) => c.id === idLocal);

            if (!categoriaSeleccionada || !categoriaSeleccionada.palabras?.length) {
                alert('La categoría seleccionada no tiene palabras.');
                return;
            }

            const palabraElegida = categoriaSeleccionada.palabras[
                Math.floor(Math.random() * categoriaSeleccionada.palabras.length)
            ];

            palabraAleatoria = {
                palabra: palabraElegida.palabra,
                pistas: palabraElegida.pistas || []
            };
            nombreCategoria = categoriaSeleccionada.nombre;

        } else {

            const idCategoriaBackend = parseInt(value.replace('backend_', ''));
            nombreCategoria = categoriasBackend.find((c) => c.id === idCategoriaBackend)?.nombre;

            const response = await fetchConFallback(`/categoria/${idCategoriaBackend}/palabras`);

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

            const responsePistas = await fetchConFallback(`/pista/palabra/${palabraElegida.id}`);

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
            votacion: votacion,
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
                            <Text style={styles.textOpcion}>Votación</Text>
                            <View style={styles.controlesPista}>
                                <Checkbox value={votacion} onValueChange={setVotacion} />
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
                            listMode="SCROLLVIEW"
                            dropDownDirection="BOTTOM"
                            zIndex={3000}
                            zIndexInverse={1000}
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
                        <View style={styles.botonFinalSecundario}>
                            <Button title='Volver' color='#d9534f' onPress={() => navigation.goBack()} />
                        </View>
                        <View style={styles.botonFinal}>
                            <Button title='Iniciar Partida' color='#06a837' onPress={iniciarPartida} />
                        </View>
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