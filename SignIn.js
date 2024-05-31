import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image,StatusBar ,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SignInScreen ({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [getUserId, setUserId] = useState('');
 
  

  const handleLogin = async () => {

    const userData = {
      mobileNumber,
      password,
    };

    try {
      const response = await fetch('http://10.0.2.2/noteapp/signin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log('Login successful:', data);
        
        if (data.userId) {
          setUserId(data.user);
          saveUserId();
        }
       
        if(data=='error'){
          Alert.alert('Error', 'Login failed. Please try again.');
        }else{
          navigation.navigate('Home',{ useId: data.user });
        }
        
       
      } else {
        // Login failed
        console.error('Login failed');
        Alert.alert('Error', 'Login failed. Please try again.');
   
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  async function saveUserId() {
    await AsyncStorage.setItem("uId", getUserId);
  }

  return (
    <View style={styles.container}>
       <StatusBar hidden={true}/>
      <View style={styles.img1}><Image source={require("./pinned.png")}/></View>
      <Text style={styles.title1}>MyNotes</Text>
      <Text style={styles.title1}>{getUserId}</Text>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        onChangeText={text => setMobileNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={goToSignUp}>
        <Text style={styles.buttonText}>New User?</Text>
      </TouchableOpacity>
    </View>
  );
  function goToSignUp() {
    navigation.navigate("Sign Up");
   }
  //  function SignInProcess() {
  //   navigation.navigate("Home");
  //  }
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title1: {
    color:'purple',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // img1: {
  //   height: 30,
  // },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    
    backgroundColor: 'black',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// export default SignInScreen;