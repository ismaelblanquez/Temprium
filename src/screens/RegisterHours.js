import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import BottomBar from '../components/BottomBar';
import { db, addHoras } from '../DataBase/Conexion';



const RegisterHoursScreen = ({navigation}) => {
const [tipoHoras, setTipoHoras] = useState('');
const [horas, setHoras] = useState('1');
const [minutos, setMinutos] = useState('0');
const [categoria, setCategoria] = useState('');
const [clase, setClase] = useState('');

  const guardarHoras = () => {
    // Lógica para guardar las horas en base de datos o enviar a servidor
    // Puedes acceder a los valores seleccionados en los estados correspondientes
    console.log('Tipo de Horas:', tipoHoras);
    console.log('Horas Trabajadas:', horas);
    console.log('Minutos Trabajados:', minutos);
    console.log('Categoría:', categoria);
    console.log('Clase:', clase);

    addHoras('ismaelblanquez', tipoHoras, horas, minutos, categoria, '01/01/2000',  clase);

    
  };

return (
<View style={styles.container}>
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
onValueChange={(value) => setTipoHoras(value)}>
<Picker.Item label="Lectivas" value="Lectivas" />
<Picker.Item label="No Lectivas" value="No Lectivas" />
</Picker>
</View>

<View style={styles.componente}>
  <Text style={styles.label}>HORAS TRABAJADAS</Text>
  <View style={styles.pickerContainer}>
    <Picker
      style={[styles.picker, { flex: 1, marginRight: 4 }]}
      selectedValue={horas}
      onValueChange={(value) => setHoras(value)}>
      {[...Array(12)].map((_, index) => (
        <Picker.Item
          key={index}
          label={String(index)}
          value={String(index)}
        />
      ))}
    </Picker>
    <Text style={styles.hourMin}>h</Text>
    <Picker
      style={[styles.picker, { flex: 1, marginLeft: '5%' }]}
      selectedValue={minutos}
      onValueChange={(value) => setMinutos(value)}>
      {[...Array(12)].map((_, index) => (
        <Picker.Item
          key={index}
          label={String(index * 5)}
          value={String(index * 5)}
        />
      ))}
    </Picker>
    <Text style={styles.hourMin}>min</Text>
  </View>
</View>

<View style={styles.componente}>
  <Text style={styles.label}>CATEGORÍAS</Text>
  <Picker
    style={styles.picker}
    selectedValue={categoria}
    onValueChange={(value) => setCategoria(value)}>
    <Picker.Item label="Ninguna" value="" />
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
    <Picker.Item label="1SI" value="1SI" />
    <Picker.Item label="2SI" value="2SI" />
  </Picker>
</View>
<View style={styles.buttonContainer}>

<TouchableOpacity style={styles.button} onPress={guardarHoras}>
<Text style={styles.buttonText}>GUARDAR</Text>
</TouchableOpacity>
</View>

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
tituloContainer: {
alignItems: 'center',
padding: '4%'
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
pickerContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 16,
width: '70%',
},
hourMin: {
fontSize: 16,
alignSelf: 'center',
color: '#0096C7'
},
button: {
backgroundColor: '#0096C7',
alignItems:'center',
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

export default RegisterHoursScreen;