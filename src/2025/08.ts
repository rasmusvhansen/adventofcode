import { readFileSync } from 'fs';
import '../array';
import { allPairs, euclidianDistance, Point3D, point3dKey } from '@util';

const input = readFileSync(process.argv[2], 'utf-8').trim();
console.log('Day 8', process.argv[2]);
console.time('Solution');
const CLOSEST_N = 1000;

const boxes = input.split('\n').map((b) => b.split(',').map(Number) as Point3D);
const pairs = allPairs(boxes);
const pairsWithDistances = pairs
  .map(([a, b]) => ({ pair: [a, b] as const, distance: euclidianDistance(a, b) }))
  .sort((a, b) => a.distance - b.distance);

const circuits: Set<string>[] = [];

let connections = 0;

for (const {
  pair: [a, b],
} of pairsWithDistances) {
  const aKey = point3dKey(a);
  const bKey = point3dKey(b);
  const aCircuit = circuits.find((c) => c.has(aKey));
  const bCircuit = circuits.find((c) => c.has(bKey));
  if (aCircuit && bCircuit) {
    const union = aCircuit.union(bCircuit);
    aCircuit.clear();
    bCircuit.clear();
    union.forEach((k) => aCircuit.add(k));
  }
  if (aCircuit) {
    if (!aCircuit.has(bKey)) aCircuit.add(bKey);
  } else if (bCircuit) {
    if (!bCircuit.has(aKey)) bCircuit.add(aKey);
  } else {
    circuits.push(new Set([aKey, bKey]));
  }
  connections++;
  if (connections === CLOSEST_N) {
    console.log(
      'PART 1',
      circuits
        .sort((a, b) => b.size - a.size)
        .slice(0, 3)
        .map((c) => c.size)
        .reduce((product, n) => product * n, 1)
    );
  }

  circuits.sort((a, b) => b.size - a.size);
  if (circuits[0].size === boxes.length) {
    console.log('PART 2', a[0] * b[0]);
    break;
  }
}

console.timeLog('Solution');
