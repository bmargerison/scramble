import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {AppStyles} from '../styles/AppStyles';
import axios from "axios";
import styles from '../styles/styleSheet'
import { IP_ADDRESS } from "@env";

const FavouritesScreen = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchData = () => {
      axios
      .get(`http://${IP_ADDRESS}:3000/recipes`)
      .then((res) => {
        setRecipes(res.data)
      })
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your favourites</Text>
        </View>
      </View>
      <FlatList 
          style={{ marginTop: 50, marginBottom: 50 }}
          data={recipes}
          keyExtractor={(list, index) => list.title}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card}>
              <View style={{ flexDirection:'column', flexWrap: 'wrap' }}>
                <Text style={newStyles.label}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}}/>
    </SafeAreaView>
  );
}

const newStyles = StyleSheet.create({
  label: {
    flex: 1,
    color:"#008080",
    fontWeight:'bold',
    flexWrap: 'wrap',
    fontSize: AppStyles.fontSize.content,
    marginLeft: 10,
  },
  source: {
    flex: 1,
    marginLeft: 10,
    fontSize: AppStyles.fontSize.sub,
    color:AppStyles.color.text,
    fontStyle: 'italic',
  }
}); 

export default FavouritesScreen;
