import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {AppStyles} from '../styles/AppStyles';
import { APP_ID, APP_KEY } from "@env";
import axios from "axios";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState([])

  const searchDatabase = async () => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`

    axios
    .get(url)
    .then((res) => {
      setRecipes(res.data.hits)
      console.log(res.data.hits[0].recipe.source)
    })
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.leftTitle]}>Search Recipes</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
            round
            lightTheme={true}
            containerStyle={{backgroundColor: AppStyles.color.background, borderBottomColor: 'transparent',
            borderTopColor: 'transparent'}}
            searchIcon={{ size: 24 }}
            onChangeText={setSearchTerm}
            onSubmitEditing={searchDatabase}
            placeholder="Type Here..."
            value={searchTerm}
          />
      </View>
      <FlatList 
          style={styles.margin}
          data={recipes}
          keyExtractor={(list, index) => list.title}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card}>
              <Image
                source={{
                  uri: `${item.recipe.image}`,
                }}
                style = {{ width: 100, height: 100 }}
              />
              <View style={styles.recipe}>
                <Text style={styles.label}>{item.recipe.label}</Text>
                <Text style={styles.source}> - {item.recipe.healthLabels[0]}</Text>
                <Text style={styles.source}> - {item.recipe.healthLabels[1]}</Text>
                <Text style={styles.source}> - {item.recipe.healthLabels[2]}</Text>
                <Text style={styles.source}>{item.recipe.source}</Text>
              </View>
            </TouchableOpacity>
          )}}/>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
  },
  leftTitle: {
    marginLeft: 20,
    flex: 15,
  },
  searchContainer: {
    width: "90%",
    padding: 10,
    marginBottom: 10,
    marginTop: 50,
    alignSelf: "center",
  },
  titleContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  card:{
    flex: 1,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 10,
    marginHorizontal:20,
    backgroundColor:"white",
    flexBasis: '80%',
    padding: 10,
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  recipe: {
    flexDirection:'column',
    flexWrap: 'wrap',
  },
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
  },
  margin: {
    marginBottom: 200
  },
}); 

export default SearchScreen;
