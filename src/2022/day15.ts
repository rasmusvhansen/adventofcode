import { checkIntersection, manhattanDistance, Point, range, Rectangle } from '../util';
import '../array';

export function run() {
  const input = realInput;
  const sensorBeaconPairs = input
    .split('\n')
    .map((l) =>
      l
        .match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)!
        .slice(1)
        .map(Number)
    )
    .map(([sx, sy, bx, by]) => [Point.create(sx, sy), Point.create(bx, by)]);
  const ranges = sensorBeaconPairs.map(([sensor, beacon]) => {
    const distance = manhattanDistance(sensor, beacon);
    return { distance, sensor };
  });

  const minX = ranges.map(({ sensor, distance }) => sensor.x - distance).min();
  const maxX = ranges.map(({ sensor, distance }) => sensor.x + distance).max();

  const y = 2000000;
  // const y = 10;
  const covered = range(minX, maxX).filter((x) =>
    ranges.some(({ sensor, distance }) => sensor.iswithinManhattanDistance(Point.create(x, y), distance))
  );
  console.log('Part 1', covered.length - 1);

  const lines = ranges
    .map(({ sensor, distance }) => sensor.manhattanBallRotated(distance + 1))
    .flatMap(
      ([ll, ul, ur, lr]) =>
        [
          [ll, ul],
          [ul, ur],
          [ur, lr],
          [lr, ll],
        ] as [Point, Point][]
    );
  const intersections = lines.flatMap((l) =>
    lines.except([l]).map(([o1, o2]) => checkIntersection(l[0].x, l[0].y, l[1].x, l[1].y, o1.x, o1.y, o2.x, o2.y))
  );
  const limit = 4000000;
  // const limit = 20;

  console.log(
    intersections
      .filter(Boolean)
      .map((p) => p!.rotateBack())
      .filter(({ x, y }) => x >= 0 && x <= limit && y >= 0 && y <= limit)
      .uniq()
      .filter((p) => ranges.every(({ sensor, distance }) => manhattanDistance(p, sensor) > distance))
  );
}

const testInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const realInput = `Sensor at x=1555825, y=18926: closest beacon is at x=1498426, y=-85030
Sensor at x=697941, y=3552290: closest beacon is at x=595451, y=3788543
Sensor at x=3997971, y=2461001: closest beacon is at x=3951198, y=2418718
Sensor at x=3818312, y=282332: closest beacon is at x=4823751, y=1061753
Sensor at x=2874142, y=3053631: closest beacon is at x=3074353, y=3516891
Sensor at x=1704479, y=2132468: closest beacon is at x=1749091, y=2000000
Sensor at x=3904910, y=2080560: closest beacon is at x=3951198, y=2418718
Sensor at x=657061, y=3898803: closest beacon is at x=595451, y=3788543
Sensor at x=3084398, y=3751092: closest beacon is at x=3074353, y=3516891
Sensor at x=2582061, y=972407: closest beacon is at x=1749091, y=2000000
Sensor at x=2886721, y=3971936: closest beacon is at x=3074353, y=3516891
Sensor at x=303399, y=548513: closest beacon is at x=-1010425, y=986825
Sensor at x=3426950, y=2290126: closest beacon is at x=3951198, y=2418718
Sensor at x=3132858, y=3592272: closest beacon is at x=3074353, y=3516891
Sensor at x=3773724, y=3751243: closest beacon is at x=3568452, y=3274758
Sensor at x=3987212, y=2416515: closest beacon is at x=3951198, y=2418718
Sensor at x=61559, y=3806326: closest beacon is at x=595451, y=3788543
Sensor at x=2693503, y=2291389: closest beacon is at x=2269881, y=2661753
Sensor at x=3953437, y=2669220: closest beacon is at x=3951198, y=2418718
Sensor at x=763035, y=3997568: closest beacon is at x=595451, y=3788543
Sensor at x=3999814, y=2370103: closest beacon is at x=3951198, y=2418718
Sensor at x=1290383, y=1696257: closest beacon is at x=1749091, y=2000000
Sensor at x=3505508, y=2805537: closest beacon is at x=3568452, y=3274758
Sensor at x=3276207, y=3323122: closest beacon is at x=3568452, y=3274758
Sensor at x=2244609, y=3517499: closest beacon is at x=3074353, y=3516891
Sensor at x=1370860, y=3436382: closest beacon is at x=595451, y=3788543
Sensor at x=3831063, y=3042662: closest beacon is at x=3568452, y=3274758
Sensor at x=551202, y=3971545: closest beacon is at x=595451, y=3788543
Sensor at x=336629, y=2519780: closest beacon is at x=595451, y=3788543
Sensor at x=2033602, y=2882628: closest beacon is at x=2269881, y=2661753
Sensor at x=3939808, y=2478271: closest beacon is at x=3951198, y=2418718
Sensor at x=1958708, y=2370822: closest beacon is at x=1749091, y=2000000
Sensor at x=3039958, y=3574483: closest beacon is at x=3074353, y=3516891`;
