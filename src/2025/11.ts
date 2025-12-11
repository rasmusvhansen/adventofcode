import { readFileSync } from 'fs';
import '../array';
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

const pathsToFFT = getPaths('svr', 'fft');
const pathsFFTDAC = getPaths('fft', 'dac');
const pathsDACFFT = getPaths('dac', 'fft');
const pathsDACOUT = getPaths('dac', 'out');
const pathsFFTOUT = getPaths('fft', 'out');
console.log('PART 2', { pathsToFFT, pathsDACFFT, pathsFFTDAC, pathsDACOUT, pathsFFTOUT });
console.log('PART 2', pathsToFFT * pathsFFTDAC * pathsDACOUT);

console.timeLog('Solution');
