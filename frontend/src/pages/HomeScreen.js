import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, Button } from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [lists, setLists] = useState([])
  const {state} = useContext(AuthContext);

  useEffect(() => {
    const url = `http://localhost:3000/lists/user/${state.userId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setLists(json)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {lists.map(list => {
        return(
          <Text key={list._id}>{list._user}</Text>
        )
      })}
    </>
  );
}

export default HomeScreen;
