import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import {AppStyles} from '../AppStyles';

const SearchScreen = () => {
  const [search, setSearch] = useState('')

  useEffect(() => {

  }, []);

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
            onChangeText={setSearch}
            onClear={(text) => searchFilterFunction('')}
            onSubmitEditing={()=>console.log(`User typed ${search}`)}
            placeholder="Type Here..."
            value={search}
          />
      </View>
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
