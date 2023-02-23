/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import Greeting from '.';

it('Greeting renders', () => {
  const tree = render(<Greeting />);
  expect(tree).toMatchSnapshot();
});
