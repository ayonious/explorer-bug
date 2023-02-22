/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { expect } from '@jest/globals';
import React from 'react';

import JoyPad from '../src/components/JoyPad';

it('JoyPad renders', () => {
  const func = () => {};
  const { container } = render(
    <JoyPad handleGo={func} handleLeft={func} handleRight={func} />
  );
  expect(container).toMatchSnapshot();
});
