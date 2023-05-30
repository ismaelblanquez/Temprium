import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Privacy = () => {
    const privacidadText = `
En Temprium, nos comprometemos a proteger tu privacidad y mantener la confidencialidad de la información que nos proporcionas. 
Esta Política de Privacidad describe cómo manejamos la información en nuestra aplicación y cómo protegemos tus derechos de privacidad. 
Al utilizar nuestra aplicación Temprium, aceptas las prácticas descritas en esta Política de Privacidad.
`;

    const privacidadText2 = `
Nuestra aplicación Temprium no recopila ni almacena información personal de los usuarios.
No recopilamos nombres de usuario, direcciones de correo electrónico ni ningún otro tipo de información personal identificable.
Toda la información generada y almacenada en la aplicación se mantiene localmente en tu dispositivo y no se comparte con nosotros ni con terceros.
`;

    const privacidadText3 = `
Entendemos la importancia de la privacidad de tus datos y, por lo tanto,
no accedemos, recopilamos ni almacenamos información personal almacenada en la base de datos local de la aplicación.
Los datos almacenados en la base de datos local son responsabilidad exclusiva del usuario y se utilizan únicamente para el funcionamiento 
y la funcionalidad de la aplicación en el dispositivo del usuario.
`;

    const privacidadText4 = `
Nos esforzamos por implementar medidas de seguridad adecuadas para proteger los datos almacenados localmente en tu dispositivo. 
Sin embargo, debes tener en cuenta que ninguna medida de seguridad es absoluta y no podemos garantizar la seguridad completa de los datos almacenados en tu dispositivo.
Es responsabilidad del usuario asegurarse de mantener su dispositivo seguro y protegido.
`;

    const privacidadText5 = `
Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento y sin previo aviso. 
Te recomendamos que revises periódicamente esta Política de Privacidad para estar al tanto de cualquier cambio. 

El uso continuado de nuestra aplicación después de la publicación de cualquier cambio en esta Política de Privacidad implicará tu aceptación de dichos cambios.
Si tienes alguna pregunta o inquietud acerca de nuestra Política de Privacidad, por favor contáctanos a través de los siguientes datos de contacto:\n\n
Temprium\ntemprium.soporte@gmail.com\n
Fecha de entrada en vigencia: 30/05/2023
`;


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.title, {fontSize:30}]}>Política de Privacidad</Text>
            <Text style={styles.privacyText}>{privacidadText}</Text>
            <Text style={styles.title}>Recopilación y Uso de Información</Text>
            <Text style={styles.privacyText}>{privacidadText2}</Text>
            <Text style={styles.title}>Base de Datos Local</Text>
            <Text style={styles.privacyText}>{privacidadText3}</Text>
            <Text style={styles.title}>Seguridad de la Información</Text>
            <Text style={styles.privacyText}>{privacidadText4}</Text>
            <Text style={styles.title}>Contacto</Text>
            <Text style={styles.privacyText}>{privacidadText5}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        marginTop: 30,
        // marginBottom:500,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 10,
        color:'#0096C7',
        marginTop: 10,
        
    },
    privacyText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom:20,
    },
});

export default Privacy;
