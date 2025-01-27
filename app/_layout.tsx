import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router'; // Import useRouter

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false); // Track whether the layout is ready
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Set the layout as ready after mounting
    setIsReady(true);

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isReady && !loading) {
      // Only navigate after the layout is ready and auth state is resolved
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/LoginScreen');
      }
    }
  }, [isReady, loading, user]);

  if (loading) {
    // Optionally show a loading screen or spinner while determining auth state
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
