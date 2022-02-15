import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View, FlatList, TouchableOpacity } from 'react-native';

const ListScreen = ({ route, navigation }) => {
  const [ list, setList ] = useState(route.params);

  useEffect(() => {

    const fetchData = async () => {
      setList(route.params)
    };

    fetchData();
  }, []);

  return (
    <Text>{list.item.date}</Text>
  );
}

export default ListScreen;