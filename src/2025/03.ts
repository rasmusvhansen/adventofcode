import { readFileSync } from 'fs';
import '../array';

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 3', process.argv[2]);

console.time('Solution');
//////////////////// SOLUTION goes here, run jaot or jaos

function getJoltage(bank: number[], digits: number): string {
  if (digits === 0) return '';
  const max = Math.max(...(digits === 1 ? bank : bank.slice(0, -(digits - 1))));
  const index = bank.indexOf(max);
  return bank[index].toString() + getJoltage(bank.slice(index + 1), digits - 1);
}
const banks = input.split('\n').map((b) => b.split('').map(Number));
console.log('Part 1', banks.map((b) => getJoltage(b, 2)).sum());
console.log('Part 2', banks.map((b) => getJoltage(b, 12)).sum());

console.timeLog('Solution');
