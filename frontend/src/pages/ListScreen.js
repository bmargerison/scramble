import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity
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
  const [ type, setType ] = useState();
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

        let typ = []
        Object.keys(items).forEach((i) => {
          typ.push({'t': i})
        })
        setTypes(typ)
      })
      .catch((err) => {
        console.log(err)
      })

    };

    fetchData();
  }, [list]);

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
    setType(type);
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
              <View>
                <Text style={styles.heading}>{item.t}</Text>
                <FlatList 
                  data={allItems[item.t]}
                  keyExtractor={(item, index) => index}
                  renderItem={({item}) => {
                      return (
                        <View
                        style={styles.card}>
                              <Text style={styles.items}>{item.name}</Text>
                        </View>
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
    width: 100,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 5,
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
    borderRadius: 20,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
    backgroundColor: AppStyles.color.white,
  },
  textView: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: AppStyles.color.white,
  },
  dropdownText: {
    fontSize: 15,
    backgroundColor: AppStyles.color.white,
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