import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login App</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.text}>¿Eres un invitado? Ingresa aquí</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ingresar como invitado</Text>
      </TouchableOpacity>

      <Text style={styles.text}>¿No tienes cuenta? Regístrate aquí</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#00008B',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#cfcfcf',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#00008B',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  text: {
    marginVertical: 10,
  }
});
