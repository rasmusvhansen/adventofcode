import { readFileSync } from 'fs';
import '../array';
import { allPairs, checkIntersection, Coord, pairWise, Point } from '@util';

const input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 9', process.argv[2]);
console.time('Solution');

const coordinates = input.split('\n').map((s) => Point.create(+s.split(',')[0], +s.split(',')[1]));
const pairs = allPairs(coordinates);
const areas = pairs.map(([a, b]) => (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1));
console.log('Part 1', areas.sortDesc()[0]);

// Part 2, create a big polygon of all points. For each pair, create a polygon and check intersection with big polygon line
// segments

const bigPoly: Coord[] = coordinates.map(({ x, y }) => [x, y]);
bigPoly.push([coordinates[0].x, coordinates[0].y]);
const candidates: Coord[][] = pairs.map(([a, b]) => [
  [a.x, a.y],
  [b.x, a.y],
  [b.x, b.y],
  [a.x, b.y],
  [a.x, a.y],
]);

const inPoly = candidates.filter((poly) => polyInPoly(poly, bigPoly));

const inPolyAreas = inPoly.map(([a, , b]) => (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1));

console.log('Part 2', Math.max(...inPolyAreas));

function polyInPoly(poly: Coord[], container: Coord[]): boolean {
  const polyLines = pairWise(poly);
  const containerLines = pairWise(container);
  return polyLines.every((line) => {
    return !containerLines.some((cl) => {
      const intersect = checkIntersection(
        line[0][0],
        line[0][1],
        line[1][0],
        line[1][1],
        cl[0][0],
        cl[0][1],
        cl[1][0],
        cl[1][1],
        true
      );
      return intersect;
    });
  });
}

console.timeLog('Solution');
