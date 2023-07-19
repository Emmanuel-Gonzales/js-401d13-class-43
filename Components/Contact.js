import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, Linking, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Haptics from 'expo-haptics';
import { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';

const call = (contact) => {
  // console.log('from button press', contact)
  // console.log('contact name', contact.name)
  let phoneNumber = contact.phoneNumbers[0].number; 
  // console.log('contact number', phoneNumber)
  let cleanNumber = phoneNumber.replace(/\D/g, '');
  const link = `tel:+${cleanNumber}`
  console.log('link:', link)
  Linking.canOpenURL(link).then(supported => Linking.openURL(link)).catch(e => console.error(e));
}

// function stringCheck(item) {
  //   if (typeof (item.name) !== undefined) {
    //     return item.phoneNumbers[0].number.toString();
    //   } else { return item.name }
    // }
    
    
    export default function Contact() {
      const [contacts, setContacts] = useState([]);
      const [image, setImage] = useState(null);
      useEffect(() => {
        const getContacts = async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          console.log('status-------', status)
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync();
            // console.log('this is my data', data[0].name)
            setContacts(data)
          }
        }
        getContacts();
      }, []);
      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }

      const Item = ({ item }) => (
        <View style={styles.item}>
          {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
        <Button
        onPress={() => {
          call(item)
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        }}
        title={item.name}
        />
      <Button title='Choose Image' onPress={()=>{pickImage()}}/>
      {/* <Text style={styles.title}>{title}</Text> */}
     </View>
  );
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
        />
      {/* {
        contacts.map((contact, index) => (
          <Text key={`contact-${index}`}>{contact.name}</Text>
        ))
      } */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  flax: {
  }
});