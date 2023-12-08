type Race = { time: number; distance: number };
const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }).map((_, i) => i + start);

const testInput = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 },
];

const realInput = [
  { time: 44, distance: 277 },
  { time: 89, distance: 1136 },
  { time: 96, distance: 1890 },
  { time: 91, distance: 1768 },
];

const part2TestInput = [{ time: 71530, distance: 940200 }];
const part2Input = [{ time: 44899691, distance: 277113618901768 }];

function beatsRecord(race: Race, holdFor: number) {
  const distance = holdFor * (race.time - holdFor);
  return distance > race.distance;
}
const multiply = (a: number, b: number) => a * b;

const n = part2Input
  .map(
    (r) =>
      range(1, r.time)
        .map((t) => beatsRecord(r, t))
        .filter(Boolean).length
  )
  .reduce(multiply, 1);
console.log(n);
