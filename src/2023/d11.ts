import '../array.js';
import { fromMatrixKey, toMatrix } from '../util.js';

export function run() {
  console.log('Day 11');
  const { matrix, extraRows, extraColumns } = expandUniverse(realInput);
  const galaxies = matrix.toArray().filter(([, s]) => s === '#');
  const pairs = galaxies.flatMap((g, i) => galaxies.slice(i + 1).map((other) => [g, other]));
  console.log(pairs.length);
  const distances = pairs.map(([a, b]) => distance(a[0], b[0], extraRows, extraColumns));
  console.log(distances.sum());

  const distancesPart2 = pairs.map(([a, b]) => distance(a[0], b[0], extraRows, extraColumns, 999999));
  console.log(distancesPart2.sum());
}

function distance(a: string, b: string, extraRows: number[], extraColumns: number[], emptySpace = 1): number {
  const [y1, x1] = fromMatrixKey(a);
  const [y2, x2] = fromMatrixKey(b);

  const addRows = between(y1, y2, extraRows);
  const addColumns = between(x1, x2, extraColumns);
  const dist = Math.abs(y1 - y2) + addRows * emptySpace + addColumns * emptySpace + Math.abs(x1 - x2);
  return dist;
}

function between(a: number, b: number, candidates: number[]) {
  return candidates.filter((c) => c > Math.min(a, b) && c < Math.max(a, b)).length;
}

function expandUniverse(input: string) {
  const extraRows = [] as number[];
  const extraColumns = [] as number[];
  const grid = input.split('\n').map((row) => row.split(''));
  grid.forEach((row, i) => {
    const empty = isEmpty(row);
    if (empty) extraRows.push(i);
  });
  const columns = [...rotateIterator(grid)];
  columns.forEach((col, i) => {
    const empty = isEmpty(col);
    if (empty) extraColumns.push(i);
  });

  return { matrix: toMatrix(input, (s) => s), extraRows, extraColumns };
}

function* rotateIterator<T>(input: T[][]): IterableIterator<T[]> {
  for (let i = 0; i < input[0].length; i++) {
    const rotated = input.map((x) => x[i]);
    yield rotated;
  }
}

const isEmpty = (line: string[]) => line.every((c) => c === '.');

const testInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const realInput = ``;