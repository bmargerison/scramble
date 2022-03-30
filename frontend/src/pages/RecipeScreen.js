import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import styles from '../styles/styleSheet'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {AppStyles} from '../styles/AppStyles';

const RecipeScreen = ({ navigation, route }) => {
  const [ recipe, setItem ] = useState(route.params.recipe);

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
          <TouchableOpacity>
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
