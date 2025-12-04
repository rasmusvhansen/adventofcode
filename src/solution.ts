import { readFileSync } from 'fs';
import './array';
import { fromMatrixKey, toMatrix } from './util';

const PAPER = '@';
type Cell = '@' | '.';
type Matrix = ReturnType<typeof toMatrix<Cell>>;

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day x', process.argv[2]);

console.time('Solution');
const grid = toMatrix<Cell>(input, (s) => s as Cell);

let forkLiftAccessible = 0;

grid.forEach((cell, key) => {
  if (cell === PAPER && grid.neighBours(...fromMatrixKey(key)).filter(([, , v]) => v === PAPER).length < 4) {
    forkLiftAccessible++;
  }
});

console.log({ forkLiftAccessible });

let cellsRemoved = 0;
function removePaper(matrix: Matrix): Matrix {
  const removableCellKeys: string[] = [];
  matrix.forEach((cell, key) => {
    if (cell === PAPER && grid.neighBours(...fromMatrixKey(key)).filter(([, , v]) => v === PAPER).length < 4) {
      removableCellKeys.push(key);
    }
  });
  removableCellKeys.forEach((key) => matrix.set(key, '.'));
  cellsRemoved = removableCellKeys.length;
  return matrix;
}

let totalCellsRemoved = 0;
do {
  removePaper(grid);
  totalCellsRemoved += cellsRemoved;
} while (cellsRemoved > 0);

console.log(totalCellsRemoved);

//////////////////// SOLUTION goes here, run jaot or jaos

console.timeLog('Solution');
