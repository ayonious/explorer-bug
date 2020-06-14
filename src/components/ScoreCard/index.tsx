import * as React from 'react';

import { CustomDiv } from './styles';

const ScoreCard = ({ score }: { score: number }) => {
  return (
    <CustomDiv>
      <h1> Score: {score} </h1>
    </CustomDiv>
  );
};

export default ScoreCard;
