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

const ListNameModal = ({show, toggle, setModalName}) => {
  const [ name, setName ] = useState();

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
                placeholder="Enter name of new list"
                onChangeText={setName}
                value={name}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={() => setModalName(name)}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ListNameModal;