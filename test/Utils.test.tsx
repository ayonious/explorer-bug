import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ScoreCard, Greeting, CustomButton } from '../src/components/Utils';

it('ScoreCard renders', () => {
  const tree = renderer.create(<ScoreCard score={10} />);
  expect(tree).toMatchSnapshot();
});

it('Greeting renders', () => {
  const tree = renderer.create(<Greeting />);
  expect(tree).toMatchSnapshot();
});

it('CustomButton renders', () => {
  const tree = renderer.create(<CustomButton title={'Score of Game'} />);
  expect(tree).toMatchSnapshot();
});
