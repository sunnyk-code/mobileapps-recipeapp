import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'recipes'));
      const recipesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(recipesList);
    };

    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
      <Button title="Add New Recipe" onPress={() => navigation.navigate('ExploreScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  recipeItem: { marginBottom: 16, padding: 16, backgroundColor: '#f9f9f9', borderRadius: 8 },
  recipeTitle: { fontSize: 18, fontWeight: 'bold' },
});