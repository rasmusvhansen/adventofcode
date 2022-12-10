export const add = (a: number, b: number) => a + b;
export const times = (a: number, b: number) => a * b;
export const sum = (ns: number[]) => ns.reduce(add, 0);
export const multiply = (ns: number[]) => ns.reduce(times, 1);
export const range = (start: number, end: number) => Array.from({ length: end - start + 1 }).map((_, i) => i + start);
export const toMatrix = <T = number>(input: string, map: (s: string, row: number, col: number) => T = (s) => +s as T) => {
  const matrix = new Map<string, T>();
  input.split('\n').map((s, row) => s.split('').map((n, col) => matrix.set(matrixKey(row, col), map(n, row, col))));
  return {
    get: (row: number, col: number) => matrix.get(matrixKey(row, col)),
    has: (row: number, col: number) => matrix.has(matrixKey(row, col)),
    forEach: matrix.forEach.bind(matrix) as Map<string, T>['forEach'],
    get size() {
      return matrix.size;
    },
  };
};

export const matrixKey = (row: number, col: number) => `${row},${col}`;
