import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import BottomBar from './BottomBar';

// Componente de la botonera para navegar entre pantallas
const Botonera = ({ onPressHome, onPressPantalla2, onPressPantalla3 }) => {
return (
<View style={styles.botoneraContainer}>
<TouchableOpacity style={styles.botoneraButton} onPress={onPressHome}>
<Text style={styles.botoneraButtonText}>Home</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.botoneraButton} onPress={onPressPantalla2}>
<Text style={styles.botoneraButtonText}>Pantalla 2</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.botoneraButton} onPress={onPressPantalla3}>
<Text style={styles.botoneraButtonText}>Pantalla 3</Text>
</TouchableOpacity>
</View>
);
};

// Componente de la pantalla Home
const HomeScreen = () => {
const data = [
{ id: 1, tipo: 'No Lectiva', titulo: 'Tarjeta 1', categoria: 'Categoria 1', fecha: '10/04/2023', clase: 'Clase 1', horas: '2 horas' },
{ id: 2, tipo: 'Lectiva', titulo: 'Tarjeta 2', categoria: 'Categoria 2', fecha: '09/04/2023', clase: 'Clase 2', horas: '1 hora' },
{ id: 3, tipo: 'No Lectiva', titulo: 'Tarjeta 3', categoria: 'Categoria 3', fecha: '08/04/2023', clase: 'Clase 3', horas: '3 horas' },
];

const renderItem = ({ item }) => {
return (
<View style={styles.tarjetaContainer}>
<View style={styles.iconContainer}>
<Text style={item.tipo === 'No Lectiva' ? styles.iconNoLectiva : styles.iconLectiva}>
{item.tipo === 'No Lectiva' ? 'NL' : 'L'}
</Text>
</View>
<View style={styles.infoContainer}>
<Text style={styles.tarjetaTitulo}>{item.titulo}</Text>
<Text style={styles.tarjetaCategoria}>Categoria: {item.categoria}</Text>
<Text style={styles.tarjetaFecha}>Fecha: {item.fecha}</Text>
</View>
<View style={styles.horasContainer}>
<Text style={styles.tarjetaClase}>{item.clase}</Text>
<Text style={styles.tarjetaHoras}>{item.horas}</Text>
</View>
</View>
);
};

return (
<View style={styles.container}>
<View style={styles.headerContainer}>
<View style={styles.horasTotalesContainer}>
<Text style={styles.horasTotalesTitulo}>Horas Totales</Text>
<Text style={styles.horasTotalesNumero}>100</Text>
</View>
<TouchableOpacity style={styles.pdfButton}>
<Text style={styles.pdfButtonText}>Compartir PDF</Text>
</TouchableOpacity>
</View>
<Text style={styles.recienteTitulo}>Reciente</Text>
<FlatList
data={data}
renderItem={renderItem}
keyExtractor={(item) => item.id.toString()} />

<BottomBar />
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
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginBottom: 16,
},
horasTotalesContainer: {
alignItems: 'center',
},
horasTotalesTitulo: {
fontSize: 16,
fontWeight: 'bold',
color: '#000000',
},
horasTotalesNumero: {
fontSize: 24,
fontWeight: 'bold',
color: '#000000',
},
pdfButton: {
padding: 8,
backgroundColor: '#007AFF',
borderRadius: 8,
},
pdfButtonText: {
fontSize: 14,
fontWeight: 'bold',
color: '#FFFFFF',
},
recienteTitulo: {
fontSize: 20,
fontWeight: 'bold',
color: '#000000',
marginBottom: 8,
},
tarjetaContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 16,
},
iconContainer: {
width: 32,
height: 32,
backgroundColor: '#EFEFEF',
borderRadius: 16,
justifyContent: 'center',
alignItems: 'center',
},
iconNoLectiva: {
fontSize: 18,
color: '#FF0000',
},
iconLectiva: {
fontSize: 18,
color: '#00FF00',
},
infoContainer: {
flex: 1,
marginLeft: 8,
},
tarjetaTitulo: {
fontSize: 16,
fontWeight: 'bold',
color: '#000000',
},
tarjetaCategoria: {
fontSize: 14,
color: '#777777',
},
tarjetaFecha: {
fontSize: 14,
color: '#777777',
},
horasContainer: {
alignItems: 'flex-end',
},
tarjetaClase: {
fontSize: 14,
color: '#000000',
},
tarjetaHoras: {
fontSize: 16,
fontWeight: 'bold',
color: '#007AFF',
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

export default HomeScreen;