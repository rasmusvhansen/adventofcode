/// <reference path="./types/array.d.ts" />

Array.prototype.sum = function (field) {
  return this.map(field ? (o) => o[field] : (o) => o).reduce((sum, n) => sum + +n, 0);
};

Array.prototype.max = function (field) {
  return Math.max(...this.map(field ? (o) => o[field] : (o) => o));
};

Array.prototype.min = function (field) {
  return Math.min(...this.map(field ? (o) => o[field] : (o) => o));
};

Array.prototype.first = function (n = 1) {
  return this.slice(0, n);
};

Array.prototype.last = function (n = 1) {
  return this.slice(-n);
};

Array.prototype.sortDesc = function () {
  return [...this].sort((a, b) => b - a);
};

Array.prototype.sortAsc = function () {
  return [...this].sort((a, b) => a - b);
};

Array.prototype.uniq = function (field) {
  return [...new Set(this.map(field ? (o) => o[field] : (o) => o))];
};

Array.prototype.pluck = function (field) {
  return this.map((o) => o[field]);
};

Array.prototype.except = function (that) {
  return this.filter((e) => !that.includes(e));
};

Array.prototype.intersect = function (that) {
  return this.filter((e) => that.includes(e));
};

Array.prototype.intersect2 = function (arr1, arr2) {
  return this.filter((e) => arr1.includes(e) && arr2.includes(e));
};

Array.prototype.union = function (that) {
  return [...new Set([...this, ...that])];
};

Array.prototype.toNumbers = function () {
  return this.map((x) => +x);
};

Array.prototype.chunk = function <T>(n: number) {
  return this.reduce((groups, rucksack, i) => {
    groups[Math.floor(i / n)] = groups[Math.floor(i / n)] || [];
    groups[Math.floor(i / n)].push(rucksack);
    return groups;
  }, [] as T[][]);
};

Array.prototype.equals = function <T>(that: T[]) {
  return this.length === that.length && this.every((e, i) => e === that[i]);
};

Array.prototype.removeIndex = function (index: number) {
  return this.filter((_, i) => i !== index);
};
