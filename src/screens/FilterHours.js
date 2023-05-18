import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, DatePickerAndroid, ScrollView } from 'react-native';
import BottomBar from '../components/BottomBar';
import { Calendar } from 'react-native-calendars';
import { selectHoras } from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Picker} from '@react-native-picker/picker';

const FilterHoursScreen = ({ navigation }) => {
    const [tipoHoras, setTipoHoras] = useState('');
    const [fecha, setFecha] = useState('');
    const [categoria, setCategoria] = useState('');
    const [clase, setClase] = useState('');
    const [email, setEmail] = useState('');
    const getEmail = async () => {
        const email = await AsyncStorage.getItem('email');
        setEmail(email || 'dummy@nosession.com'); // Establecer un valor predeterminado si email es nulo o indefinido
    }

    useEffect(() => {
        console.log("EMAIL:::" + email)
        getEmail();
    });

    const fechaInvertida = fecha.split('-').reverse().join('-');

    const guardarHoras = () => {
        // Lógica para guardar las horas en base de datos o enviar a servidor
        // Puedes acceder a los valores seleccionados en los estados correspondientes
        console.log('Tipo de Horas:', tipoHoras);
        console.log('Fecha:', fechaInvertida);
        console.log('Categoría:', categoria);
        console.log('Clase:', clase);
        navigation.replace('Home', {
            tipoHoras: tipoHoras,
            fecha: fechaInvertida,
            categoria: categoria,
            clase: clase
        });
    };

    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.tituloContainer}>
                    <Text style={styles.titulo}>FILTRAR HORAS</Text>
                </View>
            </View>
            <View style={styles.componente}>
                <Text style={styles.label}>TIPO DE HORAS</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={tipoHoras}
                    onValueChange={(value) => setTipoHoras(value)}>
                    <Picker.Item label="Todas" value="" />
                    <Picker.Item label="Lectivas" value="Lectivas" />
                    <Picker.Item label="No Lectivas" value="No Lectivas" />
                </Picker>
            </View>

            <View style={styles.componente}>
                <Text style={styles.label}>FECHA</Text>
                <Calendar
                    onDayPress={(day) => setFecha(day.dateString)}
                    markedDates={{ [fecha]: { selected: true, selectedColor: '#0096C7' } }}
                />
            </View>

            <View style={styles.componente}>
                <Text style={styles.label}>CATEGORÍAS</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={categoria}
                    onValueChange={(value) => setCategoria(value)}>
                    <Picker.Item label="Todas" value="" />
                    <Picker.Item label="Impartir clases" value="Impartir clases" />
                    <Picker.Item label="Preparar clases" value="Preparar clases" />
                    <Picker.Item label="Corregir" value="Corregir" />
                    <Picker.Item label="Retos" value="Retos" />
                    <Picker.Item
                        label="Reuniones de Departamento"
                        value="Reuniones de Departamento"
                    />
                    <Picker.Item
                        label="Reuniones de Equipos Educativos"
                        value="Reuniones de Equipos Educativos"
                    />
                    <Picker.Item label="Reuniones de Padres" value="Reuniones de Padres" />
                    <Picker.Item label="Atención a Padres" value="Atención a Padres" />
                    <Picker.Item
                        label="Atención personal a alumnos"
                        value="Atención personal a alumnos"
                    />
                </Picker>
            </View>




            <View style={styles.componente}>
                <Text style={styles.label}>CLASE</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={clase}
                    onValueChange={(value) => setClase(value)}>
                    <Picker.Item label="Todas" value="" />
                    <Picker.Item label="1SI" value="1SI" />
                    <Picker.Item label="2SI" value="2SI" />
                </Picker>
            </View>
            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={guardarHoras}>
                    <Text style={styles.buttonText}>GUARDAR</Text>
                </TouchableOpacity>
            </View>


        </ScrollView>
            <BottomBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        // marginTop: '5%'
    },
    headerContainer: {
        backgroundColor: '#E1F5FE',
        borderRadius: 12,
        borderWidth: 4,
        borderColor: '#0096C7',
        width: '80%',
        marginLeft: '9%',
        marginBottom: '10%',
        marginTop:'15%'
    },
    tituloContainer: {
        alignItems: 'center',
        padding: '4%'
    },
    scrollViewContainer: {
        flexGrow: 1,
      },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0096C7',
    },
    componente: {
        borderColor: '#0096C7',
        borderWidth: 2,
        alignItems: 'center',
        width: '80%',
        marginLeft: '9%',
        marginBottom: '10%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#0096C7',
    },
    picker: {
        backgroundColor: '#0096C7',
        borderWidth: 1,
        borderColor: '#0096C7',
        color: '#FFFFFF',
        width: '60%',
        height: 40,
        borderRadius: 4,
        marginBottom: '8%',
        // alignText: 'center'
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    button: {
        backgroundColor: '#0096C7',
        alignItems: 'center',
        padding: '5%',
        width: '80%',
        borderRadius: 8,
        marginBottom: '15%',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default FilterHoursScreen;