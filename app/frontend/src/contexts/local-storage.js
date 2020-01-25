import React, { createContext, useReducer } from 'react';

export const LocalStorageContext = createContext();
export const SET = 'set';
export const REMOVE = 'remove';
export const CLEAR = 'clear';
const localStorageName = 'RESOURCE-PLANNING';

const localStorageReducer = (state, action) => {
  let newState = {};
  switch(action.type) {
    case SET:
      newState = {...state, ...action.data};
      localStorage.setItem(localStorageName, JSON.stringify(newState));
      return newState
    
    case REMOVE:
      newState = {...state};
      delete(newState.action.key);
      localStorage.setItem(localStorageName, JSON.stringify(newState));
      return newState;
    
    case CLEAR:
      localStorage.setItem(localStorageName, JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

let initialState = {};

const LocalStorageContextProvider = props => {
  // Check if something is already in the local storage
  let existingData = localStorage.getItem(localStorageName);
  if(existingData) {
    initialState = JSON.parse(existingData);
  }
  const [localData, localDataDispatch] = useReducer(localStorageReducer, initialState);
  return (
    <LocalStorageContext.Provider value={{localDataDispatch, localData}}>
      { props.children }
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageContextProvider;
