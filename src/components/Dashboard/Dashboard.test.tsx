/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, getNodeText, screen, fireEvent } from '@testing-library/react';

import Dashboard from '.';

const checkIfPositionContainsBug = (row: number, col: number) => {
  expect(screen.getByTestId(`cell-${row}-${col}`)).toMatchSnapshot();
};

it('Dashboard renders', () => {
  const { container } = render(<Dashboard />);
  expect(getNodeText(container.querySelector('h1') as HTMLElement)).toBe(
    ' Move the bug to eat all food! '
  );
});

it('CountryResults Test Rotation', () => {
  render(<Dashboard />);

  const leftButton = screen.getByTestId('move-button-Left');
  const rightButton = screen.getByTestId('move-button-Right');

  fireEvent.click(leftButton);
  checkIfPositionContainsBug(0, 0);

  fireEvent.click(leftButton);
  checkIfPositionContainsBug(0, 0);

  fireEvent.click(rightButton);
  checkIfPositionContainsBug(0, 0);
});

it('CountryResults Test More Movement', () => {
  render(<Dashboard />);

  const goButton = screen.getByTestId('move-button-Go');

  fireEvent.click(goButton);
  fireEvent.click(goButton);
  fireEvent.click(goButton);
  checkIfPositionContainsBug(0, 3);
});
