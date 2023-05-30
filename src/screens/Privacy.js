import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

function Privacy() {
  const [privacyPolicyText, setPrivacyPolicyText] = useState('');

  useEffect(() => {
    // Lee el contenido del archivo "privacidad.txt"
    const readPrivacyPolicy = async () => {
      try {
        const privacyPolicy = await require('../utils/Privacy.txt');
        console.log(privacyPolicy);
        // setPrivacyPolicyText(privacyPolicy);
      } catch (error) {
        console.error('Error al leer el archivo de privacidad:', error);
      }
    };

    readPrivacyPolicy();
  }, []);

  return (
    <View>
      <Text>{privacyPolicyText}</Text>
    </View>
  );
}

export default Privacy;
