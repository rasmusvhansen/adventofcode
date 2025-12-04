import { readFileSync } from 'fs';
import '../array';
import { pairWise } from '../util';

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 02', process.argv[2]);

console.time('Solution');
//////////////////// SOLUTION goes here, run jaot or jaos
const lines = input.split('\n').map((l) => l.split(/\s+/).map(Number));
const isSafe = (l: number[]) =>
  (l.sortAsc().equals(l) || l.sortDesc().equals(l)) &&
  pairWise(l).every(([a, b]) => Math.abs(a - b) <= 3 && Math.abs(a - b) !== 0);
const safe = lines.filter(isSafe);
console.log(safe.length);

const safeDamp = lines.filter((l) => permutations(l).concat([l]).some(isSafe));
console.log(safeDamp.length);
console.timeLog('Solution');

function permutations(line: number[]): number[][] {
  return line.map((_, i) => line.removeIndex(i));
}
