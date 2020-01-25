import React, { useContext } from "react";
import ButtonWrapper from "../multi-language/Button-Wrapper";
import { LANG_ENGLISH, LANG_ARABIC } from '../../contexts/lang';
import { AuthContext } from '../../contexts/auth';


const Logout = props => {
  const { authDispatch, LOGOUT } = useContext(AuthContext);
  const logout = () => {
    // TODO: Add logout route
    authDispatch({type: LOGOUT});
  }

  return ( 
    <div className="ButtonWrapper">
      <ButtonWrapper
        placeHolders={placeHolders}
        styles={styles}
        onClick={logout}

      />
    </div>
  );
};

const styles = {
  [LANG_ENGLISH]: {},
  [LANG_ARABIC]: {}
}

const placeHolders = {
  [LANG_ENGLISH]: 'Logout',
  [LANG_ARABIC]: 'تسجيل الخروج'
};

export default Logout;