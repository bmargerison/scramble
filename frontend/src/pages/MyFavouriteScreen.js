import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking, ScrollView } from 'react-native';
import styles from '../styles/styleSheet'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {AppStyles} from '../styles/AppStyles';

const MyFavouriteScreen = ({ navigation, route }) => {
  const [ recipe, setRecipe ] = useState(route.params);

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
            <TouchableOpacity>
              <Icon name="star" size={30} style={{ color: AppStyles.color.tint, padding: 20, marginLeft: 10}} />
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
