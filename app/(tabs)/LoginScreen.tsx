import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      console.log('Attempting to sign in with:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', userCredential.user);
      navigation.navigate('index');
    } catch (err: any) {
      console.error('Sign-in error code:', err.code);
      console.error('Sign-in error message:', err.message);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is invalid.');
      } else {
        setError('Error signing in. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}
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
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  successText: {
    color: 'green',
    marginBottom: 12,
  },
});