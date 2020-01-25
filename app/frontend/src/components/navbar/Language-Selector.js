import React, { useState, useContext } from 'react';

import { langContext, LANGUAGES, LANG_ARABIC, LANG_ENGLISH, SWITCH_LANGUAGE } from '../../contexts/lang';
import ButtonWrapper from '../multi-language/Button-Wrapper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const initialState = null;

const LanguageSelector = props => {

  const [anchorEl, setAnchorEl] = useState(initialState);
  const { dispatch } = useContext(langContext);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = language => {
    dispatch({type: SWITCH_LANGUAGE, language});
    setAnchorEl(initialState);
  };

  return ( 
    <div className='languageSelector'>
      <ButtonWrapper
        aria-controls="lang-button"
        aria-haspopup="true"
        styles={styles}
        placeHolders={placeHolders}
        onClick={handleClick}
      />
      <Menu
        id="lang-button"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {LANGUAGES.map((language, index) => 
          <MenuItem key={index} onClick={e => handleClose(language)}>
            {language}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

const styles = {
  [LANG_ARABIC]: {
  },
  [LANG_ENGLISH]: {
  }
}

const placeHolders = {
  [LANG_ARABIC]: 'اللغة',
  [LANG_ENGLISH]: 'Language'
}

export default LanguageSelector;