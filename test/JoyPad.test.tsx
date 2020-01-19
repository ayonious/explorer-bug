import * as React from 'react';
import * as renderer from 'react-test-renderer';
import JoyPad from '../src/components/JoyPad';

it('JoyPad renders', () => {
  const func = () => {};
  const tree = renderer.create(
    <JoyPad handleGo={func} handleLeft={func} handleRight={func} />
  );
  expect(tree).toMatchSnapshot();
});
