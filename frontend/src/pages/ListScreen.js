import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, FlatList, TouchableOpacity } from 'react-native';
import {AppStyles} from '../AppStyles';

const ListScreen = ({ route, navigation }) => {
  const [ list, setList ] = useState(route.params);

  useEffect(() => {

    const fetchData = async () => {
      setList(route.params)
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>{list.item.date}</Text>
      <TouchableOpacity style={styles.addContainer}>
          <Text style={styles.buttonText}>Add Item</Text>  
        </TouchableOpacity>
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
  buttonText: {
    color: AppStyles.color.white,
    alignSelf: "center",
  },
}); 

export default ListScreen;