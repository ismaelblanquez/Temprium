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
    const [fechafin, setFechafin] = useState('');
    const getEmail = async () => {
        const email = await AsyncStorage.getItem('email');
        setEmail(email || 'dummy@nosession.com'); // Establecer un valor predeterminado si email es nulo o indefinido
    }

    useEffect(() => {
        console.log("EMAIL:::" + email)
        getEmail();
    });

    const fechaInvertida = fecha.split('-').reverse().join('-');
    const fechafinInvertida =  fechafin.split('-').reverse().join('-');

    const guardarHoras = () => {
        // Lógica para guardar las horas en base de datos o enviar a servidor
        // Puedes acceder a los valores seleccionados en los estados correspondientes
        console.log('Tipo de Horas:', tipoHoras);
        console.log('Fecha:', fechaInvertida);
        console.log('Categoría:', categoria);
        console.log('Clase:', clase);
        console.log('FechaFin', fechafinInvertida)
        navigation.replace('Home', {
            tipoHoras: tipoHoras,
            fecha: fechaInvertida,
            categoria: categoria,
            clase: clase,
            fechafin:fechafinInvertida
        });
    };

    const getMarkedDates = () => {
        const markedDates = {};
    
        if (fecha) {
            markedDates[fecha] = { selected: true, selectedColor: '#0096C7' };
        }
    
        if (fechafin) {
            markedDates[fechafin] = { selected: true, selectedColor: '#0096C7' };
    
            const currentDate = new Date(fecha);
            while (currentDate <= new Date(fechafin)) {
                const dateString = currentDate.toISOString().split('T')[0];
                if (!markedDates[dateString]) {
                    markedDates[dateString] = { selected: true, selectedColor: '#0096C7' };
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    
        return markedDates;
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
    onDayPress={(day) => {
        if (!fecha || (fecha && fechafin)) {
            setFecha(day.dateString);
            setFechafin('');
        } else if (fecha && !fechafin) {
            if (new Date(day.dateString) >= new Date(fecha)) {
                setFechafin(day.dateString);
            } else {
                setFechafin(fecha);
                setFecha(day.dateString);
            }
        }
    }}
    markedDates={getMarkedDates()}
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
                    <Picker.Item label="1SA" value="1SA" />
                    <Picker.Item label="2SA" value="2SA" />
                    <Picker.Item label="1SV" value="1SV" />
                    <Picker.Item label="2SV" value="2SV" />
                    <Picker.Item label="1SC" value="1SC" />
                    <Picker.Item label="2SC" value="2SC" />
                    <Picker.Item label="1SI" value="1SI" />
                    <Picker.Item label="2SI" value="2SI" />
                    <Picker.Item label="1SW" value="1SW" />
                    <Picker.Item label="2SW" value="2SW" />
                    <Picker.Item label="1SE" value="1SE" />
                    <Picker.Item label="2SE" value="2SE" />
                    <Picker.Item label="1SR" value="1SR" />
                    <Picker.Item label="2SR" value="2SR" />
                    <Picker.Item label="1SM" value="1SM" />
                    <Picker.Item label="2SM" value="2SM" />
                    <Picker.Item label="1ST" value="1ST" />
                    <Picker.Item label="2ST" value="2ST" />
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
        // borderRadius: 8,
        // borderWidth: 2,
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
        fontSize: 30,
        fontWeight: 'bold',
        // textDecorationLine: 'underline',
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