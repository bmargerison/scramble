import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, FlatList, TouchableOpacity } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const [lists, setLists] = useState([])
  const {state} = useContext(AuthContext);

  useEffect(() => {
    const url = `http://localhost:3000/lists/user/${state.userId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setLists(json)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
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
}); 


export default HomeScreen;
