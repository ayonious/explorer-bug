import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Dashboard from '../src/components/Dashboard';

it('Dashboard renders', () => {
  const component = shallow(<Dashboard />);
  expect(component.exists('Greeting')).toEqual(true);
  expect(component.exists('JoyPad')).toEqual(true);
  expect(component.exists('BoardResults')).toEqual(true);
});
