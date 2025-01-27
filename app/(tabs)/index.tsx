import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { firestore } from '../../firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (!authContext?.loading && !authContext?.user) {
      router.replace('/LoginScreen');
    }
  }, [authContext?.user, authContext?.loading]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'recipes'));
      const recipesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(recipesList);
    };

    fetchRecipes();
  }, []);

  if (authContext?.loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
      <Button title="Add New Recipe" onPress={() => router.push('/(tabs)/ExploreScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  recipeItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});