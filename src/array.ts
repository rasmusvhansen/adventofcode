Array.prototype.sum = function (field) {
  return this.map(field ? (o) => o[field] : (o) => o).reduce((sum, n) => sum + n, 0);
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

Array.prototype.union = function (that) {
  return [...new Set([...this, ...that])];
};

Array.prototype.toNumbers = function () {
  return this.map((x) => +x);
};
