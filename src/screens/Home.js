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
                console.log("resulttttts" + results);

                results.forEach((item) => {
                    todos.push(item);
                });
                setData(todos);
                const horas = todos.map((item) => item.Horas).reduce((acc, cur) => acc + cur, 0);
                const minutosTotales = todos.map((item) => item.Horas * 60 + item.minutos).reduce((acc, cur) => acc + cur, 0);
                const horasTotales = minutosTotales / 60;

                console.log("Horas totales: " + horasTotales)
                setHorasTotales(horasTotales.toFixed(1));
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


    const renderItem = ({ item }) => {
        console.log("item: " + item);
        return (
            <View style={styles.tarjetaContainer}>
                <View style={styles.iconContainer}>
                <Text style={item.Tipohoras === "No Lectivas" ? [styles.iconNoLectiva, {horasContainer: '#8E44AD', horasContainer:'#8E44AD'}] : styles.iconLectiva}>
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
                    <Text style={styles.tarjetaHoras}>{(item.Horas + item.minutos / 60).toFixed(1)} H</Text>
                </View>
                <TouchableOpacity  onPress={() => { console.log("prueba"); deleteHoras(item.Id_hor); navigation.replace('Home')}}>
                <Image
                    style={styles.deleteButton}
                    source={require('../assets/images/remove.png')}
                />
                </TouchableOpacity>
            </View>
        );
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
                <TouchableOpacity style={styles.pdfButton} onPress={() => { console.log("prueba"); deleteHoras(); navigation.replace('Home')}}>
                    <Image source={require('../assets/images/share.png')} />
                </TouchableOpacity>

            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.Id_hor.toString()}
            />

            <BottomBar navigation={navigation} />
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
    deleteButton: {
        padding: 8,
        borderRadius: 4,
        width: 30,
        height: 30,
        marginLeft: 20,
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
