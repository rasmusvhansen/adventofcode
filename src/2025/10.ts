import { readFileSync } from 'fs';
import comb from 'js-combinatorics';

import './array';
import { combinationsInRange } from '@util';

const input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day x', process.argv[2]);
console.time('Solution');

const machines = input.split('\n').map((line) => {
  const [lights, ...buttonsAndJoltage] = line.split(' ');
  const joltages = buttonsAndJoltage.slice(-1)[0].slice(1, -1).split(',').map(Number);
  return {
    lights: parseInt(
      lights
        .slice(1, -1)
        .split('')
        .map((char) => (char === '#' ? 1 : 0))
        .reverse()
        .join(''),
      2
    ),
    buttonMasks: buttonsAndJoltage.slice(0, -1).map((b) =>
      b
        .slice(1, -1)
        .split(',')
        .map(Number)
        .reduce((mask, n) => mask + 2 ** n, 0)
    ),
    joltages,
  };
});

console.log(machines);

const pushes = machines.map(({ lights, buttonMasks }) => {
  const combinations = combinationsInRange(buttonMasks, 1, 10).sort((a, b) => a.length - b.length);

  for (const masks of combinations) {
    const result = masks.reduce((res, m) => res ^ m, 0);
    if (result === lights) {
      return masks;
    }
  }
});

console.log('PART1', pushes.map((p) => p?.length).sum());

console.timeLog('Solution');
