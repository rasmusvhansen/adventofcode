export const add = (a: number, b: number) => a + b;
export const times = (a: number, b: number) => a * b;
export const sum = (ns: number[]) => ns.reduce(add, 0);
export const multiply = (ns: number[]) => ns.reduce(times, 1);
export const range = (start: number, end: number, endInclusive = true) => {
  const _start = Math.min(start, end);
  const _end = Math.max(start, end);
  return Array.from({ length: _end - _start + (endInclusive ? 1 : 0) }).map((_, i) => i + _start);
};
export const toMatrix = <T = number>(
  input: string,
  map: (s: string, row: number, col: number) => T = (s) => +s as T
) => {
  const matrix = new Map<string, T>();
  const rows = input.split('\n');
  rows.map((s, row) => s.split('').map((n, col) => matrix.set(matrixKey(row, col), map(n, row, col))));
  return {
    get: (row: number, col: number) => matrix.get(matrixKey(row, col)),
    set: (key: string, value: T) => matrix.set(key, value),
    has: (row: number, col: number) => matrix.has(matrixKey(row, col)),
    forEach: matrix.forEach.bind(matrix) as Map<string, T>['forEach'],
    toArray() {
      return [...matrix.entries()];
    },
    get size() {
      return matrix.size;
    },
    height: rows.length,
    width: rows[0].length,
    neighBours(row: number, col: number, direction?: FullDirection): [number, number, T][] {
      if (direction) {
        const p = Point.create(col, row).go(direction);
        const value = this.get(p.y, p.x);
        return value ? ([[p.y, p.x, value]] as const) : [];
      }
      return (
        [
          [row - 1, col - 1, this.get(row - 1, col - 1)],
          [row - 1, col, this.get(row - 1, col)],
          [row - 1, col + 1, this.get(row - 1, col + 1)],
          [row, col + 1, this.get(row, col + 1)],
          [row, col - 1, this.get(row, col - 1)],
          [row + 1, col - 1, this.get(row + 1, col - 1)],
          [row + 1, col, this.get(row + 1, col)],
          [row + 1, col + 1, this.get(row + 1, col + 1)],
        ] as const
      ).filter(([, , v]) => v != null) as [number, number, T][];
    },
  };
};

export const getDirection = (from: Point, to: Point): FullDirection => {
  if (from.x === to.x) {
    return from.y < to.y ? 'S' : 'N';
  }
  if (from.y === to.y) {
    return from.x < to.x ? 'E' : 'W';
  }
  return from.x < to.x ? (from.y < to.y ? 'SE' : 'NE') : from.y < to.y ? 'SW' : 'NW';
};

export const matrixKey = (row: number, col: number) => `${row},${col}`;
export const fromMatrixKey = (key: string) => key.split(',').map((s) => +s) as [number, number];
export type Rectangle = [Point, Point, Point, Point];

export type Direction = 'N' | 'S' | 'E' | 'W';
export type FullDirection = Direction | 'NW' | 'NE' | 'SW' | 'SE';
const xTransform: Record<FullDirection, -1 | 0 | 1> = { N: 0, S: 0, W: -1, E: 1, NW: -1, NE: 1, SW: -1, SE: 1 };
const yTransform: Record<FullDirection, -1 | 0 | 1> = { N: -1, S: 1, W: 0, E: 0, NW: -1, NE: -1, SW: 1, SE: 1 };
export class Point {
  private static cache = new Map<string, Point>();
  static create(x: number, y: number) {
    const key = `${x},${y}`;
    Point.cache.set(key, Point.cache.get(key) || new Point(x, y));
    return Point.cache.get(key)!;
  }

  private constructor(public x: number, public y: number) {}
  go(direction: FullDirection) {
    return Point.create(this.x + xTransform[direction], this.y + yTransform[direction]);
  }

  add(p: Point): Point {
    return Point.create(this.x + p.x, this.y + p.y);
  }

  subtract(p: Point): Point {
    return Point.create(this.x - p.x, this.y + p.y);
  }

  above(): Point {
    return Point.create(this.x, this.y - 1);
  }

  below(): Point {
    return Point.create(this.x, this.y + 1);
  }

  left(): Point {
    return Point.create(this.x - 1, this.y);
  }

  right(): Point {
    return Point.create(this.x + 1, this.y);
  }

  downLeft(): Point {
    return Point.create(this.x - 1, this.y + 1);
  }

  downRight(): Point {
    return Point.create(this.x + 1, this.y + 1);
  }

  withinManhattanDistance(distance: number): Set<Point> {
    return new Set(
      range(-distance, distance).flatMap((x) =>
        range(-distance + Math.abs(x), distance - Math.abs(x)).map((y) => Point.create(this.x + x, this.y + y))
      )
    );
  }

  manhattanBall(distance: number): Rectangle {
    return [
      Point.create(this.x - distance, this.y),
      Point.create(this.x, this.y + distance),
      Point.create(this.x + distance, this.y),
      Point.create(this.x, this.y - distance),
    ];
  }

  manhattanBallEdgePoints(distance: number, limit: number): Point[] {
    return range(-distance, distance)
      .flatMap((x) => {
        const y = distance - Math.abs(x);
        return [Point.create(this.x + x, this.y + y), Point.create(this.x + x, this.y - y)];
      })
      .filter((p) => p.x <= limit && p.x >= 0 && p.y <= limit && p.y >= 0);
  }

  manhattanBallRotated(distance: number): Rectangle {
    return this.manhattanBall(distance).map((c) => c.rotate45()) as Rectangle;
  }

  rotate45(): Point {
    return Point.create(this.x / Math.SQRT2 - this.y / Math.SQRT2, this.x / Math.SQRT2 + this.y / Math.SQRT2);
  }

  rotateBack(): Point {
    return Point.create(
      Math.round(this.x / Math.SQRT2 + this.y / Math.SQRT2),
      Math.round(-this.x / Math.SQRT2 + this.y / Math.SQRT2)
    );
  }

  isContainedIn([ll, _ul, ur, _lr]: Rectangle): boolean {
    const contained = this.x >= ll.x && this.x <= ur.x && this.y >= ll.y && this.y <= ur.y;
    return contained;
  }

  iswithinManhattanDistance(p: Point, distance: number): boolean {
    return manhattanDistance(this, p) <= distance;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }
}

export function manhattanDistance({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function checkIntersection(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
) {
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  const numeA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  const numeB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if (denom == 0) {
    if (numeA == 0 && numeB == 0) {
      return null;
    }
    return null;
  }

  const uA = numeA / denom;
  const uB = numeB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return Point.create(x1 + uA * (x2 - x1), y1 + uA * (y2 - y1));
  }

  return null;
}

export type Coord = [number, number];
export function pointInPoly(polygon: Coord[], [y, x]: Coord) {
  const [vertx, verty] = polygon.reduce(
    (xys, [y, x]) => {
      xys[0].push(x);
      xys[1].push(y);
      return xys;
    },
    [[], []] as [number[], number[]]
  );
  const nvert = vertx.length;
  let c = false;

  let j = nvert - 1;
  for (let i = 0; i < nvert; j = i++) {
    if (verty[i] > y != verty[j] > y && x < ((vertx[j] - vertx[i]) * (y - verty[i])) / (verty[j] - verty[i]) + vertx[i])
      c = !c;
  }
  return c;
}

export function memoize<F extends Function>(func: F): F {
  const cache: Record<string, any> = {};

  return function memoizeFunction(this: any, ...args: any[]) {
    const key = JSON.stringify(args);

    if (cache[key] === undefined) {
      const result = func.apply(this, args);
      cache[key] = result;
    }

    return cache[key];
  } as unknown as F;
}

export function* rotateIterator<T>(input: T[][]): IterableIterator<T[]> {
  for (let i = 0; i < input[0].length; i++) {
    const rotated = input.map((x) => x[i]);
    yield rotated;
  }
}

export function allPairs<T>(a: T[]): [T, T][] {
  return a.flatMap((g, i) => a.slice(i + 1).map((other) => [g, other] as [T, T]));
}

export function pairWise<T>(a: T[]): [T, T][] {
  return a.slice(1).map((_, i) => [a[i], a[i + 1]]);
}

export function groupNumber(xs: number[]): Record<number, number> {
  return xs.reduce((groups, n) => {
    let group = groups[n] ?? 0;
    group++;
    groups[n] = group;
    return groups;
  }, {} as Record<number, number>);
}

/**
 *
 * @param polygon Right angle (manhattan) polygon
 */
export function circumference(polygon: Point[]): number {
  return pairWise(polygon)
    .map(([a, b]) => manhattanDistance(a, b))
    .sum();
}

export function areaOfPolygon(polygon: Point[]) {
  const nextPoint = (i: number) => polygon[(i + 1) % polygon.length];
  return (
    Math.abs(
      polygon.uniq().reduce((area, p, i) => {
        return area + (p.x * nextPoint(i).y - p.y * nextPoint(i).x);
      }, 0)
    ) / 2
  );
}

export function join<T extends string[]>(...strings: T): Concat<T> {
  return strings.join('') as Concat<T>;
}

export type Concat<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]]
  ? `${F}${Concat<R>}`
  : '';
