import * as React from 'react';

import { CustomDiv } from './styles';

const ScoreCard = ({ score }: { score: number }) => {
  return (
    <CustomDiv>
      <h1> Scores: {score} </h1>
    </CustomDiv>
  );
};

export default ScoreCard;
