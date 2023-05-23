import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';
import { selectHoras } from '../DataBase/Conexion';
import { Calendar } from 'react-native-calendars';

function AgendaApp({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [email, setEmail] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  
  const construirEventos = (registros) => {
    const eventos = {};
  
     
    registros.forEach((registro) => {
      const { Dia, Tipohoras, Horas, minutos,Clase,Categoria } = registro;
      const fecha = Dia.substring(0, 10); // Obtén solo la fecha sin la hora
  
      if (!eventos[fecha]) {
        eventos[fecha] = [];
      }
  
      eventos[fecha].push({
        dotColor: 'blue',
        selectedDotColor: 'orange',
        hours: registro.Horas,
        minutes: registro.minutos,
        tipoHoras: registro.Tipohoras,
        Clase: registro.Clase,
        categoria: registro.Categoria
      });
    });
  
    return eventos;
  };
  
  

  useEffect(() => {
    const obtenerRegistros = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        setEmail(email || 'dummy@nosession.com');
  
        let registros = [];
  
        if (fechaSeleccionada) {
          const fechaInvertida = fechaSeleccionada.split("-").reverse().join("-");
          selectHoras('', email || 'dummy@nosession.com', '', fechaInvertida, '', '')
            .then((resultados) => {
              registros = resultados;
              console.log(registros)
              const eventos = construirEventos(registros);
              setEventos(eventos);
              
            })
            .catch((error) => {
              console.error('Error al obtener los registros:', error);
            });
        } else {
          const eventos = construirEventos(registros);
          setEventos(eventos);
          
        }
      } catch (error) {
        console.error('Error al obtener los registros:', error);
      }
    };
  
    obtenerRegistros();
  }, [fechaSeleccionada]);
  
  

  const markedDates = Object.values(eventos).reduce((acc, eventosDia) => {
    eventosDia.forEach((evento) => {
      const fecha = evento.fecha;
      if (!acc[fecha]) {
        acc[fecha] = { dots: [] };
      }
      acc[fecha].dots.push(evento);
    });
    return acc;
  }, {});
  
  
  
  const handleDayPress = (day) => {
    setFechaSeleccionada(day.dateString);
  };

  const fechaInvertida = fechaSeleccionada.split("-").reverse().join("-");
  const eventosFechaSeleccionada = eventos[fechaInvertida] || [];
  console.log(eventosFechaSeleccionada)
  return (
    <View style={styles.agendaContainer}>
    <View style={styles.componente}>
      <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
    </View>
    {fechaSeleccionada && (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.eventosContainer}>
        <Text style={styles.eventosTitle}>Eventos para {fechaSeleccionada}</Text>
        {eventosFechaSeleccionada.map((evento, index) => (
          <View key={index} style={styles.eventoContainer}>
            <Text style={[styles.eventoText,{ color: evento.tipohoras === "No Lectivas" ? "#8E44AD" : "#12CDD4" }]}>{evento.tipoHoras}</Text>
            <Text style={styles.eventoText}>Horas: {evento.hours}</Text>
            <Text style={styles.eventoText}>Minutos: {evento.minutes}</Text>
            <Text style={styles.eventoText}>Clase: {evento.Clase}</Text>
            <Text style={styles.eventoText}>Categoria: {evento.categoria}</Text>
          </View>
        ))}
      </View>
      </ScrollView>
    )}
    <View style={styles.bottomBarContainer}>
      <BottomBar navigation={navigation} />
    </View>
  </View>
  
  );
}

const styles = StyleSheet.create({
  agendaContainer: {
    flex: 1,
    backgroundColor: '#FFF',
     marginTop: 50,
  },
  newEventContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  }, 
   scrollView: {
    flex: 1,
    marginBottom: 50, // Aplica un margen inferior de 50 unidades
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },  
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  newEventInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#0096C7',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  noEventsText: {
    paddingHorizontal: 20,
    marginTop: 20,
    fontStyle: 'italic',
  },
  eventContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventDescription: {
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  eventoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1',
    marginBottom: 10,
  },
  eventosContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  eventosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AgendaApp;
