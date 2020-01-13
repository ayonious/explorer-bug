import Button from '@material-ui/core/Button';
import * as React from 'react';

import { CustomButtonDiv, CustomDiv } from '../styledcomponents/styles';

export function CustomButton(props: any) {
  return (
    <CustomButtonDiv>
      <Button variant="contained" color="primary" onClick={props.onClick}>
        {props.title}
      </Button>
    </CustomButtonDiv>
  );
}

export function Greeting() {
  return (
    <CustomDiv>
      <h1> Move the bug to eat all food! </h1>
    </CustomDiv>
  );
}

export function ScoreCard({ score }: { score: number }) {
  return (
    <CustomDiv>
      <h1> Score: {score} </h1>
    </CustomDiv>
  );
}
