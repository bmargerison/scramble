import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import styles from '../styles/styleSheet'
import Icon from 'react-native-vector-icons/AntDesign';

const RecipeScreen = ({ navigation, route }) => {
  const [ recipe, setItem ] = useState(route.params.recipe);

  console.log(recipe.ingredients[0].text)
  return (
    <View style={styles.container}>
        <View style={[styles.titleContainer, {marginBottom: 50}]}>
          <Text style={styles.title}>{recipe.label}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SearchRecipes')}>
            <Icon name="leftcircle" size={30} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <ScrollView style={[styles.card, {flexDirection: "column", flexBasis: '85%'}]}>
          <Image
            source={{
              uri: `${recipe.image}`,
            }}
            style = {{ width: 350, height: 300, padding: 5, alignSelf: "center" }}
            />
          <Text style={[styles.cardTitle, {padding: 5}]}>Ingredients</Text>
          <View style={{ alignSelf: 'flex-start' }}>
            {recipe.ingredients.map(i => <Text style={styles.recipeItems}> - {i.text}</Text>)}
          </View>
          <View style={{paddingBottom:20}}></View>
        </ScrollView>
    </View>
  );

}

export default RecipeScreen;
