import { Text, View, FlatList, TextInput, ScrollView } from 'react-native';
import { styles } from '../styles/EstilosConfigurarPartida';
import { Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState, useEffect } from 'react';
import BotonIncremental from '../components/botonIncremental';
import Checkbox from 'expo-checkbox';
import { categorias } from '../data/categoriasLocal';
import { getJugadoresGuardados, setJugadoresGuardados } from '../utils/jugadoresStore';
import { supabase } from '../utils/supabase'; // agregado

export default function ConfigurarPartidaScreen({ navigation, route }) {

    const usuario = route.params?.usuario || null; // recibe el usuario
    const estaLogueado = usuario !== null;

    const [palabra, setPalabra] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(
        categorias.map((categoria) => ({
            label: categoria.nombre,
            value: categoria.id,
            esLocal: true, // marca que es local
        }))
    );
    const [impostores, setImpostores] = useState(1);
    const [pista, setPista] = useState(false);
    const [jugadores, setJugadores] = useState(getJugadoresGuardados());
    const [categoriasSupabase, setCategoriasSupabase] = useState([]);

    //  Si está logueado, carga las categorías de Supabase
    useEffect(() => {
        if (estaLogueado) {
            cargarCategoriasSupabase();
        }
    }, [estaLogueado]);

    const cargarCategoriasSupabase = async () => {
        const { data, error } = await supabase
            .from('categorias')
            .select('*');

        if (error) {
            alert('Error al cargar categorías: ' + error.message);
            return;
        }

        // Agregamos las categorías de Supabase al dropdown
        const nuevasItems = [
            ...categorias.map((c) => ({ label: c.nombre, value: `local_${c.id}`, esLocal: true })),
            ...data.map((c) => ({ label: c.nombre, value: `supabase_${c.id}`, esLocal: false })),
        ];
        setItems(nuevasItems);
        setCategoriasSupabase(data);
    };

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
            palabraAleatoria = { palabra: p.palabra, pistas: p.pistas };
            nombreCategoria = categoriaSeleccionada.nombre;

        } else {
            //  Categoría de Supabase
            const idSupabase = parseInt(value.replace('supabase_', ''));
            nombreCategoria = categoriasSupabase.find((c) => c.id === idSupabase)?.nombre;

            // Traer palabras de esa categoría
            const { data: palabras, error } = await supabase
                .from('palabras')
                .select('*')
                .eq('id_categoria', idSupabase);

            if (error || !palabras?.length) {
                alert('No se pudieron cargar las palabras.');
                return;
            }

            // Elegir palabra aleatoria
            const palabraElegida = palabras[Math.floor(Math.random() * palabras.length)];

            // Traer pistas de esa palabra
            const { data: pistas } = await supabase
                .from('pista')
                .select('*')
                .eq('id_palabra', palabraElegida.id);

            palabraAleatoria = {
                palabra: palabraElegida.nombre,
                pistas: pistas?.map((p) => p.nombre) || [],
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
            renderItem={null} // Agregado para buena práctica al usar data={[]}
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