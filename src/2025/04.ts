import { readFileSync } from 'fs';
import '../array';
import { fromMatrixKey, toMatrix } from '../util';

const PAPER = '@';
type Cell = '@' | '.';
type Matrix = ReturnType<typeof toMatrix<Cell>>;

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 4', process.argv[2]);
console.time('Solution');

const grid = toMatrix<Cell>(input, (s) => s as Cell);

let forkLiftAccessible = 0;

grid.forEach((cell, key) => {
  if (cell === PAPER && grid.neighBours(...fromMatrixKey(key)).filter(([, , v]) => v === PAPER).length < 4) {
    forkLiftAccessible++;
  }
});

console.log('Part 1: ', forkLiftAccessible);

function removePaper(matrix: Matrix): number {
  const removableCellKeys: string[] = [];
  matrix.forEach((cell, key) => {
    if (cell === PAPER && grid.neighBours(...fromMatrixKey(key)).filter(([, , v]) => v === PAPER).length < 4) {
      removableCellKeys.push(key);
    }
  });
  removableCellKeys.forEach((key) => matrix.set(key, '.'));
  return removableCellKeys.length;
}

let totalCellsRemoved = 0;
let cellsRemoved = 0;
do {
  cellsRemoved = removePaper(grid);
  totalCellsRemoved += cellsRemoved;
} while (cellsRemoved > 0);

console.log('Part 2: ', totalCellsRemoved);

console.timeLog('Solution');
