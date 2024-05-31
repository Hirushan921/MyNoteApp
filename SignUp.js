import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,StatusBar, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export function SignUpScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userType, setUserType] = useState('employee'); 
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const userData = {
      firstName,
      lastName,
      mobileNumber,
      userType,
      password,
    };

    try {
      const response = await fetch('http://10.0.2.2/noteapp/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign-up successful:', data);
        // Alert.alert("Success",data);
        Alert.alert('Success', 'Sign-up was successful!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Sign In');
            },
          },
        ]);
      } else {
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Employee', value: 'employee'},
    {label: 'Student', value: 'student'}
  ]);

 

  return (
    <View style={styles.container}>
       <StatusBar hidden={true}/>
      <View style={styles.img1}><Image source={require("./pinned.png")}/></View>
      <Text style={styles.title1}>MyNotes</Text>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        onChangeText={text => setMobileNumber(text)}
      />
      <View style={styles.dropdownContainer}>
        {/* <Text>User Type:</Text> */}
        <DropDownPicker style={styles.dropd}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={"User Type"}
      placeholderStyle={{
        color: "grey",
      }}
      onChangeValue={()=>{
        setUserType(value);
      }}
    />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

};




const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
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
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdown: {
    flex: 1,
    height: 40,
    color:'gray',
  },
  dropd: {
    borderColor: 'gray',
    Tcolor:'gray',
  },
  button: {
    backgroundColor: 'blue',
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

// export default SignUpScreen;