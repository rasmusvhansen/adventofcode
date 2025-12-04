import { readFileSync } from 'fs';
import './array';

let input = readFileSync(process.argv[2], 'utf-8').trim();

console.log('Day 1', process.argv[2]);

console.time('Solution');
const rotations = input
  .split('\n')
  .map((s) => s.replaceAll('L', '-').replaceAll('R', ''))
  .map((s) => +s);

let current = 50;
let zeroPassed = 0;
for (const r of rotations) {
  const sum = current + r;
  const modSum = sum % 100;
  const nextCurrent = modSum < 0 ? 100 + modSum : modSum;
  if (sum >= 100 || sum <= 0) {
    if (sum > 0) zeroPassed = zeroPassed + Math.floor(sum / 100);
    else zeroPassed = zeroPassed + Math.floor(Math.abs(sum) / 100) + 1 - (current === 0 ? 1 : 0);
  }

  current = nextCurrent;
}

console.log(zeroPassed);
//////////////////// SOLUTION goes here, run jaot or jaos

console.timeLog('Solution');
