import React, { useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from "axios";
import styles from '../styles/styleSheet'
import { IP_ADDRESS } from "@env";
import { Context as AuthContext } from '../context/AuthContext';
import { RecipesContext } from '../context/RecipesContext';

const FavouritesScreen = ({ navigation, route }) => {
  const { recipes, setRecipes } = useContext(RecipesContext)
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = () => {
      axios
      .get(`http://${IP_ADDRESS}:3000/recipes/user/${state.userId}`)
      .then((res) => {
        setRecipes(res.data.reverse())
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
            <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate('MyFavourite', item)}>
              <Image
                source={{
                  uri: `${item.image}`,
                }}
                style = {{ width: 100, height: 100 }}
              />
              <View style={{ flexDirection:'column', flexWrap: 'wrap' }}>
                <Text style={styles.label}>{item.name}</Text>
                <Text style={styles.source}> - {item.healthLabels[0]}</Text>
                <Text style={styles.source}> - {item.healthLabels[1]}</Text>
                <Text style={styles.source}> - {item.healthLabels[2]}</Text>
                <Text style={styles.source}>{item.source}</Text>
              </View>
            </TouchableOpacity>
          )}}/>
    </SafeAreaView>
  );
}

export default FavouritesScreen;
