import React, { useContext } from 'react';
import LanguageSelector from './Language-Selector';
import { Link } from 'react-router-dom';
import ButtonWrapper from '../multi-language/Button-Wrapper';
import { LANG_ENGLISH, LANG_ARABIC } from '../../contexts/lang';
import { AuthContext } from '../../contexts/auth';
import Logout from './Logout-Button';

const Navbar = props => {
  const { authState } = useContext(AuthContext);

  return ( 
    <nav className='navbar'>
      <LanguageSelector />
      {
        authState.isLoggedIn? <Logout />:
        /* TODO: Check if page is login page */ false?
        undefined:
        <Link to={'/login'}>
        <ButtonWrapper
          styles={styles.buttons}
          placeHolders={placeHolders.loginLink}
        />
      </Link>
      }
    </nav>
  );
}

const styles = {
  buttons: {
    [LANG_ENGLISH]: {},
    [LANG_ARABIC]: {}
  }
}

const placeHolders = {
  loginLink: {
    [LANG_ENGLISH]: 'Login',
    [LANG_ARABIC]: 'تسجيل الدخول'
  }
}

export default Navbar;