import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {AppStyles} from '../AppStyles';
import Icon from 'react-native-vector-icons/Entypo';
import { IP_ADDRESS } from "@env";

const HomeScreen = ({navigation}) => {
  const [lists, setLists] = useState([])
  const {state} = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, [lists]);

  const fetchData = async () => {
    const url = `http://${IP_ADDRESS}:3000/lists/user/${state.userId}`;
    
    try {
      const response = await fetch(url);
      const json = await response.json();
      setLists(json)
    } catch (error) {
      console.log("error", error);
    }
  };

  const createNewList = async () => {
    const url = `http://${IP_ADDRESS}:3000/lists`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_user: state.userId})
    });

    const list = await response.json();

    fetchData()
  };

  const deleteList = async (list) => {
    const url = `http://${IP_ADDRESS}:3000/lists/${list.item._id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json()
    });

    fetchData()
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Your lists</Text>
        <TouchableOpacity style={styles.addContainer} onPress={()=> createNewList()}>
          <Text style={styles.buttonText}>Add New List</Text>  
        </TouchableOpacity>
      </View>
      <View>
        <FlatList 
          data={lists.reverse()}
          keyExtractor={(list, index) => list._id}
          renderItem={({item}) => {
          return (
            <View 
            style={styles.card}>
              <TouchableOpacity style={styles.cardContent} onPress={()=> navigation.navigate('ListScreen', item)}>
                  <Text style={styles.description}>{item.date.slice(0,10)} {item.date.slice(11,16)}</Text>
                  <Text style={styles.item}>item 1</Text>
                  <Text style={styles.item}>item 2</Text>
                  <Text style={styles.item}>item 3</Text>
              </TouchableOpacity>
              <TouchableHighlight
                style={styles.delete}
                  onPress={() => deleteList({item})}
                >
                <Icon style={styles.image} name="circle-with-cross" size={30} color="#900" />
              </TouchableHighlight>
            </View>
          )}}/>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
    flex: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 50,
    marginBottom: 50,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  addContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: AppStyles.color.white,
    alignSelf: "center",
    fontSize: AppStyles.fontSize.normal,
  },
  card:{
    flex: 1,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 20,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '80%',
    padding: 10,
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  description:{
    alignSelf: "auto",
    fontSize:18,
    color:"#008080",
    fontWeight:'bold',
  },
  item:{
    fontSize: AppStyles.fontSize.normal,
    color:AppStyles.color.text,
    marginTop:5
  },
  delete: {
    flex: 1,
  },
  delete: {
    right: 0,
  }
}); 

export default HomeScreen;
