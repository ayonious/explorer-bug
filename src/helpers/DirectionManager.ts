const directionsR = [0, 1, 0, -1];
const directionsC = [1, 0, -1, 0];

export const iconScale = [
  'rotate(90deg)',
  'rotate(180deg)',
  'rotate(270deg)',
  '',
];

export interface RobotState {
  col: number;
  row: number;
  direction: number;
}

export const robotPosToFlightStyle = (robotState: RobotState) => {
  return {
    transform: iconScale[robotState.direction],
  };
};

export const ROW_LIMIT = 10;
export const COL_LIMIT = 10;

export const moveForward = (currentState: RobotState) => {
  const nextCol = currentState.col + directionsC[currentState.direction];
  const nextRow = currentState.row + directionsR[currentState.direction];

  if (
    nextCol >= 0 &&
    nextCol < COL_LIMIT &&
    nextRow >= 0 &&
    nextRow < ROW_LIMIT
  ) {
    currentState.col = nextCol;
    currentState.row = nextRow;
  }
  return currentState;
};

export const getnewScore = (
  currentState: RobotState,
  currentScore: number,
  gridState: number[][]
) => {
  if (gridState[currentState.row][currentState.col]) {
    return currentScore + 1;
  }
  return currentScore;
};

export const getnewGrid = (currentState: RobotState, gridState: number[][]) => {
  gridState[currentState.row][currentState.col] = 0;
  return gridState;
};

export const turnLeft = (currentState: RobotState) => {
  currentState.direction = (currentState.direction + 3) % 4;
  return currentState;
};

export const turnRight = (currentState: RobotState) => {
  currentState.direction = (currentState.direction + 1) % 4;
  return currentState;
};
