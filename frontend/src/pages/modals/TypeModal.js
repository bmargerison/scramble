import React, { useState } from 'react';
import {
  Text, 
  View, 
  TouchableOpacity, 
  Modal } 
from 'react-native';
import {AppStyles} from '../../styles/AppStyles';
import SelectDropdown from 'react-native-select-dropdown'
import styles from '../../styles/styleSheet'

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
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
              <SelectDropdown
              data={['Fruit & Vegetables', 'Health & Beauty', 'Dairy', 'Meat and Fish', 'Other Cold Foods', 'Frozen', 'Pantry', 'Bakery', 'Drinks', 'Other']}
              buttonStyle={styles.modalTextView}

              defaultButtonText="Select location"
              onSelect={setType}
              value={type}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
              />

              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={() => setModalType(type)}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default TypeModal;
