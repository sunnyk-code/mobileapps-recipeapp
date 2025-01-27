import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export default function ExploreScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleAddRecipe = async () => {
    if (title && description) {
      await addDoc(collection(firestore, 'recipes'), { title, description });
      router.push('/(tabs)'); 
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.container}>
      <View style={Styles.headerContainer}>
        <FastfoodIcon style={{ fontSize: 24, color: 'white' }} />
        <Text style={Styles.header}>Add a New Recipe</Text>
      </View>
      <TextInput
        placeholder="Recipe Title"
        value={title}
        onChangeText={setTitle}
        style={Styles.input}
      />
      <TextInput
        placeholder="Recipe Description"
        value={description}
        onChangeText={setDescription}
        style={[Styles.input, Styles.textArea]}
        multiline
      />
      <TouchableOpacity style={Styles.button} onPress={handleAddRecipe}>
        <Text style={Styles.buttonText}>Save Recipe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF5E1',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});