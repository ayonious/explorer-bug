/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, getNodeText, screen, fireEvent } from '@testing-library/react';

import Dashboard from '.';
import { COL_LIMIT, ROW_LIMIT } from '../../helpers/DirectionManager';

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

it('EndGamePlay', () => {
  render(<Dashboard />);

  const goButton = screen.getByTestId('move-button-Go');
  const leftButton = screen.getByTestId('move-button-Left');
  const rightButton = screen.getByTestId('move-button-Right');

  const forward = () => {
    fireEvent.click(goButton);
  };

  const turnLeft = () => {
    fireEvent.click(leftButton);
  };
  const turnRight = () => {
    fireEvent.click(rightButton);
  };

  const goAllTheWayTillEndOfBoard = () => {
    for (let i = 0; i < COL_LIMIT; i++) {
      forward();
    }
  };

  for (let j = 1; j < ROW_LIMIT; j++) {
    goAllTheWayTillEndOfBoard();
    if (j % 2 === 1) {
      turnLeft();
      forward();
      turnRight();
    } else {
      turnRight();
      forward();
      turnLeft();
    }
  }
});
