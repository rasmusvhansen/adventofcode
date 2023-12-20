import { readFileSync } from 'fs';
import './array';
import { Point, areaOfPolygon, join } from './util';
type Direction = 'U' | 'D' | 'L' | 'R';

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 18', process.argv[2]);

console.time('Solution');
//////////////////// SOLUTION goes here, run jaot or jaos
const instructionsPart1 = input.split('\n').map((line) => {
  const [direction, length] = line.split(' ');
  return { direction: direction as Direction, length: +length };
});
const dirMap: Record<number, Direction> = { 0: 'R', 1: 'D', 2: 'L', 3: 'U' };
const instructionsPart2 = input.split('\n').map((line) => {
  const [, hex, dir] = line.match(/\(#(.{5})(\d)/)!;
  const length = parseInt(hex, 16);
  const direction = dirMap[+dir]!;
  return { direction: direction as Direction, length: +length };
});

findArea(instructionsPart1);
findArea(instructionsPart2);

function findArea(instructions: { direction: Direction; length: number }[]) {
  const turnToOffset: Record<string, Point> = {
    UR: Point.create(-0.5, -0.5),
    RD: Point.create(0.5, -0.5),
    DL: Point.create(0.5, 0.5),
    LU: Point.create(-0.5, 0.5),
    RU: Point.create(-0.5, -0.5),
    UL: Point.create(-0.5, 0.5),
    LD: Point.create(0.5, 0.5),
    DR: Point.create(0.5, -0.5),
  };

  const polygon: Point[] = [Point.create(0, 0)];
  const leftPolygon: Point[] = [];
  const rightPolygon: Point[] = [];
  let prevDirection = instructions.at(-1)!.direction;
  for (const { direction, length } of instructions) {
    const prevPoint = polygon.at(-1)!;
    const nextPoint = Point.create(
      direction === 'U' || direction === 'D' ? prevPoint.x : prevPoint.x + (direction === 'L' ? -length : length),
      direction === 'L' || direction === 'R' ? prevPoint.y : prevPoint.y + (direction === 'U' ? -length : length)
    );
    const leftOffset = turnToOffset[join(prevDirection, direction)];
    leftPolygon.push(prevPoint.add(leftOffset));
    rightPolygon.push(prevPoint.subtract(leftOffset));
    polygon.push(nextPoint);
    prevDirection = direction;
  }
  console.log('Area', Math.max(areaOfPolygon(leftPolygon), areaOfPolygon(rightPolygon)));
}

console.timeLog('Solution');
