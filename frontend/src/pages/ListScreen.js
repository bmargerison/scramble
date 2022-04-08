import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity } 
from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {AppStyles} from '../styles/AppStyles';
import axios from "axios";
import { IP_ADDRESS } from "@env";
import { Context as AuthContext } from '../context/AuthContext';
import ItemModal from './modals/ItemModal'
import TypeModal from './modals/TypeModal'
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../styles/styleSheet'
import { ListsContext } from '../context/ListsContext';

const ListScreen = ({ navigation, route }) => {

  // for modal forms
  const [ item, setItem ] = useState('');
  const [ itemModalVisible, setItemModalVisible ] = useState(false);
  const [ typeModalVisible, setTypeModalVisible ] = useState(false);

  // fetch and create data on each render
  const [ list, setList ] = useState(route.params);
  const [ categorisedItems, setCategorisedItems ] = useState([])
  const [ userItems, setUserItems ] = useState()

  // state
  const { lists, setLists } = useContext(ListsContext)
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {

    axios
      .get(`http://${IP_ADDRESS}:3000/items/user/${state.userId}`)
      .then((res) => {
        setUserItems(res.data)

        const types = ['Fruit & Vegetables', 'Health & Beauty', 'Dairy', 'Meat and Fish', 
        'Other Cold Foods', 'Frozen', 'Pantry', 'Bakery', 'Drinks', 'Other']

        // create list of items categorised by type
        let categorisedItems = []
        types.forEach((type, index) => {
          let category = {'type': type, 'items': []}
          categorisedItems.push(category)
          list.items.forEach((item) => {
            if (item.type == type) {
              categorisedItems[index].items.push(item)
            }
          })
        })
        setCategorisedItems(
          categorisedItems
        )
      })
      .catch((err) => {
        console.log(err)
      })
    };
    fetchData();
  }, [list]);

  // if user has already set up item, add the item to the list
  // otherwise, create the item with type for the specific user, then add to list
  const mapToItem = (item) => {
    setItemModalVisible(!itemModalVisible)
    if (userItems.some(saved => saved.name == item)) {
      addToList(item)
    } else {
      setTypeModalVisible(!typeModalVisible)
    }
  } 

  const addToList = (item, type) => {
    axios
      .patch(`http://${IP_ADDRESS}:3000/lists/${list._id}`, {
        name: item,
        type: type,
        obtained: false
      })
      .then((res) => {
        setList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    updateLists()
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
    addToList(item, type)
  };

  // save toggle status
  const toggleCheckBox = (item) => {
    list.items.forEach((i, index) => {
      if (item.name == i.name) {
        axios
        .patch(`http://${IP_ADDRESS}:3000/lists/checkbox/${list._id}`, {
          name: item.name,
          type: item.type,
          index: index
        })
        .then((res) => {
          setList(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      }
      updateLists()
    })
  }

  // update parent component
  const updateLists = () => {
    axios
      .get(`http://${IP_ADDRESS}:3000/lists/user/${state.userId}`)
      .then((res) => {
        setLists(res.data.reverse())
      })
  }

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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{list.date.slice(0,10)} {list.date.slice(11,16)}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home', { list: list })}>
            <Icon name="leftcircle" size={30} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addItemContainer} onPress={() => toggleItemModal()}>
          <Text style={styles.buttonText}>Add Item</Text>  
        </TouchableOpacity>
      </View> 
      <FlatList 
      contentContainerStyle={{
        flexGrow: 1,
        }}
        data={categorisedItems}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => { 
          return (
            <View >
              <Text style={styles.heading}>{item.type}</Text>
              <FlatList 
                data={item.items}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => {
                    return (
                      <BouncyCheckbox
                        size={20}
                        text={item.name}
                        fillColor={AppStyles.color.tint}
                        iconStyle={{ borderRadius: 0, borderColor: AppStyles.color.tint }}
                        textStyle={styles.listItems}
                        style={styles.checkboxStyle}
                        isChecked={item.obtained}
                        onPress={()=>toggleCheckBox(item)}
                        />
                )}}/>
            </View>
        )}}/>
    </View>
  );
}

export default ListScreen;
