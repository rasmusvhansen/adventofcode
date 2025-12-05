import { readFileSync } from 'fs';
import '../array';

const input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 5', process.argv[2]);
console.time('Solution');
const ranges = input
  .split('\n\n')[0]
  .split('\n')
  .map((r) => r.split('-').map(Number));
const ids = input.split('\n\n')[1].split('\n').map(Number);

const fresh = ids.filter((id) => ranges.some(([low, high]) => id >= low && id <= high)).length;
console.log('Part 1: ', fresh);

// sort ranges by start, collapse overlapping, sum size of ranges
ranges.sort(([a], [b]) => a - b);
const resolvedRanges: number[][] = [];
let currentRange = ranges[0];
for (const range of ranges.slice(1)) {
  if (currentRange[1] < range[0]) {
    resolvedRanges.push(currentRange);
    currentRange = range;
  } else currentRange = [currentRange[0], Math.max(range[1], currentRange[1])];
}
resolvedRanges.push(currentRange);

console.log('Part 2: ', resolvedRanges.map(([low, high]) => high - low + 1).sum());

console.timeLog('Solution');
