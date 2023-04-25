import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

function Privacy() {
const [compartirInfo, setCompartirInfo] = useState(true);
const [hacerPublica, setHacerPublica] = useState(false);

const toggleCompartirInfo = () => {
setCompartirInfo(!compartirInfo);
};

const toggleHacerPublica = () => {
setHacerPublica(!hacerPublica);
};

return (
<View style={styles.container}>
<Text style={styles.text}>Privacidad</Text>
<View style={styles.optionContainer}>
<Text style={styles.optionText}>Compartir mi información con otros</Text>
<Switch
value={compartirInfo}
onValueChange={toggleCompartirInfo}
/>
</View>
<View style={styles.optionContainer}>
<Text style={styles.optionText}>Hacer mi información pública</Text>
<Switch
value={hacerPublica}
onValueChange={toggleHacerPublica}
disabled={!compartirInfo}
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

export default Privacy;