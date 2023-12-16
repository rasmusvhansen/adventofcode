import { readFileSync } from 'fs';
import 'array';

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 16', process.argv[2]);

//////////////////// SOLUTION below

import { Direction, Point, range, toMatrix } from '@util';

const NS = ['N', 'S'];
const EW = ['E', 'W'];
const splitUpDown = '|';
const splitLeftRight = '-';
const backSlash = '\\';
const slash = '/';

console.log('Part 1', energized(Point.create(0, 0), 'E'));
const { width, height } = toMatrix(input);
const startingPoints = [
  range(0, width).map((col) => ({ p: Point.create(col, 0), direction: 'S' as Direction })),
  range(0, width).map((col) => ({ p: Point.create(col, height - 1), direction: 'N' as Direction })),
  range(0, height).map((row) => ({ p: Point.create(0, row), direction: 'E' as Direction })),
  range(0, height).map((row) => ({ p: Point.create(width - 1, row), direction: 'W' as Direction })),
].flat();

console.time('Part2');
const energyLevels = startingPoints.map(({ p, direction }) => energized(p, direction));
console.timeLog('Part2');
console.log('Part 2', Math.max(...energyLevels));

function energized(p: Point, direction: Direction) {
  const matrix = toMatrix(input, (s) => ({ s, directionsVisited: new Set<Direction>() }));
  visit(p, direction);
  return matrix.toArray().filter(([, v]) => v.directionsVisited.size > 0).length;

  function visit(p: Point, direction: Direction): void {
    const col = p.x;
    const row = p.y;
    const cell = matrix.get(row, col)!;
    if (col < 0 || row < 0 || col >= matrix.width || row >= matrix.height || cell.directionsVisited.has(direction))
      return;
    const symbol = cell.s;
    cell.directionsVisited.add(direction);
    if (
      symbol === '.' ||
      (symbol === splitUpDown && NS.includes(direction)) ||
      (symbol === splitLeftRight && EW.includes(direction))
    ) {
      return visit(p.go(direction), direction);
    }
    if (symbol === splitUpDown) {
      visit(p.above(), 'N');
      visit(p.below(), 'S');
      return;
    }
    if (symbol === splitLeftRight) {
      visit(p.left(), 'W');
      visit(p.right(), 'E');
      return;
    }
    if ((symbol === slash && direction === 'E') || (symbol === backSlash && direction === 'W'))
      return visit(p.above(), 'N');
    if ((symbol === backSlash && direction === 'E') || (symbol === slash && direction === 'W'))
      return visit(p.below(), 'S');
    if ((symbol === slash && direction === 'N') || (symbol === backSlash && direction === 'S'))
      return visit(p.right(), 'E');
    if ((symbol === backSlash && direction === 'N') || (symbol === slash && direction === 'S'))
      return visit(p.left(), 'W');
  }
}
