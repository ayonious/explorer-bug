import * as React from 'react';
import { RED_FOOD_POINTS } from '../../helpers/DirectionManager';

const Food = ({ points }: { points: number }) => {
  const red = points === RED_FOOD_POINTS;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke={red ? '#dc2626' : '#15803d'} strokeWidth="1"
      strokeLinecap="round" strokeLinejoin="round" role="img"
      aria-label={`${red ? 'Red strawberry' : 'Green apple'}, ${points} ${points === 1 ? 'point' : 'points'}`}
      data-testid="food-icon">
      <path d={red
        ? 'M5 9c-5 4 4 12 7 13 3-1 12-9 7-13ZM12 9 5 5l5 1 2-4 2 4 5-1ZM8 12h.01M15 12h.01M11 16h.01M15 16h.01'
        : 'M12 7c-7-6-12 3-5 12 2 3 4 0 5 0s3 3 5 0c7-9 2-18-5-12ZM12 7V3m0 3c1-3 4-3 5-3'} />
    </svg>
  );
};

export default Food;
