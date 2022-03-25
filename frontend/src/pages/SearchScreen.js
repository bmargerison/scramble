import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {AppStyles} from '../AppStyles';
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
      console.log(res.data.hits[3].recipe.label)
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
          data={recipes}
          keyExtractor={(list, index) => list._id}
          renderItem={({item}) => {
          return (
            <View>
              <Text>{item.recipe.label}</Text>
            </View>
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
    marginBottom: 20,
    marginTop: 50,
    alignSelf: "center",
  },
  titleContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
  }
}); 

export default SearchScreen;
