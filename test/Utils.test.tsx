import * as React from 'react';
import { render } from '@testing-library/react';
import { ScoreCard, Greeting, CustomButton } from '../src/components/Utils';

it('ScoreCard renders', () => {
  const tree = render(<ScoreCard score={10} />);
  expect(tree).toMatchSnapshot();
});

it('Greeting renders', () => {
  const tree = render(<Greeting />);
  expect(tree).toMatchSnapshot();
});

it('CustomButton renders', () => {
  const tree = render(<CustomButton title={'Score of Game'} />);
  expect(tree).toMatchSnapshot();
});
