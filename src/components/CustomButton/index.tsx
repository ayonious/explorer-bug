import Button from '@mui/material/Button';
import * as React from 'react';

import { CustomButtonDiv } from './styles';

const CustomButton = (props: any) => {
  return (
    <CustomButtonDiv>
      <Button variant="contained" color="primary" onClick={props.onClick}>
        {props.title}
      </Button>
    </CustomButtonDiv>
  );
};

export default CustomButton;
