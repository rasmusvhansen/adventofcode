export const add = (a: number, b: number) => a + b;
export const times = (a: number, b: number) => a * b;
export const sum = (ns: number[]) => ns.reduce(add, 0);
export const multiply = (ns: number[]) => ns.reduce(times, 1);
export const range = (start: number, end: number, endInclusive = true) =>
  Array.from({ length: end - start + (endInclusive ? 1 : 0) }).map((_, i) => i + start);
export const toMatrix = <T = number>(input: string, map: (s: string, row: number, col: number) => T = (s) => +s as T) => {
  const matrix = new Map<string, T>();
  input.split('\n').map((s, row) => s.split('').map((n, col) => matrix.set(matrixKey(row, col), map(n, row, col))));
  return {
    get: (row: number, col: number) => matrix.get(matrixKey(row, col)),
    has: (row: number, col: number) => matrix.has(matrixKey(row, col)),
    forEach: matrix.forEach.bind(matrix) as Map<string, T>['forEach'],
    toArray() {
      return [...matrix.entries()];
    },
    get size() {
      return matrix.size;
    },
  };
};

export const matrixKey = (row: number, col: number) => `${row},${col}`;
export const fromMatrixKey = (key: string) => key.split(',').map((s) => +s) as [number, number];
export type Rectangle = [Point, Point, Point, Point];

export class Point {
  private static cache = new Map<string, Point>();
  static create(x: number, y: number) {
    const key = `${x},${y}`;
    Point.cache.set(key, Point.cache.get(key) || new Point(x, y));
    return Point.cache.get(key)!;
  }

  private constructor(public x: number, public y: number) {}
  below(): Point {
    return Point.create(this.x, this.y + 1);
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
    return Point.create(Math.round(this.x / Math.SQRT2 + this.y / Math.SQRT2), Math.round(-this.x / Math.SQRT2 + this.y / Math.SQRT2));
  }

  isContainedIn([ll, _ul, ur, _lr]: Rectangle): boolean {
    const contained = this.x >= ll.x && this.x <= ur.x && this.y >= ll.y && this.y <= ur.y;
    return contained;
  }

  iswithinManhattanDistance(p: Point, distance: number): boolean {
    return manhattanDistance(this, p) <= distance;
  }
}

export function manhattanDistance({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function checkIntersection(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
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
