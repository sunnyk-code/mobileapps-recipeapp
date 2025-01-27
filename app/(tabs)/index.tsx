import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

type Recipe = {
  id: string;
  title: string;
  description: string;
};

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'recipes'), (snapshot) => {
      const recipesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
      setRecipes(recipesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <MaterialIcons name="restaurant-menu" size={28} color="#fff" />
        <Text style={Styles.header}>Recipes</Text>
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={Styles.recipeItem}>
            <Text style={Styles.title}>{item.title}</Text>
            <Text style={Styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF5E1',
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
  recipeItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#FF6347',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});