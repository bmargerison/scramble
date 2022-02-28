import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Pressable, StyleSheet, Text, Button, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import {AppStyles} from '../AppStyles';
import axios from "axios";
import { IP_ADDRESS } from "@env";

let list

const ListScreen = ({ route, navigation }) => {
  const [ list, setList ] = useState(route.params);
  const [ item, setItem ] = useState();
  const [ items, setItems ] = useState(list.items)
  const [ modalVisible, setModalVisible ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://${IP_ADDRESS}:3000/lists/${list._id}`;
    
      axios
        .get(url)
        .then((res) => {
          setList(res.data);
          setItems(res.data.items)
        })
        .catch((err) => {
          console.log(err)
        })
      };

      fetchData();
    }, []);

  const addToList = () => {
    const url = `http://${IP_ADDRESS}:3000/lists/${list._id}`;
    
    axios
      .patch(url, {
        item: item,
      })
      .then((res) => {
        items.push(item)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

    setModalVisible(!modalVisible)
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="What would you like to add?"
            onChangeText={setItem}
            value={item}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToList()}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={[styles.title, styles.leftTitle]}>{list.date.slice(0,10)} {list.date.slice(11,16)}</Text>
      <TouchableOpacity style={styles.addContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Item</Text>  
      </TouchableOpacity>
      <FlatList 
          data={items}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
          return (
            <View 
            style={styles.card}>
                  <Text style={styles.description}>{item}</Text>
            </View>
          )}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  addButton: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: AppStyles.color.white,
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: AppStyles.color.white,
    padding: 35,
    alignItems: "center",
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: AppStyles.color.white,
    textAlign: "center"
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
}); 

export default ListScreen;