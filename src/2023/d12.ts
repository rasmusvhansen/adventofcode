import 'array';
import { memoize, range } from '../util.js';

export function run() {
  console.log('Day 12');
  const lines = realInput.split('\n');
  console.time('Part 1');
  console.log(countCombinations(lines));
  console.timeLog('Part 1');

  console.time('Part 2');
  console.log(countCombinations(lines.map(expand)));
  console.timeLog('Part 2');
}

function countCombinations(lines: string[]) {
  return lines
    .map((l) => {
      const [springs, groupInput] = l.split(' ');
      const groups = groupInput.split(',').toNumbers();
      return memoized(springs, groups);
    })
    .sum();
}

function expand(line: string): string {
  const [springs, groupInput] = line.split(' ');
  return `${[springs, springs, springs, springs, springs].join('?')} ${(groupInput + ',').repeat(5).slice(0, -1)}`;
}

function getCombinations(springs: string, [first, ...rest]: number[]): number {
  const groups = [first, ...rest];

  if (first == null && springs.includes('#')) return 0;
  if (first == null) return 1;
  if (springs.length === 0 || first < 1 || springs.length < groups.sum() + groups.length - 1) return 0;
  if (springs.startsWith('.')) return memoized(springs.slice(1), groups);
  if (springs.startsWith('?')) return memoized(springs.slice(1), groups) + memoized(`#${springs.slice(1)}`, groups);
  if (springs.slice(0, first).match(/^[#\?]*$/))
    return springs.slice(first)[0] === '#' ? 0 : memoized(springs.slice(first + 1), rest);
  return 0;
}

const memoized = memoize(getCombinations);

const testInput = ``;

const realInput = ``;
