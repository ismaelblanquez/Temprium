import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CalendarList } from 'react-native-calendars';

const CalendarScreen = () => {
const [events, setEvents] = useState([]);

const fetchCalendarEvents = async () => {
try {
// Obtén el token de acceso del usuario autenticado
const { accessToken } = await GoogleSignin.getTokens();

  // Realiza una solicitud a la API de Google Calendar para obtener eventos
  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Parsea la respuesta a JSON y actualiza el estado con los eventos obtenidos
  const data = await response.json();
  setEvents(data.items);
} catch (error) {
  console.log('Error al obtener eventos del calendario', error);
}
};

useEffect(() => {
// Llama a la función para obtener los eventos del calendario al cargar la pantalla
fetchCalendarEvents();
}, []);

return (
<View style={styles.container}>
<Text style={styles.title}>Eventos del Calendario de Google</Text>
{events.length > 0 ? (
<CalendarList
// Configura las propiedades del componente CalendarList
// ...
markedDates={markedDates}
// ...
/>
) : (
<Text>No se encontraron eventos en el calendario</Text>
)}
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 16,
},
title: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 16,
},
});

export default CalendarScreen;