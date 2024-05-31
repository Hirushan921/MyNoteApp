import { View,Text, StyleSheet, SafeAreaView, StatusBar,TouchableOpacity,FlatList,Image } from "react-native";
import React, { useEffect,useState } from 'react';
// import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function MainScreen({navigation,route}) {
  
const userId = route.params.useId


// loadData();
useEffect(() => {
  loadData(); 
}, []);
const [getdata, setData] = useState([]);

const loadData = async () => {

  const userData = {
    userId,
  };

  try {
    const response = await fetch('http://10.0.2.2/noteapp/loadlist.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log( data);
      setData(data);
      // navigation.navigate('Home',{ useId: route.params.userId });
      // loadData();
      // useEffect();
     
      // if(data=='error'){
      //   Alert.alert('Error', 'Login failed. Please try again.');
      // }else{
      //   navigation.navigate('Home',{ useId: data.user });
      // }
      
     
    } else {
      console.error('failed');
      Alert.alert('Error', 'failed. Please try again.');
 
    }
  } catch (error) {
    console.error('Error:', error);

  }
};

  const ui = (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <Text style={styles.title1}>MyNotes</Text>
      <TouchableOpacity style={styles.button} onPress={goToAdd}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>
      <FlatList
      data={getdata}
      keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique ID
      renderItem={({ item }) => (
        
        <View style={styles.listItem}>
          <View style={styles.column}>
          {item.category === 'personal' && (
          <Image source={require("./personal.png")}/>
        )}
        {item.category === 'work' && (
          <Image source={require("./work.png")}/>
        )}
        {item.category === 'study' && (
          <Image source={require("./study.png")}/>
        )}
        {item.category === 'travel' && (
          <Image source={require("./travel.png")}/>
        )}
          
          </View>
          <View style={styles.column2}>
          <Text style={styles.title}>Title: {item.title}</Text>
          <Text style={styles.description}>Description: {item.description}</Text>
          <Text style={styles.dt}>{item.dt}</Text>
          
          </View>
        </View>
      )}
    />
      {/* <Text>{userId}</Text> */}
      
    </View>
  );
  return ui;
  function goToAdd() {
    navigation.navigate("addNote",{userId});
    
   }
}

const styles = StyleSheet.create(
  {
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#dcdcdc',
  },
  button: {
    backgroundColor: 'green',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title1: {
    color:'purple',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  column: {
    flex:1,
    marginRight: 20,
    padding: 5,
    borderColor: 'gray',
    // borderWidth: 1,
  },
  column2: {
    flex:5,
    
  },
  listItem: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
    width: 350,
    flexDirection:"row",
    borderWidth: 1,
    borderColor:"gray",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  dt: {
    fontSize: 13,
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
  }
);

// export default App;
