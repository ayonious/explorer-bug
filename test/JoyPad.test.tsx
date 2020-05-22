import * as React from 'react';
import { render } from '@testing-library/react';
import JoyPad from '../src/components/JoyPad';

it('JoyPad renders', () => {
  const func = () => {};
  const { container } = render(
    <JoyPad handleGo={func} handleLeft={func} handleRight={func} />
  );
  expect(container).toMatchSnapshot();
});
