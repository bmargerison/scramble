import React, { useState } from 'react';
import {
  TextInput, 
  Text, 
  View, 
  TouchableOpacity, 
  Modal } 
from 'react-native';
import {AppStyles} from '../../styles/AppStyles';
import styles from '../../styles/styleSheet'

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
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.modalTextView}>
              <TextInput
                style={styles.modalBody}
                placeholder="What would you like to add?"
                onChangeText={setItem}
                value={item}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={() => setModalItem(item)}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ItemModal;
