import createDataContext from './createDataContext';
import axios from "axios";
import { IP_ADDRESS } from "@env";

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, userId: ''};
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
      .post(`http://${IP_ADDRESS}:3000/users`, {
        username: username,
        email: email,
        password: password
      })
      .then((res) => {
        window.alert("Sign up successful")
        axios
        .post(`http://${IP_ADDRESS}:3000/users/login`, {
          email: email,
          password: password
        })
        .then(async (res) => {
          dispatch({
            type: 'signin',
            payload: {
              token: res.data.token,
              userId: res.data.user._id
            },
          })
        })
        .catch((err) => window.alert(err.response.data.message))
      })
      .catch((err) => {
        console.log(err);
        if (Array.isArray(err.response.data.message)) {
          err.response.data.message.forEach(message => {
            window.alert(message.msg)
          })
        } else {
          window.alert(err.response.data.message)
        }
      })
  };
};

const signin = dispatch => {
  return ({email, password}) => {
    console.log(email)
    console.log(password)
    axios
      .post(`http://${IP_ADDRESS}:3000/users/login`, {
        email: email,
        password: password
      })
      .then(async (res) => {
        dispatch({
          type: 'signin',
          payload: {
            token: res.data.token,
            userId: res.data.user._id
          },
        })
      })
      .catch((err) => window.alert(err.response.data.message))
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