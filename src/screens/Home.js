import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import BottomBar from '../components/BottomBar';
import { addHoras, getIdUsuario, getAllHoras } from '../DataBase/Conexion';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('Temprium.db');
// Componente de la pantalla Home
const Home = ({ navigation }) => {
    const [data, setData] = useState([]);
    // const data = [
    //     { Id_usu: 1, Tipohoras: 'No Lectiva', Categoria: 'CORREGIR EXAMEN', Dia: '10/04/2023', Clase: '2SI', Horas: '+3,0 H' },
    //     { Id_usu: 2, Tipohoras: 'Lectiva', Categoria: 'CLASE NORMAL', Dia: '09/04/2023', Clase: '1SI', Horas: '+1,0 H' },
    //     { Id_usu: 3, Tipohoras: 'No Lectiva', Categoria: 'REUNIÓN', Dia: '08/04/2023', Clase: '2SI', Horas: '+2,5 H' },
    //     { Id_usu: 4, Tipohoras: 'Lectiva', Categoria: 'CLASE NORMAL', Dia: '07/04/2023', Clase: '2SI', Horas: '+1 H' },
    //     { Id_usu: 5, Tipohoras: 'Lectiva', Categoria: 'CLASE NORMAL', Dia: '07/04/2023', Clase: '1SI', Horas: '+0,2 H' },
    // ];

    getAllHoras("ismaelblanquez@hotmail.com")
       .then((results)=> console.log("Datos introducidos correctamente" + JSON.stringify(results.rows[1])) );
            

    const renderItem = ({ item }) => {
        // console.log("item: " + item);
        return (
            <View style={styles.tarjetaContainer}>
                <View style={styles.iconContainer}>
                    <Text style={item.Tipohoras === 'No Lectiva' ? styles.iconNoLectiva : styles.iconLectiva}>
                        {item.Tipohoras === 'No Lectiva' ? 'NL' : 'L'}
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.tarjetaTitulo}>{item.Categoria}</Text>
                    <View style={styles.datosContainer}>
                        <Text style={styles.tarjetaFecha}>{item.Dia}</Text>
                        <Text style={styles.tarjetaClase}>{item.Clase}</Text>
                    </View>
                </View>
                <View style={styles.horasContainer}>
                    <Text style={styles.tarjetaHoras}>{item.Horas}</Text>
                </View>
            </View>
        );
    };
 
    return (
        
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.horasTotalesContainer}>
                    <Text style={styles.horasTotalesTitulo}>HORAS REALIZADAS:</Text>
                    <Text style={styles.horasTotalesNumero}>100</Text>
                </View>
            </View>
            <View style={styles.alinearBoton}>
                <Text style={styles.recienteTitulo}>RECIENTE</Text>
                <Image style={styles.pdfButton} source={require('../assets/images/share.png')} />
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.Id_usu.toString() } />

            <BottomBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        marginTop: '5%'
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
        alignItems: 'start',
        flex: 1,
        marginLeft: '4%',
        marginBottom: '4%',

    },
    datosContainer: {
        flexDirection: 'row',
    },
    tarjetaTitulo: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#023E8A',
    },
    tarjetaFecha: {
        fontSize: 14,
        color: '#023E8A',
        fontWeight: 'bold',
    },
    tarjetaClase: {
        fontSize: 14,
        color: '#023E8A',
        fontWeight: 'bold',
        marginLeft: '30%'
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