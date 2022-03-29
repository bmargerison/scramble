import React, { useState } from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal } 
from 'react-native';
import {AppStyles} from '../styles/AppStyles';
import SelectDropdown from 'react-native-select-dropdown'

const TypeModal = ({show, toggle, setModalType}) => {
  const [ type, setType ] = useState();

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
              <SelectDropdown
              data={['Fruit & Vegetables', 'Health & Beauty', 'Dairy', 'Meat and Fish', 'Other Cold Foods', 'Frozen', 'Pantry', 'Bakery', 'Drinks', 'Other']}
              buttonStyle={styles.textView}
              buttonTextStyle={styles.dropdownText}
              defaultButtonText="Select location"
              onSelect={setType}
              value={type}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalType(type)}
              >
                <Text style={styles.textStyle}>Create</Text>
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
  textView: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: AppStyles.color.white,
  },
  dropdownText: {
    backgroundColor: AppStyles.color.white,
    opacity: 0.5
  },
}); 

export default TypeModal;
