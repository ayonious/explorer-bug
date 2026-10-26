import { moveChaser } from './Chaser';

it('chases on rolls below 80% and allows a random direction otherwise', () => {
  const bug = { row: 3, col: 3, direction: 0 };
  const player = { row: 0, col: 0, direction: 0 };
  const chaseRolls = [0.79, 0];
  expect(moveChaser(bug, player, () => chaseRolls.shift()!)).toEqual({ row: 3, col: 2, direction: 2 });
  const randomRolls = [0.8, 0];
  expect(moveChaser(bug, player, () => randomRolls.shift()!)).toEqual({ row: 3, col: 4, direction: 0 });
  expect(bug).toEqual({ row: 3, col: 3, direction: 0 });
});

it('always moves one square and stays inside the board, even when overlapping the player', () => {
  for (const row of [0, 6]) {
    for (const col of [0, 6]) {
      for (const roll of [0, 0.79, 0.8, 0.999]) {
        const bug = { row, col, direction: 0 };
        const next = moveChaser(bug, bug, () => roll);
        expect(next.row).toBeGreaterThanOrEqual(0);
        expect(next.row).toBeLessThan(7);
        expect(next.col).toBeGreaterThanOrEqual(0);
        expect(next.col).toBeLessThan(7);
        expect(Math.abs(next.row - row) + Math.abs(next.col - col)).toBe(1);
      }
    }
  }
});
