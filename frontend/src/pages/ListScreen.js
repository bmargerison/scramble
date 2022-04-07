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

  // modal forms
  const [ item, setItem ] = useState('');
  const [ itemModalVisible, setItemModalVisible ] = useState(false);
  const [ typeModalVisible, setTypeModalVisible ] = useState(false);

  // fetch data on each render
  const [ list, setList ] = useState(route.params);
  const [ types, setTypes ] = useState([]);
  const [ allItems, setAllItems ] = useState({})
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
  }, [lists]);

  // if user has already set up item, add to list
  // otherwise, create item with type for the user, then add to list
  const mapToItem = (item) => {
    setItemModalVisible(!itemModalVisible)
    userItems.some(saved => {console.log(saved.name) 
      console.log(item)})
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

    // update state
    axios
      .get(`http://${IP_ADDRESS}:3000/lists/user/${state.userId}`)
      .then((res) => {
        setLists(res.data.reverse())
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
          data={types}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => { 
            return (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.heading}>{item.t}</Text>
                <FlatList 
                  data={allItems[item.t]}
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
                          onPress={(isChecked) => {!isChecked}}
                          />
                  )}}/>
              </View>
          )}}/>
    </View>
  );
}

export default ListScreen;
