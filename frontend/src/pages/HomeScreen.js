import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity, TouchableHighlight, SafeAreaView } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import styles from '../styles/styleSheet'
import Icon from 'react-native-vector-icons/Entypo';
import { IP_ADDRESS } from "@env";
import axios from "axios";
import { ListsContext } from '../context/ListsContext';
import ListNameModal from './modals/ListNameModal'

const HomeScreen = ({ navigation }) => {
  const [ listNameModalVisible, setListNameModalVisible ] = useState(false);
  const [ list, setList ] = useState({})
  const { lists, setLists } = useContext(ListsContext)
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = () => {
      axios
      .get(`http://${IP_ADDRESS}:3000/lists/user/${state.userId}`)
      .then((res) => {
        setLists(res.data.reverse())
      })
    };

    fetchData();
  }, [list]);

  const createNewList = async (name) => {
    console.log(name)
    axios
      .post(`http://${IP_ADDRESS}:3000/lists`, {
        _user: state.userId,
        name: name
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

  // modal interface
  const toggleListNameModal = () => {
    setListNameModalVisible(!listNameModalVisible)
  }

  const setModalName = (name) => {
    setListNameModalVisible(!listNameModalVisible)
    createNewList(name)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your lists</Text>
        </View>
        <ListNameModal show={listNameModalVisible} toggle={toggleListNameModal} setModalName={setModalName}/>
        <TouchableOpacity style={styles.addItemContainer} onPress={()=> toggleListNameModal()}>
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
                  <Text style={styles.cardTitle}>{item.name}</Text>
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
