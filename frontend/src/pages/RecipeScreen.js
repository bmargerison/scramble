import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import styles from '../styles/styleSheet'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {AppStyles} from '../styles/AppStyles';
import axios from "axios";
import { IP_ADDRESS } from "@env";
import { Context as AuthContext } from '../context/AuthContext';

const RecipeScreen = ({ navigation, route }) => {
  const [ recipe, setRecipe ] = useState(route.params.recipe);
  const {state} = useContext(AuthContext);

  const favouriteRecipe = () => {
    console.log(recipe.ingredientLines)
    axios
      .post(`http://${IP_ADDRESS}:3000/recipes`, {
        _user: `${state.userId}`,
        url: recipe.url,
        name: recipe.label,
        ingredients: recipe.ingredientLines,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, {marginBottom: 50}]}>
        <Text style={styles.title}>{recipe.label}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SearchRecipes')}>
          <Icon2 name="leftcircle" size={30} style={styles.backButton} />
        </TouchableOpacity>
      </View>
      <ScrollView style={[styles.card, {flexDirection: "column", flexBasis: '83%'}]}>
        <Image
          source={{
            uri: `${recipe.image}`,
          }}
          style = {{ width: 350, height: 300, padding: 5, alignSelf: "center" }}
          />
        <View style={{flexDirection: "row", alignSelf: "center"}}>
          <TouchableOpacity onPress={() => Linking.openURL(recipe.url)}>
            <Icon name="link" size={30} style={{ color: AppStyles.color.tint, padding: 20}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="list" size={30} style={{ color: AppStyles.color.tint, padding: 20, marginLeft: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => favouriteRecipe()}>
            <Icon name="star-o" size={30} style={{ color: AppStyles.color.tint, padding: 20, marginLeft: 10}} />
          </TouchableOpacity>
        </View>
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
