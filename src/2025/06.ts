import { readFileSync } from 'fs';
import './array';

const input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 6', process.argv[2]);
console.time('Solution');
const grid = input.split('\n').map((s) =>
  s
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
);
const problems = [...columnIterator(grid)];
console.log('Part 1', solveProblems(problems));

const cephProblems = [...cephIterator(input.split('\n').map((s) => s.split('')))];

const cephProblemsArranged = cephProblems
  .map((s) => (s === '' ? '|' : s))
  .join(',')
  .split('|')
  .map((s) => s.split(',').filter(Boolean));

console.log('Part 2', solveProblems(cephProblemsArranged));

console.timeLog('Solution');

function* columnIterator<T>(grid: T[][]) {
  const columns = grid[0].length;
  for (let i = 0; i < columns; i++) {
    yield grid.map((r, rowIndex) => grid[rowIndex][i]);
  }
}

function solveProblems(problems: string[][]) {
  return problems
    .map((p) => {
      const plus = p.at(-1) === '+';
      const numbers = p.slice(0, -1).map(Number);
      if (plus) return numbers.sum();
      else return numbers.reduce((product, n) => product * +n, 1);
    })
    .sum();
}

function* cephIterator<T>(grid: string[][]) {
  const columns = grid[0].length;
  for (let i = columns - 1; i >= 0; i--) {
    const num = grid
      .map((r) => r[i])
      .map((s) => s?.trim())
      .filter(Boolean)
      .join('');
    if (num.includes('+') || num.includes('*')) {
      yield num.slice(0, -1);
      yield num.at(-1);
    } else yield num;
  }
}
