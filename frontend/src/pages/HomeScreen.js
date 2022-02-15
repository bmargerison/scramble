import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, FlatList, TouchableOpacity, Pressable } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const [lists, setLists] = useState([])
  const {state} = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `http://localhost:3000/lists/user/${state.userId}`;
    
    try {
      const response = await fetch(url);
      const json = await response.json();
      setLists(json)
    } catch (error) {
      console.log("error", error);
    }
  };

  const createNewList = async () => {
    const url = `http://localhost:3000/lists`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_user: state.userId})
    });

    const list = await response.json();
    console.log(list);
    fetchData()
  };

  const deleteList = async (list) => {
    console.log(list.item._id)

    const url = `http://localhost:3000/lists/${list.item._id}`;
  }

  return (
    <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <TouchableOpacity style={styles.shareButton} onPress={()=> createNewList()}>
              <Text style={styles.shareButtonText}>Create New List</Text>  
            </TouchableOpacity>
          </View>
        </View>
      <FlatList 
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={lists.reverse()}
        keyExtractor= {(item) => {
          return item._id;
        }}
        renderItem={({item}) => {
        return (
          <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('ListScreen', {item} )}>
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.date}</Text>
            </View>
            <Pressable style={styles.button} onPress={() => deleteList({item})}>
              <Text style={styles.text}>delete</Text>
            </Pressable>
          </TouchableOpacity>
        )}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },

  button: {
    alignItems: 'right',
    justifyContent: 'right',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    position: 'absolute',
    right: 20,
    top: 5,
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
}); 


export default HomeScreen;
