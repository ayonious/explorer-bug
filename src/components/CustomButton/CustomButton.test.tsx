/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import CustomButton from '.';

it('CustomButton renders', () => {
  const tree = render(
    <CustomButton title={'Score of Game'} onClick={() => {}} />
  );
  expect(tree).toMatchSnapshot();
});
