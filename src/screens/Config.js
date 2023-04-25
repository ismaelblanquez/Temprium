import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Config({ navigation }) {
const abrirConfiguracionPerfil = () => {
// Navegar a la pantalla de configuración de perfil
navigation.navigate('ConfiguracionPerfil');
};

const abrirNotificaciones = () => {
// Navegar a la pantalla de notificaciones
navigation.navigate('Notificaciones');
};

const abrirPrivacidad = () => {
// Navegar a la pantalla de privacidad
navigation.navigate('Privacidad');
};

const abrirSeguridad = () => {
// Navegar a la pantalla de seguridad
navigation.navigate('Seguridad');
};

const abrirIdioma = () => {
// Navegar a la pantalla de idioma
navigation.navigate('Idioma');
};

const abrirTema = () => {
// Navegar a la pantalla de tema
navigation.navigate('Tema');
};

return (
<View style={styles.container}>
<Text style={styles.text}>Ajustes</Text>
<TouchableOpacity style={styles.opcion} onPress={abrirConfiguracionPerfil}>
<Text style={styles.label}>Configuración de perfil</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.opcion} onPress={abrirNotificaciones}>
<Text style={styles.label}>Notificaciones</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.opcion} onPress={abrirPrivacidad}>
<Text style={styles.label}>Privacidad</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.opcion} onPress={abrirSeguridad}>
<Text style={styles.label}>Seguridad</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.opcion} onPress={abrirIdioma}>
<Text style={styles.label}>Idioma</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.opcion} onPress={abrirTema}>
<Text style={styles.label}>Tema</Text>
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
text: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 16,
},
opcion: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 16,
},
label: {
fontSize: 16,
},
});

export default Config;