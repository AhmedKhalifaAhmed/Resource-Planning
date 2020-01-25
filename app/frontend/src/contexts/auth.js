import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { LocalStorageContext, CLEAR as LOCAL_DATA_CLEAR, SET as LOCAL_DATA_SET } from './local-storage';

export const AuthContext = createContext();
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REFRESH_TOKEN = 'refresh token';

const authReducer = (state, action) => {
  switch(action.type) {

    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
      };

    case REFRESH_TOKEN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: undefined,
      };
      
    default:
      return state;
  }
};

const initialState = {
  isLoggedIn: false,
  token: null,
};

const AuthContextProvider = props => {
  // Initialize context
  const { localData, localDataDispatch } = useContext(LocalStorageContext);
  // Check if there is a token in the browser
  if(localData.token) {
    fetch('/api/auth/check-token', { headers: { 'authorization': `Bearer ${localData.token}` } })
    .then(res => {
      if(res.status === 200) {
        // Restore user data
        initialState.isLoggedIn = true;
        initialState.token = localData.token;
      } else {
        // Token invalid/expired Clear local data
        localDataDispatch({type: LOCAL_DATA_CLEAR});    
      }
    })
    .catch(error => console.log(error));
  } else if(Object.keys(localData).length > 0) {
    // Clear local data
    localDataDispatch({type: LOCAL_DATA_CLEAR});
  }

  const [authState, authDispatch] = useReducer(authReducer, initialState);

  // Attach a hook to update tokens in local storage
  useEffect(() => {
      if(authState.token === initialState.token){
      } else if(authState.token) {
        localDataDispatch({type: LOCAL_DATA_SET, data: {token: authState.token}});
      } else {
        localDataDispatch({type: LOCAL_DATA_CLEAR});
      }
    },
    [authState, localDataDispatch]);
  return (
    <AuthContext.Provider value={{authDispatch, authState}}>
      { props.children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;