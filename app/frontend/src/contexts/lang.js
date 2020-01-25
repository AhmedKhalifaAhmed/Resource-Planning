import React, { createContext, useReducer } from 'react';

export const langContext = createContext();
export const LANG_ARABIC = 'العربية';
export const LANG_ENGLISH = 'English';
export const LANGUAGES = [LANG_ARABIC, LANG_ENGLISH];
export const SWITCH_LANGUAGE = 'switch';

const langReducer = (state, action) => {
  switch(action.type) {
    case SWITCH_LANGUAGE:
      // Make sure the language exists
      if(LANGUAGES.indexOf(action.language) === -1){
        return state;
      }
      return action.language;

    default:
      return state;
  }
};

const initialState = LANGUAGES[0];

const LangContextProvider = props => {
  const [language, dispatch] = useReducer(langReducer, initialState);
  return (
    <langContext.Provider value={{dispatch, language}}>
      { props.children }
    </langContext.Provider>
  );
};

export default LangContextProvider;
