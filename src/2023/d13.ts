import '../array.js';
import { pairWise, range, rotateIterator } from '../util.js';

export function run() {
  console.log('Day 13');
  const fields = realInput
    .split('\n\n')
    .map((f) => f.split('\n').map((s) => s.split('')))
    .map((rows) => {
      return { rows: rows.map(lineAsNum), columns: [...rotateIterator(rows)].map(lineAsNum) };
    });
  console.log('Part 1: ', fields.map(findReflectionLine).sum());

  let checksum = 0;
  const fixedLines = fields.map((f, i) => {
    const rowReflectionFixed = findIndexAfterSmudge(f.rows, 'rows', i);
    const columnsReflectionFixed = findIndexAfterSmudge(f.columns, 'columns', i);
    if (rowReflectionFixed == null && columnsReflectionFixed == null) throw new Error('pis');
    checksum += rowReflectionFixed ? 1 : -1;
    return rowReflectionFixed != null ? (rowReflectionFixed + 1) * 100 : columnsReflectionFixed! + 1;
  });
  console.log({ checksum });
  console.log('Part 2: ', fixedLines.sum());
}

function findReflectionLine({ rows, columns }: { rows: number[]; columns: number[] }): number {
  const rowsReflection = findReflections(rows, 'row')[0];
  const columnsReflection = findReflections(columns, 'column')[0];
  return rowsReflection != null ? (rowsReflection + 1) * 100 : columnsReflection! + 1;
}

function findReflections(lines: number[], type: string) {
  const pairs = pairWise(lines.map((value, index) => ({ value, index }))).filter(([a, b]) => a.value === b.value);
  const reflectionLines = pairs.filter(([a, b]) => Math.abs(a.index - b.index) === 1);

  return reflectionLines
    .map((reflectionLine) => {
      const line = reflectionLine[0];
      const width = Math.min(line.index + 1, lines.length - line.index - 1) * 2;
      const pairsInReflectionWidth = pairs.filter((p) =>
        p.map((e) => e.index).every(isBetween(line.index + 1 - width / 2, line.index + width / 2))
      );
      const isTrueReflection = pairsInReflectionWidth.flatMap(([a, b]) => [a.index, b.index]).uniq().length === width;

      return isTrueReflection ? line.index : undefined;
    })
    .filter((n) => n != null);
}

const isBetween = (min: number, max: number) => (n: number) => n >= min && n <= max;

function findIndexAfterSmudge(lines: number[], type: string, index: number) {
  const linesAsNums = lines.map((l, index) => ({ value: l, index }));
  const pairs = pairWise(linesAsNums).filter(([a, b]) => Math.abs(a.index - b.index) % 2 === 1);

  const fixedReflections1 = pairs
    .filter(([a, b]) => {
      const log = Math.log2(a.value ^ b.value);
      return Math.abs(a.value - b.value) > 0 && Math.round(log) === log;
    })
    .flatMap(([a, b]) => {
      const testField = [...lines];
      testField.splice(a.index, 1, b.value);
      return findReflections(testField, 'smudge');
    })
    .filter((index) => index != null);
  const fixed = fixedReflections1.uniq().except(findReflections(lines, 'testOriginal').filter((n) => n != null));
  return fixed[0];
}

function lineAsNum(line: string[]): number {
  return parseInt(
    [...line].reduce((bin, char, i) => bin + (char === '.' ? '0' : '1'), ''),
    2
  );
}

const testInput = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const realInput = ``;
