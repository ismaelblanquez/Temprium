import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from '../components/BottomBar';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function DailyTasks({ navigation }) {
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [reminderHours, setReminderHours] = useState('');
  const [reminderMinutes, setReminderMinutes] = useState('');

  useEffect(() => {
    // Cargar eventos guardados al iniciar la app
    AsyncStorage.getItem('events').then((storedEvents) => {
      if (storedEvents !== null) {
        setEvents(JSON.parse(storedEvents));
      }
    });
  }, []);

  useEffect(() => {
    // Guardar eventos al actualizar la lista
    AsyncStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = async () => {
    const newEvent = { title: newEventTitle, description: newEventDescription };
    if (newEventTitle !== '') {
      setEvents([...events, newEvent]);
      setNewEventTitle('');
      setNewEventDescription('');
      setReminderHours('');
      setReminderMinutes('');
  
      const currentDate = new Date();
      const reminderDate = new Date(currentDate);
  
      // Set the reminder time based on user input
      reminderDate.setHours(parseInt(reminderHours, 10));
      reminderDate.setMinutes(parseInt(reminderMinutes, 10));
      reminderDate.setSeconds(0);
  
      if (reminderDate < currentDate) {
        // If the reminder time is in the past, schedule it for the next day
        reminderDate.setDate(reminderDate.getDate() + 1);
      }
  
      const timeDifference = reminderDate.getTime() - currentDate.getTime();
  
      // Schedule the notification to appear after the specified delay
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio',
          body: `Recuerda que tienes: ${newEvent.title}`,
        },
        trigger: { seconds: Math.floor(timeDifference / 1000) },
      });
    } else {
      console.log('Error adding event');
    }
  };

  const deleteEvent = (index) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const todayEvents = events.filter((event) => {
    const eventDate = new Date();
    const eventTitle = event.title.toLowerCase();
    const eventDescription = event.description.toLowerCase();
    const today = new Date().toISOString().substr(0, 10);

    return (
      eventDate.toISOString().substr(0, 10) === today ||
      eventTitle.includes(today) ||
      eventDescription.includes(today)
    );
  });

  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={styles.agendaContainer}>
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.newEventContainer}>
            <Text style={styles.sectionTitle}>Agregar evento:</Text>
            <TextInput
              style={styles.newEventInput}
              placeholder="Título"
              value={newEventTitle}
              onChangeText={(text) => setNewEventTitle(text)}
            />
            <TextInput
              style={styles.newEventInput}
              placeholder="Descripción"
              value={newEventDescription}
              onChangeText={(text) => setNewEventDescription(text)}
            />
            <TextInput
              style={styles.newEventInput}
              placeholder="Hora Recordatorio (0-23)"
              keyboardType="numeric"
              value={reminderHours}
              onChangeText={setReminderHours}
           />
           <TextInput
              style={styles.newEventInput}
              placeholder="Minutos Recordatorio (0-59)"
              keyboardType="numeric"
              value={reminderMinutes}
              onChangeText={setReminderMinutes}
           />
            <TouchableOpacity style={styles.addButton} onPress={addEvent}>
              <Text style={styles.addButtonText}>Agregar evento</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Eventos de hoy:</Text>
          {todayEvents.length > 0 ? (
            todayEvents.map((event, index) => (
              <View style={styles.eventContainer} key={index}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEvent(index)}>
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noEventsText}>No hay eventos para hoy.</Text>
          )}
        </ScrollView>
        <View style={styles.bottomBarContainer}>
          <BottomBar navigation={navigation} />
        </View>
      </View>
      </View>
  
  );
}

const styles = StyleSheet.create({
  agendaContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    // marginBottom: 50,
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
});

export default DailyTasks;
