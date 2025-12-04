import { readFileSync } from 'fs';
import '../array';

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 03', process.argv[2]);

console.time('Solution');
//////////////////// SOLUTION goes here, run jaot or jaos
const instructions = input.split('\n').join('');
// regex that matches mul(1,2) or mul(12,34) or mul(123,456). numbers can be 1,2 or 3 digits
const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const matches = instructions.matchAll(regex).toArray();
console.log(matches.reduce((acc, [, a, b]) => acc + +a * +b, 0));

const enabled = instructions.split('do()').map((doit) => doit.split(`don't()`)[0]);
// console.log(enabled);

const enabledMatches = enabled.join('').matchAll(regex).toArray();
console.log(enabledMatches.reduce((acc, [, a, b]) => acc + +a * +b, 0));

console.timeLog('Solution');
