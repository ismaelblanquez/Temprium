import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BottomBar from '../components/BottomBar';
import { addHoras, getIdUsuario } from '../DataBase/Conexion';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from '@react-native-picker/picker';

const RegisterHoursScreen = ({ navigation }) => {
  const [tipoHoras, setTipoHoras] = useState('Lectivas');
  const [horas, setHoras] = useState('1');
  const [minutos, setMinutos] = useState('0');
  const [categoria, setCategoria] = useState('Ninguna');
  const [clase, setClase] = useState('1SI');
  const fechaActual = new Date();
  const dia = fechaActual.getDate().toString().padStart(2, '0');
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const anio = fechaActual.getFullYear();
  const diaActual = `${dia}-${mes}-${anio}`;

  const [email, setEmail] = useState('');

  const getEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      setEmail(email || 'dummy@nosession.com');
    } catch (error) {
      console.log(`Error getting email from AsyncStorage: ${error}`);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  const guardarHoras = () => {
    console.log('Tipo de Horas:', tipoHoras);
    console.log('Horas Trabajadas:', horas);
    console.log('Minutos Trabajados:', minutos);
    console.log('Categoría:', categoria);
    console.log('Clase:', clase);
    console.log('Día:', diaActual);
    console.log('Email', email);

    getIdUsuario(email, (id) => {
      console.log('IIIIIIDDDDD', id);
      addHoras(id, tipoHoras, horas, minutos, categoria, diaActual, clase)
        .then((results) => {
          // const idHoras = results.insertId;
          console.log(results.rows);
          console.log(
            `Valores de los parámetros: Usuario=${id}, Tipohoras=${tipoHoras}, Horas=${horas}, minutos=${minutos}, Categoria=${categoria}, Dia=${diaActual}, Clase=${clase}`
          );
          navigation.replace('Home');
        })
        .catch((error) => console.log(`Error al registrar usuario: ${error.message}`));
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.tituloContainer}>
            <Text style={styles.titulo}>AÑADIR HORAS</Text>
          </View>
        </View>
        <View style={styles.componente}>
          <Text style={styles.label}>TIPO DE HORAS</Text>
          <Picker
            style={styles.picker}
            selectedValue={tipoHoras}
            onValueChange={(value) => setTipoHoras(value)}
          >
            <Picker.Item label="Lectivas" value="Lectivas" />
            <Picker.Item label="No Lectivas" value="No Lectivas" />
          </Picker>
        </View>

        <View style={[styles.componente, { }]}>
          <Text style={styles.label}>HORAS TRABAJADAS</Text>
          <View style={[styles.pickerContainer, {  }]}>
            <Picker
              style={[styles.picker, { width: '80%' }]}
              selectedValue={horas}
              onValueChange={(value) => setHoras(value)}
            >
              {[...Array(12)].map((_, index) => (
                <Picker.Item key={index} label={String(index)} value={String(index)} />
              ))}
            </Picker>
            <Text style={[styles.hourMin, { fontSize: 20 }]}> </Text>
          </View>
          <Text style={styles.label}>MINUTOS TRABAJADOS</Text>
          <View style={[styles.pickerContainer, { }]}>
            <Picker
              style={[styles.picker, { width: '80%' }]}
              selectedValue={minutos}
              onValueChange={(value) => setMinutos(value)}
            >
              {[...Array(12)].map((_, index) => (
                <Picker.Item
                  key={index}
                  label={String(index * 5)}
                  value={String(index * 5)}
                />
              ))}
            </Picker>

            <Text style={[styles.hourMin, { fontSize: 20 }]}></Text>
          </View>
        </View>

        <View style={styles.componente}>
          <Text style={styles.label}>CATEGORÍAS</Text>
          <Picker
            style={styles.picker}
            selectedValue={categoria}
            onValueChange={(value) => setCategoria(value)}
          >
            <Picker.Item label="Ninguna" value=" " />
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
            onValueChange={(value) => setClase(value)}
          >
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
        <View style={styles.spacer} /> 
        </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={guardarHoras}>
          <Text style={styles.buttonText}>GUARDAR</Text>
        </TouchableOpacity>
      </View>
      <BottomBar navigation={navigation} selectedTab="RegisterHours" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    // marginBottom:50,
  },
  scrollViewContainer: {
    // flexGrow: 1,
    // paddingBottom: 100, // Espacio para el botón de guardar
    // marginBottom: 500,
  },
  spacer: {
    // height: '100%', // Llena todo el espacio disponible
  },
  headerContainer: {
    backgroundColor: '#E1F5FE',
    width: '80%',
    marginLeft: '9%',
    marginBottom: '10%',
    marginTop: '15%',
  },
  tituloContainer: {
    alignItems: 'center',
    padding: '4%',
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
    marginBottom: '10%',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 16,
    // marginTop:10,
    width: '70%',
    justifyContent: 'center',
  },
  hourMin: {
    fontSize: 16,
    // alignSelf: 'center',
    color: '#0096C7',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
 
  button: {
    backgroundColor: '#0096C7',
    alignItems: 'center',
    padding: '5%',
    width: '80%',
    borderRadius: 8,
    // position: 'absolute',
    marginBottom: '15%',
    
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    // marginBottom: 5, // Espacio entre el botón y el contenido
    // marginTop:50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterHoursScreen;
