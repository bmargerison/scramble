import {AppStyles} from './AppStyles';
import { View, Button, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

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
  addContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  buttonText: {
    color: AppStyles.color.white,
    alignSelf: "center",
    fontSize: AppStyles.fontSize.content,
  },
  titleContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
  }
}); 

export default styles;