import { readFileSync } from 'fs';
import '../array';
import { groupNumber } from '../util';

let input = readFileSync(process.argv[2], 'utf-8').trim();
const lines = input.split('\n').map((l) => l.split(/\s+/).map(Number)) as [number, number][];
console.log('Day 01', process.argv[2]);
console.time('Solution');
const left = lines.map(([a]) => a).sortAsc();
const right = lines.map(([, b]) => b).sortAsc();

console.log(left.reduce((acc, a, i) => Math.abs(a - right[i]) + acc, 0));

const occurences = groupNumber(right);
console.log(left.reduce((acc, a) => acc + (occurences[a] || 0) * a, 0));

//////////////////// SOLUTION goes here, run jaot or jaos

console.timeLog('Solution');
