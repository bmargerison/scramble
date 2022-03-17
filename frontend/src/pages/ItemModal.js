import React, { useState } from 'react';
import {
  TextInput, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal } 
from 'react-native';
import {AppStyles} from '../AppStyles';

const ItemModal = ({show, toggle, setModalItem}) => {
  const [ item, setItem ] = useState();

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          toggle();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.textView}>
              <TextInput
                style={styles.body}
                placeholder="What would you like to add?"
                onChangeText={setItem}
                value={item}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalItem(item)}
              >
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 100,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 5,
    marginTop: 20,
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
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
  },
  body: {
    borderRadius: 20,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
    backgroundColor: AppStyles.color.white,
    fontSize: AppStyles.fontSize.content,
  },
  textView: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: AppStyles.color.white,
  },
}); 

export default ItemModal;