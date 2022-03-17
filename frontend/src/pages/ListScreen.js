import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} 
from 'react-native';
import {AppStyles} from '../AppStyles';
import axios from "axios";
import { IP_ADDRESS } from "@env";
import {Context as AuthContext} from '../context/AuthContext';
import ItemModal from './ItemModal'
import TypeModal from './TypeModal'

const ListScreen = ({ route, navigation }) => {
  // modal forms
  const [ item, setItem ] = useState();
  const [ itemModalVisible, setItemModalVisible ] = useState(false);
  const [ typeModalVisible, setTypeModalVisible ] = useState(false);

  // fetch data on each render
  const [ list, setList ] = useState(route.params);
  const [ types, setTypes ] = useState([]);
  const [ allItems, setAllItems ] = useState({})
  const [ userItems, setUserItems ] = useState()

  // state
  const {state} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {

    axios
      .get(`http://${IP_ADDRESS}:3000/items/user/${state.userId}`)
      .then((res) => {
        setUserItems(res.data)

        // set items array categorised by type
        let items = {}
        res.data.forEach((k,v) => {
          if(list.items.includes(k.name)) {
            if (!items[k.type]) {
              items[k.type] = [k]
            } else {
              items[k.type].push(k);
            }
          }
        }) 
        setAllItems(items)

        // set types for display by category
        let types = []
        Object.keys(items).forEach((i) => {
          types.push({'t': i})
        })
        setTypes(types)
      })
      .catch((err) => {
        console.log(err)
      })
    };
    fetchData();
  }, [list]);

  // if user has already set up item, add to list
  // otherwise, create item with type for the user, then add to list

  const mapToItem = () => {
    setItemModalVisible(!itemModalVisible)
    if (userItems.some(saved => saved.name == item)) {
      addToList(item)
    } else {
      setTypeModalVisible(!typeModalVisible)
    }
  } 

  const addToList = (item) => {
    axios
      .patch(`http://${IP_ADDRESS}:3000/lists/${list._id}`, {
        item: item,
      })
      .then((res) => {
        setList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const createNewItem = (type) => {
    axios
    .post(`http://${IP_ADDRESS}:3000/items`, {
      _user: state.userId,
      _list: list._id,
      name: item,
      type: type
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    setTypeModalVisible(!typeModalVisible)
    addToList(item)
  };

  // modals interface

  const toggleItemModal = () => {
    setItemModalVisible(!itemModalVisible)
  }

  const setModalItem = (item) => {
    setItem(item);
    mapToItem(item);
  }

  const toggleTypeModal = () => {
    setTypeModalVisible(!typeModalVisible)
  }

  const setModalType = (type) => {
    createNewItem(type);
  }


  return (
    <View>
      <View style={styles.container}>
        <TypeModal show={typeModalVisible} toggle={toggleTypeModal} setModalType={setModalType}/>
        <ItemModal show={itemModalVisible} toggle={toggleItemModal} setModalItem={setModalItem}/>
        <Text style={[styles.title, styles.leftTitle]}>{list.date.slice(0,10)} {list.date.slice(11,16)}</Text>
        <TouchableOpacity style={styles.addContainer} onPress={() => toggleItemModal()}>
          <Text style={styles.buttonText}>Add Item</Text>  
        </TouchableOpacity>
        </View>
        <FlatList 
          data={types}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => { 
            return (
              <View style={styles.scrollMargin}>
                <Text style={styles.heading}>{item.t}</Text>
                <FlatList 
                  data={allItems[item.t]}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => {
                      return (
                        <Text style={styles.items}>{item.name}</Text>
                  )}}/>
              </View>
          )}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 50,
    marginBottom: 15,
  },
  scrollMargin: {
    marginBottom: 20,
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
    fontSize: AppStyles.fontSize.content,
    alignSelf: "center",
  },
  textStyle: {
    color: AppStyles.color.white,
    textAlign: "center"
  },
  items: {
    fontSize: AppStyles.fontSize.content,
    color:AppStyles.color.text,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 20,
  },
  heading: {
    fontSize: AppStyles.fontSize.content,
    backgroundColor: AppStyles.color.tint,
    color:AppStyles.color.white,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 2,
  },
}); 

export default ListScreen;