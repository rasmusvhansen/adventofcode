import 'array';

export function run() {
  console.log('Day 9');
  const numbers = realInput.split('\n').map((l) => l.split(' ').map(Number));
  console.log('Part 1: ', numbers.map(nextHistory).sum());
  console.log('Part 2: ', numbers.map(prevHistory).sum());
}

function nextHistory(history: number[]): number {
  let diff = [differences(history)];
  while (diff.at(-1)!.some((n) => !!n)) {
    diff.push(differences(diff.at(-1)!));
  }
  return diff.map((d) => d.at(-1)!).sum() + history.at(-1)!;
}

function prevHistory(history: number[]): number {
  let diffs = [differences(history)];
  while (diffs.at(-1)!.some((n) => !!n)) {
    diffs.push(differences(diffs.at(-1)!));
  }
  diffs.reverse().forEach((d, i, arr) => {
    if (i === arr.length - 1) return;
    if (i === 0) d.unshift(0);

    const prev = arr[i + 1][0]! - d[0];
    arr[i + 1].unshift(prev);
  });
  return history[0]! - diffs.at(-1)![0]!;
}

function differences(numbers: number[]): number[] {
  return numbers.map((n, i, arr) => (i === 0 ? undefined : n - arr[i - 1])).filter((n) => n != null) as number[];
}

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const realInput = ``;
