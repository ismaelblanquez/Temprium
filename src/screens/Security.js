import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

function Seguridad() {
  const [contrasena, setContrasena] = useState('');
  const [contrasenaAnterior, setContrasenaAnterior] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [autenticacionDosFactores, setAutenticacionDosFactores] =
    useState(false);

  const handleChangeContrasena = (text) => {
    setContrasena(text);
  };

  const handleChangeContrasenaAnterior = (text) => {
    setContrasenaAnterior(text);
  };

  const handleChangeConfirmarContrasena = (text) => {
    setConfirmarContrasena(text);
  };

  const toggleAutenticacionDosFactores = () => {
    setAutenticacionDosFactores(!autenticacionDosFactores);
  };

  const handleGuardarCambios = () => {
    // Lógica para guardar los cambios de seguridad en la aplicación
    // Aquí puedes realizar llamadas a API, actualizar el estado de la aplicación, etc.
    console.log('Contraseña actualizada:', contrasena);
    console.log('Contraseña anterior:', contrasenaAnterior);
    console.log('Confirmar contraseña:', confirmarContrasena);
    console.log('Autenticación de dos factores:', autenticacionDosFactores);
    Alert.alert("Esta funcion no esta implementada en esta fase del desarrollo");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>SEGURIDAD</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña anterior"
          secureTextEntry
          value={contrasenaAnterior}
          onChangeText={handleChangeContrasenaAnterior}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña nueva"
          secureTextEntry
          value={contrasena}
          onChangeText={handleChangeContrasena}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmarContrasena}
          onChangeText={handleChangeConfirmarContrasena}
        />
        <View style={styles.optionContainer}>
          {/* <Text style={styles.optionText}>Autenticación de dos factores</Text>
          <Switch
            trackColor={{ true: '#0096C7', false: '#E1F5FE' }}
            value={autenticacionDosFactores}
            onValueChange={toggleAutenticacionDosFactores}
            thumbColor={autenticacionDosFactores ? '#E1F5FE' : '#0096C7'}
          /> */}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
        <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
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
    padding: '4%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0096C7',
  },
  inputContainer: {
    marginBottom: 30,
    width: '80%',
    marginLeft: '9%',
  },
  input: {
    height: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#1A1A1A', //#1A1A1A
    paddingHorizontal: 10,
    marginBottom: 20,
    placeholderTextColor: "#BDBDBD",
    color: '#1A1A1A',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0096C7',
    alignItems: 'center',
    padding: '3%',
    width: '80%',
    borderRadius: 8,
    marginBottom: '15%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Seguridad;