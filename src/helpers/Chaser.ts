import { COL_LIMIT, ROW_LIMIT } from './DirectionManager';
import type { RobotState } from './DirectionManager';

// Choose among legal adjacent squares, favoring those closer to the player.
export const moveChaser = (
  bug: RobotState,
  player: RobotState,
  random: () => number = Math.random
): RobotState => {
  const moves = [
    { row: bug.row, col: bug.col + 1, direction: 0 },
    { row: bug.row + 1, col: bug.col, direction: 1 },
    { row: bug.row, col: bug.col - 1, direction: 2 },
    { row: bug.row - 1, col: bug.col, direction: 3 },
  ].filter(move => move.row >= 0 && move.row < ROW_LIMIT && move.col >= 0 && move.col < COL_LIMIT);
  const distance = (position: RobotState) =>
    Math.abs(position.row - player.row) + Math.abs(position.col - player.col);
  const toward = moves.filter(move => distance(move) < distance(bug));
  const choices = random() < 0.8 && toward.length ? toward : moves;
  return choices[Math.floor(random() * choices.length)];
};
