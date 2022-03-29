import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {AppStyles} from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/Entypo';
import { IP_ADDRESS } from "@env";
import axios from "axios";

const HomeScreen = ({ navigation, route }) => {
  const [lists, setLists] = useState([])
  const [list, setList] = useState({})
  const {state} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = () => {

      axios
      .get(`http://${IP_ADDRESS}:3000/lists/user/${state.userId}`)
      .then((res) => {
        setLists(res.data.reverse())
      })
    };

    fetchData();
  }, [route.params?.list, list]);

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

    setList(response.json())
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
      setList(response.json())
    });
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.leftTitle]}>Your lists</Text>
        </View>
        <TouchableOpacity style={styles.addContainer} onPress={()=> createNewList()}>
          <Text style={styles.buttonText}>Add New List</Text>  
        </TouchableOpacity>
      </View>
      <View style={styles.margin}>
        <FlatList 
          data={lists}
          keyExtractor={(list, index) => list._id}
          renderItem={({item}) => {
          return (
            <View 
            style={styles.card}>
              <TouchableOpacity style={styles.cardContent} onPress={()=> navigation.navigate('ListScreen', item)}>
                  <Text style={styles.description}>{item.date.slice(0,10)} {item.date.slice(11,16)}</Text>
                  <Text style={styles.item}>{item.items.length} items</Text>
              </TouchableOpacity>
              <TouchableHighlight
                  onPress={() => deleteList({item})}
                >
                <Icon name="circle-with-cross" size={30} color="#900" />
              </TouchableHighlight>
            </View>
          )}}/>
      </View>
    </SafeAreaView>
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
  },
  leftTitle: {
    marginLeft: 20,
    flex: 15,
  },
  addContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  buttonText: {
    color: AppStyles.color.white,
    alignSelf: "center",
    fontSize: AppStyles.fontSize.content,
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
    marginVertical: 10,
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
    fontSize: AppStyles.fontSize.content,
  },
  item:{
    fontSize: AppStyles.fontSize.sub,
    color:AppStyles.color.text,
    marginTop:5
  },
  margin: {
    marginBottom: 50
  },
  titleContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
  }
}); 

export default HomeScreen;
