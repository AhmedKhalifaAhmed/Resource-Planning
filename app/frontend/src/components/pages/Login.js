import React, { useState, useContext } from 'react';
import { AuthContext, LOGIN } from '../../contexts/auth';
import postData from '../../api/requests/post';
import { LANG_ARABIC, LANG_ENGLISH } from '../../contexts/lang'
import InputWrapper from '../multi-language/Input-Wrapper';
import ButtonWrapper from '../multi-language/Button-Wrapper';


const initialState = {
  username: '',
  password: ''
}

const Login = (props) => {
  const [credentials, setCredentials] = useState(initialState);
  const updateUsername = event => {
    setCredentials({...credentials, username: event.target.value});
  }
  const updatePassword = event => {
    setCredentials({...credentials, password: event.target.value});
  }
  const {authDispatch} = useContext(AuthContext);

  const login = async event => {
    event.preventDefault();
    try{
      const res = await postData('/api/auth/login', credentials);
      if(res.error){
        alert(res.error.message || res.error);
      } else if(!res.token){
        alert('Could not login: Server Issue');
        return;
      } else {
        authDispatch({type: LOGIN, token: res.token});
        props.history.push('/');
      }
    } catch(error) {
      alert('Error communicating with the server');
    }
  };

  return ( 
    <div>
      <form onSubmit={login}>
        <InputWrapper 
          type="text"
          styles={styles.input}
          placeHolders={placeHolders.usernameInput}
          value={credentials.username}
          onChange={updateUsername}
        />
        <InputWrapper 
          type="password"
          styles={styles.input}
          placeHolders={placeHolders.passwordInput}
          value={credentials.password}
          onChange={updatePassword}
        />
        <ButtonWrapper
          styles={styles.button}
          type="submit"
          placeHolders={placeHolders.commitButton}
        />
      </form>
    </div>
  );
}

const styles = {
  input: {
    [LANG_ARABIC]: {

    },
    [LANG_ENGLISH]: {
  
    }
  },
  button: {
    [LANG_ARABIC]: {

    },
    [LANG_ENGLISH]: {
  
    }
  }
};

const placeHolders = {
  usernameInput: {
    [LANG_ARABIC]: 'اسم المستخدم',
    [LANG_ENGLISH]: 'Username',
  },
  passwordInput: {
    [LANG_ARABIC]: 'كلمة السر',
    [LANG_ENGLISH]: 'Password',
  },
  commitButton: {
    [LANG_ENGLISH]: 'Login',
    [LANG_ARABIC]: 'تسجيل الدخول'
  }
};

export default Login;