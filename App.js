// import { StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import Contact from './Components/Contact';
import { StyleSheet, Text, View } from 'react-native';
import { ContainerTypes } from 'expo-contacts';

export default function App() {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.checkedContainer}>
        <View style={styles.section}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
          <Text style={styles.paragraph}>Show Contacts</Text>
        </View>
      </View>
      {
        isChecked
          ? <Contact />
          : <Text style={styles.text} >Welcome to My App</Text>
      }
    </View>
  );
}

// const styles = StyleSheet.create({
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,

  },
  text: {
    margin: 0,
  },
  checkedContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    // marginTop: 100,
    margin: 0,
    padding: 0,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});