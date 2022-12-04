export const add = (a: number, b: number) => a + b;
export const times = (a: number, b: number) => a * b;
export const sum = (ns: number[]) => ns.reduce(add, 0);
export const multiply = (ns: number[]) => ns.reduce(times, 1);
export const range = (start: number, end: number) => Array.from({ length: end - start + 1 }).map((_, i) => i + start);
