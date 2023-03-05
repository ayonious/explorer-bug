/**
 * @jest-environment jsdom
 */

import {
  moveForward,
  turnLeft,
  turnRight,
  getNewGrid,
  getNewScore,
  robotPosToFlightStyle,
} from './DirectionManager';

it('Movements', () => {
  [0, 1, 2, 3].forEach((direction) => {
    [moveForward, turnLeft, turnRight].forEach((turnFn) => {
      expect(
        turnFn({
          col: 1,
          row: 2,
          direction,
        })
      ).toMatchSnapshot();
    });
  });
});

it('Next', () => {
  expect(
    getNewGrid(
      {
        col: 1,
        row: 2,
        direction: 0,
      },
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 0],
      ]
    )
  ).toStrictEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  expect(
    getNewScore(
      {
        col: 1,
        row: 2,
        direction: 0,
      },
      123,
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 0],
      ]
    )
  ).toBe(124);

  expect(
    getNewScore(
      {
        col: 1,
        row: 2,
        direction: 0,
      },
      123,
      [
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
      ]
    )
  ).toBe(123);
});

it('RobotState', () => {
  [0, 1, 2, 3].forEach((direction) => {
    expect(
      robotPosToFlightStyle({
        col: 2,
        row: 3,
        direction,
      })
    ).toMatchSnapshot();
  });
});
