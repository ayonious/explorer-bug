/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import ScoreCard from '.';

it('ScoreCard renders', () => {
  const tree = render(<ScoreCard score={10} />);
  expect(tree).toMatchSnapshot();
});
