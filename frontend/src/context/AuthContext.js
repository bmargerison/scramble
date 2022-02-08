import createDataContext from './createDataContext';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, userId: '', email: ''};
    case 'signin':
    case 'signup':
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};

const signup = dispatch => {
  return ({username, email, password}) => {
    axios
      .post("http://localhost:3000/users", {
        username: username,
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res.data);
      })
    axios
      .post("http://localhost:3000/users/login", {
        email: email,
        password: password
      })
      .then(async (res) => {
        console.log(res.data.token)
        setLoginStatus(true)
        AsyncStorage.setItem("token", res.data.token)
        AsyncStorage.setItem("userId", res.data.user._id) 
      })
      .catch((err) => console.log(err));
      dispatch({
        type: 'signin',
        payload: {
          token: AsyncStorage.getItem("token"),
          userId: AsyncStorage.getItem("userId")
        },
      });
  };
};

const signin = dispatch => {
  return ({email, password}) => {
    axios
    .post("http://localhost:3000/users/login", {
      email: email,
      password: password
    })
    .then(async (res) => {
      console.log(res.data.token)
      setLoginStatus(true)
      AsyncStorage.setItem("token", res.data.token)
      AsyncStorage.setItem("userId", res.data.user._id) 
    })
    .catch((err) => console.log(err));
    dispatch({
      type: 'signin',
      payload: {
        token: AsyncStorage.getItem("token"),
        userId: AsyncStorage.getItem("userId")
      },
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup},
  {token: null, userId: ''},
);