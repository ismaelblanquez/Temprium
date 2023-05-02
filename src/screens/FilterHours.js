import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import BottomBar from '../components/BottomBar';


const FilterHoursScreen = ({ navigation }) => {
    const [tipoHoras, setTipoHoras] = useState('');
    const [dia, setDia] = useState('1');
    const [mes, setMes] = useState('1');
    const [categoria, setCategoria] = useState('');
    const [clase, setClase] = useState('');

    const guardarHoras = () => {
        // Lógica para guardar las horas en base de datos o enviar a servidor
        // Puedes acceder a los valores seleccionados en los estados correspondientes
        console.log('Tipo de Horas:', tipoHoras);
        console.log('Día:', dia);
        console.log('Mes:', mes);
        console.log('Categoría:', categoria);
        console.log('Clase:', clase);
    };

    return (
        <View style={styles.container}>
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
                    <Picker.Item label="Lectivas" value="Lectivas" />
                    <Picker.Item label="No Lectivas" value="No Lectivas" />
                </Picker>
            </View>

            <View style={styles.componente}>
                <Text style={styles.label}>FECHA</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={[styles.picker, { flex: 1, marginRight: 4 }]}
                        selectedValue={dia}
                        onValueChange={(value) => setDia(value)}>
                        {[...Array(31)].map((_, index) => (
                            <Picker.Item
                                key={index}
                                label={String(index + 1)}
                                value={String(index + 1)}
                            />
                        ))}
                    </Picker>
                    <Text style={styles.diaMes}>/</Text>
                    <Picker
                        style={[styles.picker, { flex: 1, marginLeft: '5%' }]}
                        selectedValue={mes}
                        onValueChange={(value) => setMes(value)}>
                        {[...Array(12)].map((_, index) => (
                            <Picker.Item
                                key={index}
                                label={String(index + 1)}
                                value={String(index + 1)}
                            />
                        ))}
                    </Picker>
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
    diaMes: {
        fontSize: 30,
        alignSelf: 'center',
        color: '#0096C7',
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

export default FilterHoursScreen;