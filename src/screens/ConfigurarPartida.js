import {Text, View, FlatList} from 'react-native';
import { styles } from '../styles/EstilosConfigurarPartida';
import { Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';


export default function ConfigurarPartidaScreen(){

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(null);

    const [items, setItems] = useState([
        { label: 'Famosos', value: 'famosos' },
        { label: 'Películas', value: 'peliculas' },
        { label: 'Videojuegos', value: 'videojuegos' },
        { label: 'Fútbol', value: 'futbol' },
        { label: 'Futbolistas', value: 'futbolistas' }
    ]);

    const jugadores = [
    { id: '1', nombre: 'Juan' },
    { id: '2', nombre: 'Pedro' },
    { id: '3', nombre: 'Ana' },
    { id: '4', nombre: 'Lucía' }
];


    return (
       <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Configurar Partida</Text>
            </View>

             <View style={styles.opciones}>
                <View style={styles.cardOpcion}>
                    <Text style={styles.textOpcion}>Pista</Text>
                    <Button title='Agregar Pista' onPress={() => console.log('Agregar Pista')}/>
                </View>   

                <View style={styles.cardOpcion}>
                    <Text style={styles.textOpcion}>Impostores</Text>
                    <Button title='Agregar Jugador' onPress={() => console.log('Agregar Jugador')}/>
                </View>
            </View>

            <View style={styles.cardCategorias}>
                <Text style={styles.subtitulo}>CATEGORIAS</Text>
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
                <Button title='Ver más' onPress={() => console.log('Ver más')}/>
            </View>

            <View style={styles.cardJugadores}>
                <Text style={styles.subtitulo}>Jugadores</Text>
                <View style={styles.listaJugadores}>
                    <FlatList
                        data={jugadores}
                        renderItem={({ item }) => (
                            <Text style={styles.itemJugador}>
                                {item.nombre}
                            </Text>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>

                <Button title='Agregar Jugador' onPress={() => console.log('Agregar Jugador')}/>
                <Button title='Eliminar Jugador' onPress={() => console.log('Eliminar Jugador')}/>
            </View>

            <View style={styles.botonesFinales}>
                <Button title='Volver' onPress={() => console.log('Volver')}/>
                <Button title='Iniciar Partida' onPress={() => console.log('Iniciar Partida')}/>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Versión 1.0</Text>
                <Text style={styles.footerText}>UTEC</Text>
            </View>
        </View>
    );
}
