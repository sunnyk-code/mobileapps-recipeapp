import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (authContext?.user) {
      router.replace('/(tabs)');
    }
  }, [authContext?.user]);

  const handleSignUp = async () => {
    try {
      setError('');
      setSuccess('');
      if (!email || !password) {
        setError('Email and password cannot be empty.');
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Account created successfully! You can now sign in.');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error('Sign-up error:', err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try signing in.');
      } else {
        setError('Error creating account. Please try again.');
      }
    }
  };

  const handleSignIn = async () => {
    try {
      setError('');
      setSuccess('');
      if (!email || !password) {
        setError('Email and password cannot be empty.');
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Signed in successfully!');
      setEmail('');
      setPassword('');
      router.replace('/(tabs)'); // Navigate to the tab layout after successful sign-in
    } catch (err: any) {
      console.error('Sign-in error:', err.message);
      if (err.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Error signing in. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  success: {
    color: 'green',
    marginBottom: 12,
  },
});