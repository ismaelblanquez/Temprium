import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';

const RegisterHoursScreen = () => {
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
};

return (
<View style={styles.container}>
<Text style={styles.label}>Tipo de Horas:</Text>
<Picker
style={styles.picker}
selectedValue={tipoHoras}
onValueChange={(value) => setTipoHoras(value)}>
<Picker.Item label="Lectivas" value="Lectivas" />
<Picker.Item label="No Lectivas" value="No Lectivas" />
</Picker>

  <Text style={styles.label}>Horas Trabajadas:</Text>
  <View style={styles.pickerContainer}>
    <Picker
      style={[styles.picker, { flex: 1, marginRight: 8 }]}
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
    <Text style={{ fontSize: 16, alignSelf: 'center' }}>horas</Text>
    <Picker
      style={[styles.picker, { flex: 1, marginLeft: 8 }]}
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
    <Text style={{ fontSize: 16, alignSelf: 'center' }}>minutos</Text>
  </View>

  <Text style={styles.label}>Categoría:</Text>
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
  <Text style={styles.label}>Clase:</Text>
  <Picker
    style={styles.picker}
    selectedValue={clase}
    onValueChange={(value) => setClase(value)}>
    <Picker.Item label="1SI" value="1SI" />
    <Picker.Item label="2SI" value="2SI" />
  </Picker>
<View style={styles.buttonContainer}>

<TouchableOpacity style={styles.button} onPress={guardarHoras}>
<Text style={styles.buttonText}>Guardar</Text>
</TouchableOpacity>

</View>

</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 16,
backgroundColor: '#FFFFFF',
},
label: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 8,
},
picker: {
height: 40,
borderRadius: 4,
borderWidth: 1,
borderColor: '#CCCCCC',
marginBottom: 16,
},
pickerContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 16,
},
button: {
height: 40,
backgroundColor: '#2196F3',
justifyContent: 'center',
alignItems: 'center',
borderRadius: 4,
marginBottom: 16,
},
buttonText: {
color: '#FFFFFF',
fontSize: 16,
fontWeight: 'bold',
}

});

export default RegisterHoursScreen;