import { readFileSync } from 'fs';
import './array';

let input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 3', process.argv[2]);

console.time('Solution');
//////////////////// SOLUTION goes here, run jaot or jaos
const banks = input.split('\n').map((b) => b.split('').map(Number));
const joltages = banks.map((bank) => {
  const tennerIndex = bank.indexOf(Math.max(...bank.slice(0, -1)));
  const oneIndex = bank.indexOf(Math.max(...bank.slice(tennerIndex + 1)));
  return bank[tennerIndex] * 10 + bank[oneIndex];
});

const joltages2 = banks.map((bank) => {
  return getJoltage(bank, 12);
});

function getJoltage(bank: number[], digits: number): string {
  if (digits === 0) return '';
  const max = Math.max(...(digits === 1 ? bank : bank.slice(0, -(digits - 1))));
  const index = bank.indexOf(max);
  return bank[index].toString() + getJoltage(bank.slice(index + 1), digits - 1);
}

console.log(joltages2.map((j) => +j).sum());
console.timeLog('Solution');
