import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BottomBar from '../components/BottomBar';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { getCategoriasFiltro, getClasesFiltro, getTipoHorasFiltro } from '../DataBase/Conexion';
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
  dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
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
  const [selectedTipoHora, setSelectedTipoHora] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState([]);
  const [selectedClase, setSelectedClase] = useState([]);

  const getEmail = async () => {
    const email = await AsyncStorage.getItem('email');
    setEmail(email || 'dummy@nosession.com'); // Establecer un valor predeterminado si email es nulo o indefinido
  };

  useEffect(() => {
    getEmail();
    obtenerDatos();
  }, []);

  const guardarHoras = () => {

    navigation.replace('Home', {
      tipoHoras: tipoHoras,
      fecha: fecha,
      categoria: categoria,
      clase: clase,
      fechafin: fechafin,
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
        markedDates[dateString] = { selected: true, selectedTextColor: 'red', selectedColor: 'white' };
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
    return markedDates;
  };

  const obtenerDatos = async () => {
    try {
      const categoriasDB = await getCategoriasFiltro();
      setSelectedCategoria(categoriasDB);
      const clasesDB = await getClasesFiltro();
      setSelectedClase(clasesDB);
      const TipoHorasDB = await getTipoHorasFiltro();
      setSelectedTipoHora(TipoHorasDB);
    } catch (error) {
      console.log(`Error obtencion de datos de la base de datos: ${error}`)
    }
  }

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
            {selectedTipoHora.map((tipoHora) => (<Picker.Item key={tipoHora.Id_tHoras} value={tipoHora.nombre === "Todas" ? '' : tipoHora.nombre} label={tipoHora.nombre} />))}
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
            {selectedCategoria.map((cat) => (<Picker.Item key={cat.Id_Categorias} label={cat.nombre} value={cat.nombre === "Todas" ? '' : cat.nombre} />))}
          </Picker>
        </View>

        <View style={styles.componente}>
          <Text style={styles.label}>CLASE</Text>
          <Picker
            style={styles.picker}
            selectedValue={clase}
            onValueChange={(value) => setClase(value)}>
            {selectedClase.map((cla) => (<Picker.Item key={cla.Id_Clases} label={cla.nombre} value={cla.nombre === "Todas" ? '' : cla.nombre} />))}
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