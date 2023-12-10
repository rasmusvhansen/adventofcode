import '../array.js';
import { Point, pointInPoly, toMatrix } from '../util.js';

export function run() {
  console.log('Day 10');
  const map = toMatrix(realInput, (s, y, x) => Cell.create(s as Shape, Point.create(x, y)));
  console.log(map.toArray().find((c) => c[1].shape === 'S'));
  let current = map.get(24, 77)!;
  const path: Point[] = [Point.create(77, 24)];
  let count = 1;
  let cameFrom: Direction = 'S';
  while (current.shape !== 'S') {
    const [nextPos, nextCameFrom] = current.next(cameFrom);
    current = map.get(nextPos.y, nextPos.x)!;
    cameFrom = nextCameFrom;
    path.push(current.pos);
    count++;
  }

  console.log('Part 1: ', count / 2);

  const contained = map
    .toArray()
    .map(([, c]) => c.pos)
    .filter(
      (point) =>
        !path.includes(point) &&
        pointInPoly(
          path.map(({ x, y }) => [y, x]),
          [point.y, point.x]
        )
    );
  console.log('Part 2: ', contained.length);
}

type Shape = '|' | '-' | 'L' | 'J' | '7' | 'F' | 'S' | '.';
type Direction = 'N' | 'S' | 'E' | 'W';

class Cell {
  static cache = new Map<Point, Cell>();
  static create(direction: Shape, pos: Point) {
    const cell = Cell.cache.get(pos) || new Cell(direction, pos);
    Cell.cache.set(pos, cell);
    return cell;
  }
  private constructor(public readonly shape: Shape, public readonly pos: Point) {}

  next(cameFrom: Direction): [Point, Direction] {
    const go = shapeMap[movekey(this.shape, cameFrom)];
    return [this.pos[shapeMap[movekey(this.shape, cameFrom)]](), goToCameFromMap[go]];
  }
}

const movekey = (shape: Shape, cameFrom: Direction) => (shape + cameFrom) as keyof typeof shapeMap;

const goToCameFromMap = {
  above: 'S',
  below: 'N',
  right: 'W',
  left: 'E',
} as const;

const shapeMap = {
  '|S': 'above',
  '|N': 'below',
  '-W': 'right',
  '-E': 'left',
  LN: 'right',
  LE: 'above',
  JN: 'left',
  JW: 'above',
  '7S': 'left',
  '7W': 'below',
  FS: 'right',
  FE: 'below',
} as const;

const testInput = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

const realInput = ``;
