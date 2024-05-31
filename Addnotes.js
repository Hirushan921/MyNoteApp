import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,StatusBar, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export function AddNotes({navigation,route}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Personal'); 
  const useId = route.params.userId

  const handleAddNote = async () => {
    // const [getId,setId] = useState("");
    //     const userid = await AsyncStorage.getItem("uId");
    //     setId(userid);
        

    const userData = {
      title,
      description,
      category,
      // getId,
      useId,
    };

    
    
    try {
      const response = await fetch('http://10.0.2.2/noteapp/addnote.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Successful:', data);
        // Alert.alert("Success",data);
       
          Alert.alert('Success', 'Note added successfully!', [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Home',{useId});
                // navigation.navigate('addNote');
              },
            },
          ]);
       
          //  navigation.navigate('addNote');
        
      } else {
        console.error('failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Study', value: 'study'},
    {label: 'Travel', value: 'travel'},
    {label: 'Personal', value: 'personal'},
    {label: 'Work', value: 'work'},
  ]);

 

  return (
    <View style={styles.container}>
       <StatusBar hidden={true}/>
      
      <Text style={styles.title1}>Add Notes</Text>
      {/* <Text style={styles.title1}>{useId}</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={text => setDescription(text)}
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
      onChangeValue={()=>{
        setCategory(value);
      }}
      placeholder="Category"
      placeholderStyle={{
        color: "grey",
      }}
    />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text style={styles.buttonText}>ADD</Text>
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