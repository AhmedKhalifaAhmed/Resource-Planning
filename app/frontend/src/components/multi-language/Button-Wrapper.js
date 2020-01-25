import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { langContext } from '../../contexts/lang';

const ButtonWrapper = ({placeHolders, styles, ...props}) => {
  const { language } = useContext(langContext);
  return (
    <div className="multilingual-button" >
      <Button style={ styles[language] } {...props}>
        {placeHolders[language]}
      </Button>
    </div>
  );
};

export default ButtonWrapper;