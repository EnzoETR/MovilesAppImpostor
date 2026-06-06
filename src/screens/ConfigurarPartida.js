import { Text, View, FlatList, TextInput, ScrollView } from 'react-native';
import { styles } from '../styles/EstilosConfigurarPartida';
import { Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import BotonIncremental from '../components/botonIncremental';
import Checkbox from 'expo-checkbox';


import { categorias } from '../data/categoriasLocal';

export default function ConfigurarPartidaScreen() {

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(null);

    /*const [items, setItems] = useState([
        { label: 'Famosos', value: 'famosos' },
        { label: 'Películas', value: 'peliculas' },
        { label: 'Videojuegos', value: 'videojuegos' },
        { label: 'Fútbol', value: 'futbol' },
        { label: 'Futbolistas', value: 'futbolistas' }
    ]);*/

    const [items, setItems] = useState(
        categorias.map((categoria) => ({
            label: categoria.nombre,
            value: categoria.id,
        }))
    );
    const categoriaSeleccionada = categorias.find(
        (categoria) => categoria.id === value
    );

    const [impostores, setImpostores] = useState(1);
    
    const [pista,setPista] = useState(false);

    const [jugadores, setJugadores] = useState([
        { id: '1', nombre: 'Juan' },
        { id: '2', nombre: 'Pedro' },
    ]);


    return (
        <FlatList
            style={styles.container}
            data={[]}
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
                <Button title='Volver' onPress={() => console.log('Volver')} />
                <Button title='Iniciar Partida' onPress={() => console.log('Iniciar Partida')} />
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
