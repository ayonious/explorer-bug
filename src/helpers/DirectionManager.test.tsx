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
  ROW_LIMIT,
  COL_LIMIT,
} from './DirectionManager';

describe('Robot Movement Tests', () => {
  it('should handle all basic movement combinations', () => {
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

  it('should prevent robot from moving outside grid boundaries', () => {
    // Test upper boundary
    const upState = {
      col: 1,
      row: 0,
      direction: 0, // Facing up
    };
    const upResult = moveForward(upState);
    expect(upResult.row).toBe(0); // Should not move up

    // Test lower boundary
    const downState = {
      col: 1,
      row: ROW_LIMIT - 1,
      direction: 2, // Facing down
    };
    const downResult = moveForward(downState);
    expect(downResult.row).toBe(ROW_LIMIT - 1); // Should not move down

    // Test left boundary
    const leftState = {
      col: 0,
      row: 1,
      direction: 3, // Facing left
    };
    const leftResult = moveForward(leftState);
    expect(leftResult.col).toBe(0); // Should not move left

    // Test right boundary
    const rightState = {
      col: COL_LIMIT - 1,
      row: 1,
      direction: 1, // Facing right
    };
    const rightResult = moveForward(rightState);
    expect(rightResult.col).toBe(COL_LIMIT - 1); // Should not move right
  });

  it('should correctly rotate through all directions', () => {
    let state = { col: 1, row: 1, direction: 0 };
    
    // Test full rotation to the right
    state = turnRight({ ...state });
    expect(state.direction).toBe(1);
    state = turnRight({ ...state });
    expect(state.direction).toBe(2);
    state = turnRight({ ...state });
    expect(state.direction).toBe(3);
    state = turnRight({ ...state });
    expect(state.direction).toBe(0);

    // Reset state
    state = { col: 1, row: 1, direction: 0 };

    // Test full rotation to the left
    state = turnLeft({ ...state });
    expect(state.direction).toBe(3);
    state = turnLeft({ ...state });
    expect(state.direction).toBe(2);
    state = turnLeft({ ...state });
    expect(state.direction).toBe(1);
    state = turnLeft({ ...state });
    expect(state.direction).toBe(0);
  });
});

describe('Grid and Score Management Tests', () => {
  it('should correctly update grid after movement', () => {
    const initialGrid = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 1, 1],
    ];

    const robotState = {
      col: 1,
      row: 1,
      direction: 0,
    };

    const newGrid = getNewGrid({ ...robotState }, JSON.parse(JSON.stringify(initialGrid)));
    expect(newGrid[1][1]).toBe(0); // Food should be eaten
  });

  it('should correctly calculate score changes', () => {
    const grid = [
      [1, 0, 1],
      [0, 1, 0],
      [1, 1, 1],
    ];

    // Test score increase when food is eaten
    expect(
      getNewScore(
        { col: 1, row: 1, direction: 0 },
        10,
        grid
      )
    ).toBe(11);

    // Test score remains same when no food
    expect(
      getNewScore(
        { col: 0, row: 1, direction: 0 },
        10,
        grid
      )
    ).toBe(10);
  });

  it('should handle empty and full grids', () => {
    const emptyGrid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const fullGrid = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ];

    const robotState = {
      col: 1,
      row: 1,
      direction: 0,
    };

    // Empty grid should remain unchanged after deep clone
    const newEmptyGrid = getNewGrid({ ...robotState }, JSON.parse(JSON.stringify(emptyGrid)));
    expect(newEmptyGrid).toEqual(emptyGrid);
    
    // Full grid should change at robot position
    const newFullGrid = getNewGrid({ ...robotState }, JSON.parse(JSON.stringify(fullGrid)));
    expect(newFullGrid[1][1]).toBe(0);
  });
});

describe('Robot Style Tests', () => {
  it('should return correct rotation styles for all directions', () => {
    const robotState = { col: 2, row: 3, direction: 0 };
    
    // Test all directions
    [0, 1, 2, 3].forEach((direction) => {
      expect(
        robotPosToFlightStyle({
          ...robotState,
          direction,
        })
      ).toMatchSnapshot();
    });
  });

  it('should handle edge positions', () => {
    // Test corners
    const corners = [
      { col: 0, row: 0 },
      { col: COL_LIMIT - 1, row: 0 },
      { col: 0, row: ROW_LIMIT - 1 },
      { col: COL_LIMIT - 1, row: ROW_LIMIT - 1 },
    ];

    corners.forEach(({ col, row }) => {
      expect(
        robotPosToFlightStyle({
          col,
          row,
          direction: 0,
        })
      ).toMatchSnapshot();
    });
  });
});
