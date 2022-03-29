import React, { useContext } from "react";
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/styleSheet'
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
  const {state, signout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.leftTitle]}>Your account</Text>
      </View>
      <TouchableOpacity style={styles.addContainer} onPress={() => signout()}>
        <Text style={styles.buttonText}>Sign Out</Text>  
      </TouchableOpacity>
    </View>
  );
}

export default AccountScreen;
