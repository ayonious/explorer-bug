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

it('Logs are toggled with the keyboard shortcut', () => {
  render(<Dashboard />);

  // Initially logs should be hidden
  expect(screen.queryByTestId('game-logs')).not.toBeInTheDocument();

  // Toggle logs with the keyboard shortcut
  fireEvent.keyDown(document, { key: 'l' });

  // Logs should now be visible
  expect(screen.getByTestId('game-logs')).toBeInTheDocument();

  // Toggle logs off again
  fireEvent.keyDown(document, { key: 'l' });

  // Logs should be hidden again
  expect(screen.queryByTestId('game-logs')).not.toBeInTheDocument();
});

it('Logs are generated when moving the bug', () => {
  // Clear logs before test
  const { gameLogger } = require('../../helpers/Logger');
  gameLogger.clearLogs();
  
  render(<Dashboard />);

  // Show logs
  fireEvent.keyDown(document, { key: 'l' });

  // Initially should have only game start log
  const logItems = screen.getAllByRole('listitem');
  expect(logItems.length).toBeGreaterThanOrEqual(1);
  expect(logItems[0].textContent).toContain('GAME_START');

  // Move bug
  const goButton = screen.getByTestId('move-button-Go');
  fireEvent.click(goButton);

  // Should have additional movement log
  const updatedLogItems = screen.getAllByRole('listitem');
  expect(updatedLogItems.length).toBeGreaterThan(logItems.length);
  expect(updatedLogItems[updatedLogItems.length - 1].textContent).toContain('MOVEMENT');
});

it('Reset button resets the game state', () => {
  render(<Dashboard />);

  const goButton = screen.getByTestId('move-button-Go');
  const resetButton = screen.getByTestId('reset-game-button');

  // Move bug a few times
  fireEvent.click(goButton);
  fireEvent.click(goButton);
  fireEvent.click(goButton);
  
  // Verify bug has moved
  checkIfPositionContainsBug(0, 3);
  
  // Reset game
  fireEvent.click(resetButton);
  
  // Verify bug is back at starting position
  checkIfPositionContainsBug(0, 0);
});

it('waits for a click after completing a level and starts the next level', () => {
  // Generate a board with exactly one food, directly ahead of the bug.
  const random = jest.spyOn(Math, 'random').mockReturnValue(0.99);
  random.mockReturnValueOnce(0.99).mockReturnValueOnce(0);
  render(<Dashboard />);

  expect(screen.queryByTestId('next-level-button')).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId('move-button-Go'));
  expect(screen.getByRole('status')).toHaveTextContent('Hurray! Level 1 complete!');

  fireEvent.click(screen.getByTestId('move-button-Go'));
  expect(screen.getByTestId('cell-0-1').querySelector('[data-testid="bug-icon"]')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('next-level-button'));
  expect(screen.queryByTestId('next-level-button')).not.toBeInTheDocument();
  expect(screen.getByText('Level 2')).toBeInTheDocument();
  expect(screen.getByTestId('cell-0-0').querySelector('[data-testid="bug-icon"]')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('move-button-Go'));
  expect(screen.getByRole('status')).toHaveTextContent('Hurray! Level 2 complete!');
  fireEvent.click(screen.getByTestId('reset-game-button'));
  expect(screen.getByText('Level 1')).toBeInTheDocument();
  expect(screen.queryByTestId('next-level-button')).not.toBeInTheDocument();
  random.mockRestore();
});
