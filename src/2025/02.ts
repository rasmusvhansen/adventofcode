import { readFileSync } from 'fs';
import './array';

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 02', process.argv[2]);

function isInvalid2(n: number) {
  const asString = n.toString();
  return /^(\d+)\1+$/.test(asString);
}

console.time('Solution');
const ranges = input
  .replaceAll('\n', '')
  .split(',')
  .map((s) => s.split('-').map(Number) as [number, number]);

const invalidIds: number[] = [];

for (const range of ranges) {
  for (const n of getNumbers(range)) {
    if (isInvalid2(n)) invalidIds.push(n);
  }
}

console.log(
  invalidIds,
  invalidIds.reduce((sum, n) => sum + n, 0)
);

function isInvalid(n: number) {
  const asString = n.toString();
  if (asString.length % 2 !== 0) return false;
  const midPoint = asString.length / 2;
  return asString.slice(0, midPoint) === asString.slice(midPoint);
}

function* getNumbers([start, end]: [number, number]) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.timeLog('Solution');
