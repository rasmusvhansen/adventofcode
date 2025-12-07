import { readFileSync } from 'fs';
import './array';
import { fromMatrixKey, matrixKey, toMatrix } from '@util';

const BEAM = '|';
const SPLITTER = '^';
const START = 'S';

const input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 7', process.argv[2]);
console.time('Solution');

const grid = toMatrix<[string, number]>(input, (s) => [s, 0]);
const startKey = grid.row(0).find(([key, [v, count]]) => v === START)?.[0]!;
grid.set(startKey, [START, 1]);

let splits = 0;
let currentRow = 0;
let timelines = 1;

function step() {
  grid
    .row(currentRow)
    .filter(([, [v]]) => v === BEAM || v === START)
    .forEach(([key, [, count]]) => {
      const [row, col] = fromMatrixKey(key);
      const cell = grid.get(row + 1, col);
      if (!cell) {
        return;
      }
      const [below, belowCount] = cell;
      if (below !== SPLITTER) {
        grid.set(matrixKey(row + 1, col), [BEAM, belowCount + count]);
      } else if (below === SPLITTER) {
        splits++;
        const leftCount = grid.get(row + 1, col - 1)![1];
        const rightCount = grid.get(row + 1, col + 1)![1];
        grid.set(matrixKey(row + 1, col - 1), [BEAM, leftCount + count]);
        grid.set(matrixKey(row + 1, col + 1), [BEAM, rightCount + count]);
        timelines += count;
      }
    });
  currentRow++;
}
while (currentRow < grid.height) {
  step();
}
console.log('PART 1', splits);
console.log('PART 2', timelines);

console.timeLog('Solution');
