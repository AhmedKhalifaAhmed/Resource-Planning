import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { langContext } from '../../contexts/lang';

const InputWrapper = ({placeHolders, styles, ...props}) => {
  const { language } = useContext(langContext);
  return (
    <div className="multilingual-input" >
      <TextField
        style={ styles[language] }
        placeholder={ placeHolders[language] }
        {...props}
      />
    </div>
  );
};

export default InputWrapper;