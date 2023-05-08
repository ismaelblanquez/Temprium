import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import BottomBar from '../components/BottomBar';
import { addHoras, getIdUsuario, getAllHoras, deleteHoras } from '../DataBase/Conexion';
import * as SQLite from 'expo-sqlite';
import { AuthContext } from '../services/AuthContext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = SQLite.openDatabase('Temprium.db');
// Componente de la pantalla Home
const Home = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [horasTotales, setHorasTotales] = useState(0);
    const [email, setEmail] = useState('');

    const getEmail = async () => {
        const email = await AsyncStorage.getItem('email');
        setEmail(email || 'dummy@nosession.com'); // Establecer un valor predeterminado si email es nulo o indefinido
        getAllHoras(email || 'dummy@nosession.com') // Llamar getAllHoras dentro de getEmail
            .then((results) => {
                const todos = [];
                results.forEach((item) => {
                    todos.push(item);
                });
                setData(todos);
                const horas = todos.map((item) => item.Horas).reduce((acc, cur) => acc + cur, 0);
                setHorasTotales(horas);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        console.log("EMAIL:::" + email)
        getEmail();
    }, []);


    //   useEffect(() => {
    //     db.transaction(tx => {
    //       tx.executeSql(
    //         'SELECT * FROM HORAS;',
    //         [],
    //         (_, { rows }) => {
    //           setTarjetas(rows._array);
    //           console.log(rows);
    //           console.log(tx);
    //         },
    //         (_, error) => {
    //           console.log('Error en la consulta: ', error);
    //         }
    //       );
    //     });
    //   }, []);

    const agregarTarjeta = () => {
        if (!nuevaTarjeta.tipo || !nuevaTarjeta.titulo || !nuevaTarjeta.fecha || !nuevaTarjeta.clase || !nuevaTarjeta.horas) {
            Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
            return;
        }
        setTarjetas([...tarjetas, nuevaTarjeta]);
        setTotalHoras(totalHoras + nuevaTarjeta.horas);
        setNuevaTarjeta({ tipo: '', titulo: '', fecha: '', clase: '', horas: '' });
        setModalVisible(false);
    };

    const eliminarTarjeta = tarjeta => {
        setTarjetas(tarjetas.filter(t => t !== tarjeta));
        setTotalHoras(totalHoras - tarjeta.horas);
    };

    const renderItem = ({ item }) => {
        console.log("item: " + item);
        return (
            <View style={styles.tarjetaContainer}>
                <View style={styles.iconContainer}>
                    <Text style={item.Tipohoras === "No Lectivas" ? styles.iconNoLectiva : styles.iconLectiva}>
                        {item.Tipohoras === "No Lectivas" ? 'NL' : 'L'}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.tarjetaTitulo}>{item.Categoria}</Text>
                    <View style={styles.datosContainer}>
                        <Text style={[styles.tarjetaFecha, styles.fechaAnchoFijo]}>{item.Dia}</Text>
                        <Text style={styles.tarjetaClase}>{item.Clase}</Text>
                    </View>

                </View>
                <View style={styles.horasContainer}>
                    <Text style={styles.tarjetaHoras}>{item.Horas} H</Text>
                </View>
                <Text style={styles.tituloTarjeta}>{item.titulo}</Text>
                <Text style={styles.fechaTarjeta}>{item.fecha}</Text>


                <Text style={styles.claseTarjeta}>{item.clase}</Text>
                <Text style={styles.horasTarjeta}>{item.horas} horas</Text>
            </View>
        );
    };
    const handleInput = (name, value) => {
        setNuevaTarjeta({ ...nuevaTarjeta, [name]: value });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando datos...</Text>
            </View>
        );
    }





    return (

        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.horasTotalesContainer}>
                    <Text style={styles.horasTotalesTitulo}>HORAS REALIZADAS:</Text>
                    <Text style={styles.horasTotalesNumero}>{horasTotales} HORAS</Text>
                </View>

            </View>
            <View style={styles.alinearBoton}>
                <Text style={styles.recienteTitulo}>RECIENTE</Text>
                <TouchableOpacity style={styles.pdfButton} onPress={() => { console.log("prueba"); deleteHoras(); }}>
                    <Image source={require('../assets/images/share.png')} />
                </TouchableOpacity>

            </View>
            <FlatList
                style={styles.listaTarjetas}
                data={tarjetas}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
            <View style={styles.footer}>
                <Text style={styles.totalHoras}>Total horas: {totalHoras} horas</Text>
                <BottomBar navigation={navigation} />
            </View>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    {/* <Text style={styles.modalTitulo}>Agregar tarjeta de horas</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo"
            value={nuevaTarjeta.tipo}
            onChangeText={text => handleInput('tipo', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={nuevaTarjeta.titulo}
            onChangeText={text => handleInput('titulo', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha (DD/MM/AAAA)"
            value={nuevaTarjeta.fecha}
            onChangeText={text => handleInput('fecha', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Clase"
            value={nuevaTarjeta.clase}
            onChangeText={text => handleInput('clase', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Horas"
            keyboardType="numeric"
            value={nuevaTarjeta.horas.toString()}
            onChangeText={text => handleInput('horas', parseFloat(text))}
          /> */}
                    <RegisterHours navigation={navigation} />

                    <TouchableOpacity style={styles.boton} onPress={() => agregarTarjeta()}>
                        <Text style={styles.textoBoton}>Agregar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonCancelar} onPress={() => setModalVisible(false)}>
                        <Text style={styles.textoBoton}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginTop: '5%',
        marginBottom: 50,
    },
    headerContainer: {
        backgroundColor: '#E1F5FE',
        borderRadius: 12,
        borderWidth: 4,
        borderColor: '#0096C7',
        width: '80%',
        marginLeft: '9%',
        marginBottom: '10%',
    },
    horasTotalesContainer: {
        alignItems: 'center',
    },
    horasTotalesTitulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0096C7',
    },
    horasTotalesNumero: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0096C7',
    },

    alinearBoton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pdfButton: {
        backgroundColor: '#0096C7',
        padding: 8,
        borderRadius: 4,
        width: 30,
        height: 30,
    },
    recienteTitulo: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#0096C7',
        marginBottom: '20%',
    },
    tarjetaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '4%',
        marginRight: '4%',
        marginBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#0096C7',
    },
    iconContainer: {
        width: 32,
        height: 32,
        backgroundColor: '#12CDD4',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconNoLectiva: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    iconLectiva: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    infoContainer: {
        // alignItems: 'start',
        flex: 1,
        marginLeft: '4%',
        marginBottom: '4%',

    },
    datosContainer: {
        flexDirection: 'row',
        // textAlign: 'center',
    },
    tarjetaTitulo: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#023E8A',
    },
    tarjetaFecha: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#424242',
        // marginBottom: 4,
        flex: 1,
        numberOfLines: 1,
        fontWeight: 'bold',
        color: '#777',
        width: 80,
    },
    fechaAnchoFijo: {
        width: 10,
    },

    tarjetaClase: {
        fontSize: 14,
        color: '#023E8A',
        fontWeight: 'bold',
        marginRight: 20,
        // marginLeft: '30%'
    },
    horasContainer: {
        backgroundColor: '#12CDD4',
        alignItems: 'center',
        borderRadius: 4,
        padding: 4,
        width: '25%'
    },
    tarjetaHoras: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    botoneraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        paddingVertical: 8,
    },
    botoneraButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botoneraButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
});



export default Home;
