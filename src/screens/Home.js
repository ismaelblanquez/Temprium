import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import BottomBar from '../components/BottomBar';
import { getAllHoras, deleteHoras, selectHoras, getCategoriasFiltro,getClasesFiltro,getTipoHorasFiltro } from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

// Componente de la pantalla Home
const Home = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [horasTotales, setHorasTotales] = useState(0);
    const [email, setEmail] = useState('');


    const getEmail = async () => {

        if (route.params) {
            const storedEmail = await AsyncStorage.getItem('email');
             const email = storedEmail || 'dummy@nosession.com';
            setEmail(email || 'dummy@nosession.com');
            const { tipoHoras, fecha, categoria, clase, fechafin } = route.params;
            selectHoras(tipoHoras, email, categoria, fecha, fechafin, clase)
                .then((results) => {
                    const todos = [];


                    results.forEach((item) => {
                        todos.push(item);
                    });
                    setData(todos);

                    const minutosTotales = todos.map((item) => item.Horas * 60 + item.minutos).reduce((acc, cur) => acc + cur, 0);
                    const horasTotales = Math.floor(minutosTotales / 60);
                    const minutosRestantes = minutosTotales % 60;
                    const tiempoTotal = `${horasTotales}h ${minutosRestantes}m`;
                    setHorasTotales(tiempoTotal);
                    setLoading(false);
                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
                });

        } else {
            const email = await AsyncStorage.getItem('email');
            setEmail(email || 'dummy@nosession.com'); // Establecer un valor predeterminado si email es nulo o indefinido
            getAllHoras(email || 'dummy@nosession.com') // Llamar getAllHoras dentro de getEmail
                .then((results) => {
                    const todos = [];


                    results.forEach((item) => {
                        todos.push(item);
                    });
                    setData(todos);

                    const minutosTotales = todos.map((item) => item.Horas * 60 + item.minutos).reduce((acc, cur) => acc + cur, 0);
                    const horasTotales = Math.floor(minutosTotales / 60);
                    const minutosRestantes = minutosTotales % 60;
                    const tiempoTotal = `${horasTotales}h ${minutosRestantes}m`;
                    setHorasTotales(tiempoTotal);

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    let generatePdf = async () => {
        const minutosTotales = data.map((item) => item.Horas * 60 + item.minutos).reduce((acc, cur) => acc + cur, 0);
        const horasTotales = Math.floor(minutosTotales / 60);
        const minutosRestantes = minutosTotales % 60;
        const tiempoTotal = `${horasTotales}h ${minutosRestantes}m`;

        const html = `
  <html>
    <head>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #0096C7;
          color: #FFFFFF;
        }
        tbody tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tfoot {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>Horas Realizadas</h1>
      <table>
        <thead>
          <tr>
            <th>Tipo de Horas</th>
            <th>Horas</th>
            <th>Minutos</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Clase</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((item) => `
            <tr>
              <td>${item.Tipohoras}</td>
              <td>${item.Horas}</td>
              <td>${item.minutos}</td>
              <td>${item.Categoria}</td>
              <td>${item.Dia}</td>
              <td>${item.Clase}</td>
            </tr>
          `).join('')}
          <tr>
            <td colspan="6" align="right"><strong>Total:</strong> ${tiempoTotal}</td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
`;

        const file = await printToFileAsync({
            html: html,
            base64: false
        });
        await shareAsync(file.uri);
    };



    const handleGraficosPress = () => {
        navigation.navigate('Graficos');
    };


    useEffect(() => {
    
        getEmail();
    }, []);

    const renderItem = ({ item }) => {

        return (
            <View style={styles.tarjetaContainer}>
                <View style={[styles.iconContainer, { backgroundColor: item.Tipohoras === "No Lectivas" ? "#8E44AD" : "#12CDD4" }]}>
                    <Text style={item.Tipohoras === "No Lectivas" ? [styles.iconNoLectiva] : styles.iconLectiva}>
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

                <View style={[styles.horasContainer, { backgroundColor: item.Tipohoras === "No Lectivas" ? "#8E44AD" : "#12CDD4" }]}>
                    <Text style={styles.tarjetaHoras}>{item.Horas}h {item.minutos}m</Text>
                </View>

                <TouchableOpacity onPress={() => {

                    deleteHoras(item.Id_hor);
                    navigation.replace('Home');
                }}>
                    <Image
                        style={styles.deleteButton}
                        source={require('../assets/images/delete.png')}
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
                    <Text style={styles.horasTotalesNumero}>{horasTotales}</Text>
                </View>
            </View>
            <View style={styles.alinearBoton}>
                <Text style={styles.recienteTitulo}>RECIENTE</Text>
                <TouchableOpacity onPress={generatePdf}>
                    <Image style={styles.pdfButton} source={require('../assets/images/share.png')} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.Id_hor.toString()}
                style={styles.flatList}
            />



            <BottomBar navigation={navigation} selectedTab="Home" />



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        // marginTop: '5%',
        // marginBottom: 50,
    },
    flatList: {
        marginBottom: 30, // Ajusta el valor según sea necesario
    },
    bottomBarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginBottom: 0,
    },
    headerContainer: {
        backgroundColor: '#E1F5FE',
        // borderRadius: 12,
        // borderWidth: 4,
        borderColor: '#0096C7',
        width: '80%',
        marginLeft: '9%',
        marginBottom: '10%',
        marginTop: '15%'
    },
    horasTotalesContainer: {
        alignItems: 'center',
    },
    horasTotalesTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0096C7',
    },
    bottomBarContainer: {
        // position: 'absolute',
        // bottom: 0,
        // width: '100%',
        // marginTop:'30%',
        // backgroundColor:'black'
    },
    horasTotalesNumero: {
        fontSize: 30,
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
        width: 35,
        height: 35,
    },
    recienteTitulo: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#0096C7',
        marginBottom: '10%',
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
        flex: 1,
        // numberOfLines: 1,
        fontWeight: 'bold',
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
    },
    horasContainer: {
        alignItems: 'center',
        borderRadius: 4,
        padding: 4,
        width: '25%',
    },
    tarjetaHoras: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default Home;
