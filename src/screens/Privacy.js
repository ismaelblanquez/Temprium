import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Privacy = () => {
    const privacyTexts = [
        {
            title: 'Política de Privacidad',
            text: `
En Temprium, nos comprometemos a proteger tu privacidad y mantener la confidencialidad de la información que nos proporcionas. 
Esta Política de Privacidad describe cómo manejamos la información en nuestra aplicación y cómo protegemos tus derechos de privacidad. 
Al utilizar nuestra aplicación Temprium, aceptas las prácticas descritas en esta Política de Privacidad.
`,
        },
        {
            title: 'Recopilación y Uso de Información',
            text: `
Nuestra aplicación Temprium no recopila ni almacena información personal de los usuarios.
No recopilamos nombres de usuario, direcciones de correo electrónico ni ningún otro tipo de información personal identificable.
Toda la información generada y almacenada en la aplicación se mantiene localmente en tu dispositivo y no se comparte con nosotros ni con terceros.
`,
        },
        {
            title: 'Base de Datos Local',
            text: `
Entendemos la importancia de la privacidad de tus datos y, por lo tanto,
no accedemos, recopilamos ni almacenamos información personal almacenada en la base de datos local de la aplicación.
Los datos almacenados en la base de datos local son responsabilidad exclusiva del usuario y se utilizan únicamente para el funcionamiento 
y la funcionalidad de la aplicación en el dispositivo del usuario.
`,
        },
        {
            title: 'Seguridad de la Información',
            text: `
Nos esforzamos por implementar medidas de seguridad adecuadas para proteger los datos almacenados localmente en tu dispositivo. 
Sin embargo, debes tener en cuenta que ninguna medida de seguridad es absoluta y no podemos garantizar la seguridad completa de los datos almacenados en tu dispositivo.
Es responsabilidad del usuario asegurarse de mantener su dispositivo seguro y protegido.
`,
        },
        {
            title: 'Contacto',
            text: `
Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento y sin previo aviso. 
Te recomendamos que revises periódicamente esta Política de Privacidad para estar al tanto de cualquier cambio. 

El uso continuado de nuestra aplicación después de la publicación de cualquier cambio en esta Política de Privacidad implicará tu aceptación de dichos cambios.
Si tienes alguna pregunta o inquietud acerca de nuestra Política de Privacidad, por favor contáctanos a través de los siguientes datos de contacto:

Temprium
temprium.soporte@gmail.com

Fecha de entrada en vigencia: 30/05/2023
`,
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {privacyTexts.map((privacyText, index) => (
                <View key={index}>
                    <Text style={[styles.title, { fontSize: 30 }]}>{privacyText.title}</Text>
                    <Text style={styles.privacyText}>{privacyText.text}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0096C7',
        marginTop: 10,
    },
    privacyText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
});

export default Privacy;
