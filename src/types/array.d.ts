export {};

declare global {
  interface Array<T> {
    sum(field?: keyof T): number;
    max(field?: keyof T): number;
    min(field?: keyof T): number;
    first(n: number): T[];
    last(n: number): T[];
    sortDesc(): T[];
    sortAsc(): T[];
    uniq(field?: keyof T): T[];
    pluck(field: keyof T): T[field][];
    except(that: T[]): T[];
    intersect(that: T[]): T[];
    union(that: T[]): T[];
    toNumbers(): number[];
  }
}
