import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput, Alert } from 'react-native';
import BottomBar from '../components/BottomBar';
import RegisterHours from '../screens/RegisterHours';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Temprium.db');

const Home = ({ navigation }) => {
    const [tarjetas, setTarjetas] = useState([
        { id: 1, tipo: 'No Lectiva', titulo: 'CORREGIR EXAMEN', fecha: '10/04/2023', clase: '2SI', horas: 3 },
        { id: 2, tipo: 'Lectiva', titulo: 'CLASE NORMAL', fecha: '09/04/2023', clase: '1SI', horas: 1 },
        { id: 3, tipo: 'No Lectiva', titulo: 'REUNIÓN', fecha: '08/04/2023', clase: '2SI', horas: 2.5 },
        { id: 4, tipo: 'Lectiva', titulo: 'CLASE NORMAL', fecha: '07/04/2023', clase: '2SI', horas: 1 },
        { id: 5, tipo: 'Lectiva', titulo: 'CLASE NORMAL', fecha: '07/04/2023', clase: '1SI', horas: 0.2 },
    ]);
    const [totalHoras, setTotalHoras] = useState(8.7);
    const [modalVisible, setModalVisible] = useState(false);
    const [nuevaTarjeta, setNuevaTarjeta] = useState({ tipo: '', titulo: '', fecha: '', clase: '', horas: '' });

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
        return (
            <View style={styles.tarjeta}>
                <View style={styles.tarjetaHeader}>
                    <Text style={styles.tipoTarjeta}>{item.tipo}</Text>
                    <TouchableOpacity onPress={() => eliminarTarjeta(item)}>
                        <Image style={styles.iconoEliminar} source={require('../assets/images/remove.png')} />
                    </TouchableOpacity>
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Temprium</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image style={styles.iconoAgregar} source={require('../assets/images/plus.png')} />
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
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    iconoAgregar: {

        width: 30,
        height: 30,
    },
    listaTarjetas: {
        paddingHorizontal: 20,
    },
    tarjeta: {
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tarjetaHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    tipoTarjeta: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007aff',
    },
    iconoEliminar: {
        width: 20,
        height: 20,
    },
    tituloTarjeta: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    fechaTarjeta: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    claseTarjeta: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    horasTarjeta: {
        fontSize: 16,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalHoras: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    modalTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    boton: {
        backgroundColor: '#007aff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    botonCancelar: {
        backgroundColor: '#ccc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Home;
