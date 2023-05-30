import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';
import { selectHoras } from '../DataBase/Conexion';
import { Calendar, LocaleConfig } from 'react-native-calendars';


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
    'Diciembre'
  ],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  today: "Hoy"
};

LocaleConfig.defaultLocale = 'es';

function CalendarScreen({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [email, setEmail] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const construirEventos = (registros) => {
    const eventos = {};

    registros.forEach((registro) => {
      const { Dia, Tipohoras, Horas, minutos, Clase, categoria } = registro;
      const fecha = Dia.substring(0, 10); // Obtén solo la fecha sin la hora

      if (!eventos[fecha]) {
        eventos[fecha] = [];
      }

      const dotColor = Tipohoras === 'No Lectivas' ? '#8E44AD' : '#12CDD4';

      eventos[fecha].push({
        dots: [
          {
            key: fecha + '-' + registro.Horas + '-' + registro.minutos,
            color: dotColor,
            selectedDotColor: 'orange',
          },
        ],
        hours: registro.Horas,
        minutes: registro.minutos,
        TipoHoras: registro.Tipohoras,
        Clase: registro.Clase,
        categoria: registro.Categoria,
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

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const totalDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      markedDates[dateString] = { selected: true, selectedTextColor: 'red', selectedColor: 'white' };
    }
  }

  return (
    <View style={styles.agendaContainer}>
      <View style={styles.componente}>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      </View>
      {!fechaSeleccionada && (
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Selecciona un día para ver las horas registradas</Text>
        </View>
      )}
      {fechaSeleccionada && (
        <View style={styles.scrollViewContainer}>
          <ScrollView>
            <View style={styles.eventosContainer}>
              <Text style={styles.eventosTitle}>Registro de horas para {fechaInvertida}</Text>
              {eventosFechaSeleccionada?.map((evento, index) => (
                <View key={index} style={styles.eventoContainer}>
                  <Text style={[styles.eventoText, { color: evento?.TipoHoras === "No Lectivas" ? "#8E44AD" : "#12CDD4" }]}>
                    {evento?.TipoHoras}
                  </Text>
                  <Text style={styles.eventoText}>
                    <Text style={{ fontWeight: 'bold' }}>Horas:</Text> {evento?.hours}
                  </Text>
                  <Text style={styles.eventoText}>
                    <Text style={{ fontWeight: 'bold' }}>Minutos:</Text> {evento?.minutes}
                  </Text>
                  <Text style={styles.eventoText}>
                    <Text style={{ fontWeight: 'bold' }}>Clase:</Text> {evento?.Clase}
                  </Text>
                  <Text style={styles.eventoText}>
                    <Text style={{ fontWeight: 'bold' }}>Categoria: </Text> {evento?.categoria}
                  </Text>
                </View>
              ))}
              {eventosFechaSeleccionada?.length === 0 && (
                <Text style={styles.noEventsText}>No hay horas registradas en este día</Text>
              )}
            </View>
          </ScrollView>
        </View>
      )}
      <View style={styles.bottomBarContainer}>
        <BottomBar navigation={navigation} selectedTab="Calendar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  agendaContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  componente: {
    marginTop: 30,
  },
  newEventContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    marginBottom: 400,
  },
  bottomTextContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  bottomText: {
    fontStyle: 'italic',
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
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNoLectiva: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  iconLectiva: {
    fontSize: 18,
    color: '#FFFFFF',
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
    // fontWeight: 'bold',
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
    marginBottom: 30
  },
  eventosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CalendarScreen;
