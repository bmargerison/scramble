import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import styles from '../styles/styleSheet'
import { IP_ADDRESS } from "@env";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import {AppStyles} from '../styles/AppStyles';
import { RecipesContext } from '../context/RecipesContext';
import axios from "axios";
import { Context as AuthContext } from '../context/AuthContext';

const MyFavouriteScreen = ({ navigation, route }) => {
  const [ recipe, setRecipe ] = useState(route.params);
  const { recipes, setRecipes } = useContext(RecipesContext)
  const { state } = useContext(AuthContext);

  const removeFavourite = () => {
    axios
      .delete(`http://${IP_ADDRESS}:3000/recipes/${recipe._id}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    axios
    .get(`http://${IP_ADDRESS}:3000/recipes/user/${state.userId}`)
    .then((res) => {
      setRecipes(res.data.reverse())
    })
    navigation.navigate('Favourites')
  }

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, {marginBottom: 50}]}>
        <Text style={styles.title}>{recipe.name}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Favourites')}>
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
          <TouchableOpacity onPress={() => removeFavourite()}>
            <Icon3 name="circle-with-cross" size={30} style={{ color: '#900', padding: 20, marginLeft: 10}} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.cardTitle, {padding: 5}]}>Ingredients</Text>
        <View style={{ alignSelf: 'flex-start' }}>
          {recipe.ingredients.map(i => <Text style={styles.recipeItems}> - {i}</Text>)}
        </View>
        <View style={{paddingBottom:20}}></View>
      </ScrollView>
    </View>
  );

}

export default MyFavouriteScreen;
