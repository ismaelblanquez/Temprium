import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';



function Notifications({ navigation }) {
    const [notificacion1, setNotificacion1] = useState(false);
    const [notificacion2, setNotificacion2] = useState(false);
    const [notificacion3, setNotificacion3] = useState(false);
    const [notificacionesHabilitadas, setNotificacionesHabilitadas] = useState(false);

    useEffect(() => {
        // Comprobar si las notificaciones están habilitadas en el dispositivo al cargar la pantalla
        PushNotification.getApplicationIconBadgeNumber((badgeCount) => {
            setNotificacionesHabilitadas(badgeCount > 0);
        });
    }, []);

    const toggleNotificacion1 = () => {
        setNotificacion1(!notificacion1);
    };

    const toggleNotificacion2 = () => {
        setNotificacion2(!notificacion2);
    };

    const toggleNotificacion3 = () => {
        setNotificacion3(!notificacion3);
    };

    const toggleNotificacionesHabilitadas = () => {
        if (notificacionesHabilitadas) {
            // Desactivar las notificaciones en el dispositivo
            PushNotification.setApplicationIconBadgeNumber(0);
            PushNotification.cancelAllLocalNotifications();
        }
        setNotificacionesHabilitadas(!notificacionesHabilitadas);
    };

    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Notificaciones</Text>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Notificación 1</Text>
                <Switch
                    value={notificacion1}
                    onValueChange={toggleNotificacion1}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Notificación 2</Text>
                <Switch
                    value={notificacion2}
                    onValueChange={toggleNotificacion2}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Notificación 3</Text>
                <Switch
                    value={notificacion3}
                    onValueChange={toggleNotificacion3}
                />
            </View>
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Habilitar notificaciones en el dispositivo</Text>
                <Switch
                    value={notificacionesHabilitadas}
                    onValueChange={toggleNotificacionesHabilitadas}
                />
            </View>
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
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    optionText: {
        fontSize: 16,
    },
});

export default Notifications;