import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BottomBar from '../components/BottomBar';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { selectHoras } from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from '@react-native-picker/picker';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';

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
  };

  useEffect(() => {
    getEmail();
  }, []);

  const fechaInvertida = fecha.split('-').reverse().join('-');
  const fechafinInvertida = fechafin.split('-').reverse().join('-');

  const guardarHoras = () => {
    console.log('Tipo de Horas:', tipoHoras);
    console.log('Fecha:', fechaInvertida);
    console.log('Categoría:', categoria);
    console.log('Clase:', clase);
    console.log('FechaFin', fechafinInvertida);
    navigation.replace('Home', {
      tipoHoras: tipoHoras,
      fecha: fechaInvertida,
      categoria: categoria,
      clase: clase,
      fechafin: fechafinInvertida,
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

    
  // Resaltar los días sábado y domingo
  const today = new Date();
  const currentYear = today.getFullYear();
  const startDate = new Date(currentYear, 0, 1); // Comenzar desde el 1 de enero del año actual
  const endDate = new Date(currentYear, 11, 31); // Terminar en el 31 de diciembre del año actual

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    const dayOfWeek = currentDate.getDay();

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        markedDates[dateString] = { selected: true, selectedTextColor: 'red' , selectedColor: 'white' };
      }
    currentDate.setDate(currentDate.getDate() + 1);
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
            <Picker.Item label="Reuniones de Departamento" value="Reuniones de Departamento" />
            <Picker.Item
              label="Reuniones de Equipos Educativos"
              value="Reuniones de Equipos Educativos"
            />
            <Picker.Item label="Reuniones de Padres" value="Reuniones de Padres" />
            <Picker.Item label="Atención a Padres" value="Atención a Padres" />
            <Picker.Item label="Atención personal a alumnos" value="Atención personal a alumnos" />
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
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={guardarHoras}>
                    <Text style={styles.buttonText}>GUARDAR</Text>
                </TouchableOpacity>
            </View>
            <BottomBar navigation={navigation} selectedTab="FilterHours" />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#FFFFFF',
  },
  headerContainer: {
      backgroundColor: '#E1F5FE',
      width: '80%',
      marginLeft: '9%',
      marginBottom: '10%',
      marginTop: '15%'
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
  buttonContainer: {
      alignItems: 'center',
      // marginBottom: 5, // Espacio entre el botón y el contenido
      // marginTop: 50,
  },
  scrollViewContainer: {
      flexGrow: 1,
      // paddingBottom: 100, // Espacio para el botón de guardar
      // marginBottom: 500,
  },
  spacer: {
      // height: '100%', // Llena todo el espacio disponible
  },
  buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
  },
});

export default FilterHoursScreen;