import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
      if (email === 'shreyash.b@sankeysolutions.com' && password === 'Shrey@12') {
          navigation.navigate('Home', { user: 'Shreyash', color: '#6495ED' });
      } else if (email === 'ashwin.s@sankeysolutions.com' && password === 'ash@1005') {
          navigation.navigate('Home', { user: 'Ashwin', color: '#FF69B4' });
      } else {
          alert('Incorrect email or password');
      }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/imgs/loginimg.jpg')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Email-Id"
        placeholderTextColor="#999"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#636390',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 50,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    width: '30%',
    height: 40,
    backgroundColor: '#c721fd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
