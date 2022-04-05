import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { APP_ID, APP_KEY } from "@env";
import axios from "axios";
import styles from '../styles/styleSheet'

const SearchScreen = ({ navigation, route }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recipes, setRecipes] = useState([])

  const searchDatabase = async () => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`

    axios
    .get(url)
    .then((res) => {
      setRecipes(res.data.hits)
    })
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Search Recipes</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
            round
            lightTheme={true}
            containerStyle={styles.searchBar}
            searchIcon={{ size: 24 }}
            onChangeText={setSearchTerm}
            onSubmitEditing={searchDatabase}
            placeholder="Type Here..."
            value={searchTerm}
          />
      </View>
      <FlatList 
          style={{ marginBottom: 165 }}
          data={recipes}
          keyExtractor={(list, index) => list.title}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('RecipeScreen', item)}>
              <Image
                source={{
                  uri: `${item.recipe.image}`,
                }}
                style = {{ width: 100, height: 100 }}
              />
              <View style={{ flexDirection:'column', flexWrap: 'wrap' }}>
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

export default SearchScreen;
