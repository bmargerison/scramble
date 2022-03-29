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
    marginLeft: 20,
    flex: 15,
  },
  addItemContainer: {
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
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
    flex: 10,
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
  cardTitle:{
    alignSelf: "auto",
    fontSize:18,
    color:"#008080",
    fontWeight:'bold',
    fontSize: AppStyles.fontSize.content,
  },
  cardItems:{
    fontSize: AppStyles.fontSize.sub,
    color:AppStyles.color.text,
    marginTop:5
  },
  scrollMarginFudge: {
    marginBottom: 50
  },
  titleContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
  }
}); 

export default styles;