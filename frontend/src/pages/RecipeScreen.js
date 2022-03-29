import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styleSheet'
import Icon from 'react-native-vector-icons/AntDesign';

const RecipeScreen = ({ navigation, route }) => {
  const [ recipe, setItem ] = useState(route.params.recipe);

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}></Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SearchRecipes')}>
            <Icon name="leftcircle" size={30} style={styles.backButton} />
          </TouchableOpacity>
        </View>
    </View>
  );

}

export default RecipeScreen;
