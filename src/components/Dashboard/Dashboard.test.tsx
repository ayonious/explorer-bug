/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, getNodeText } from '@testing-library/react';

import Dashboard from '.';

it('Dashboard renders', () => {
  const { container } = render(<Dashboard />);
  expect(getNodeText(container.querySelector('h1') as HTMLElement)).toBe(
    ' Move the bug to eat all food! '
  );
});
