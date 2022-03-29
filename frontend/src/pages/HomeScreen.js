import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import styles from '../styles/styleSheet'
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
    axios
      .post(`http://${IP_ADDRESS}:3000/lists`, {
        _user: state.userId
      }).then(res => {
        setList(res.data)
      });
  };

  const deleteList = async (list) => {
    axios
      .delete(`http://${IP_ADDRESS}:3000/lists/${list.item._id}`)
      .then(res => {
        setList(res.data)
    });
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your lists</Text>
        </View>
        <TouchableOpacity style={styles.addItemContainer} onPress={()=> createNewList()}>
          <Text style={styles.buttonText}>Add New List</Text>  
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 50 }}>
        <FlatList 
          data={lists}
          keyExtractor={(list, index) => list._id}
          renderItem={({item}) => {
          return (
            <View 
            style={styles.card}>
              <TouchableOpacity style={styles.cardContent} onPress={()=> navigation.navigate('ListScreen', item)}>
                  <Text style={styles.cardTitle}>{item.date.slice(0,10)} {item.date.slice(11,16)}</Text>
                  <Text style={styles.cardItems}>{item.items.length} items</Text>
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

export default HomeScreen;
