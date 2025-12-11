import { readFileSync } from 'fs';
import './array';
import { memoize } from '@util';

const input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day x', process.argv[2]);
console.time('Solution');

const steps: Map<string, string[]> = new Map(
  input.split('\n').map((l) => {
    const [key, rest] = l.split(': ');
    return [key, rest.split(' ')];
  })
);

const getPaths = memoize(function paths(from: string, to: string): number {
  if (from === to) return 1;
  const children = steps.get(from);
  if (!children?.length) return 0;
  return children.map((c) => getPaths(c, to)).sum();
});

console.log('PART 1', getPaths('you', 'out'));

const pathCounts = [getPaths('svr', 'fft'), getPaths('fft', 'dac'), getPaths('dac', 'out')];
console.log(
  'PART 2',
  pathCounts.map((c) => (c === 0 ? 1 : c)).reduce((product, n) => product * n)
);

console.timeLog('Solution');
