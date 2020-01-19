import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ScoreCard } from '../components/Utils';

it('CountryResults renders', () => {
  const tree = renderer.create(<ScoreCard score={10} />);
  expect(tree).toMatchSnapshot();
});
