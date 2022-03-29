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
  scrollMarginFudge2: {
    marginBottom: 20
  },
  titleContainer: {
    marginTop: 50,
    flex: 1,
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  modalAddButton: {
    width: 100,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 5,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: AppStyles.color.white,
    padding: 35,
    alignItems: "center",
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalBody: {
    borderRadius: 20,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
    backgroundColor: AppStyles.color.white,
    fontSize: AppStyles.fontSize.content,
  },
  modalTextView: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: AppStyles.color.white,
  },
  backButton: {
    color: AppStyles.color.tint,
    flex: 2,
  },
  heading: {
    fontSize: AppStyles.fontSize.content,
    backgroundColor: AppStyles.color.tint,
    color:AppStyles.color.white,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    padding: 2,
  },
  listItems: {
    fontSize: AppStyles.fontSize.content,
    color:AppStyles.color.text,
    marginTop: 2,
    marginBottom: 2,
  },
  checkboxStyle: {
    color: AppStyles.color.white,
    textAlign: "center",
    marginLeft: 20,
  },
}); 

export default styles;