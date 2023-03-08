import Button from '@mui/material/Button';
import * as React from 'react';

import { CustomButtonDiv } from './styles';

interface Props {
  title: string;
  onClick: () => void;
}

const CustomButton = (props: Props) => {
  return (
    <CustomButtonDiv>
      <Button
        variant="contained"
        color="primary"
        onClick={props.onClick}
        data-testid={`move-button-${props.title}`}
      >
        {props.title}
      </Button>
    </CustomButtonDiv>
  );
};

export default CustomButton;
