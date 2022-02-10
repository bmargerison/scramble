import createDataContext from './createDataContext';
import axios from "axios";

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
      .post("http://localhost:3000/users", {
        username: username,
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => window.alert(err.response.data.message));
    axios
      .post("http://localhost:3000/users/login", {
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
      .catch((err) => window.alert(err.response.data.message));
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
        dispatch({
          type: 'signin',
          payload: {
            token: res.data.token,
            userId: res.data.user._id
          },
        })
      })
      .catch((err) => window.alert(err.response.data.message));
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