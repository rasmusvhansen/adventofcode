import { range } from '../util';
import '../array';

export function run() {
  const inspected: Record<number, number> = {};

  const monkeys = realMonkeys;
  const combinedMod = monkeys.reduce((m, monkey) => m * monkey.mod, 1);
  // part 1
  // range(1, 20).forEach((round) => {
  range(1, 10000).forEach((round) => {
    monkeys.forEach((m, monkeyIndex) => {
      m.items.forEach((item) => {
        // part 1
        // const newWorryLevel = Math.floor(m.operation(item) / 3);
        const newWorryLevel = m.operation(item) % combinedMod;
        const test = m.test(newWorryLevel);
        const throwTo = test ? m.throwToOnTrue : m.throwToOnFalse;
        monkeys[throwTo].items.push(newWorryLevel);
        inspected[monkeyIndex] = (inspected[monkeyIndex] || 0) + 1;
      });
      m.items = [];
    });
  });
  const topMonkeys = Object.values(inspected).sortDesc().slice(0, 2);
  console.log(inspected);
  console.log(topMonkeys[0] * topMonkeys[1]);
}

type Monkey = {
  mod: number;
  items: number[];
  operation(item: number): number;
  test(item: number): boolean;
  throwToOnTrue: number;
  throwToOnFalse: number;
};

const testMonkeys: Monkey[] = [
  {
    mod: 23,
    items: [79, 98],
    operation(old) {
      return old * 19;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 2,
    throwToOnFalse: 3,
  },

  {
    mod: 19,
    items: [54, 65, 75, 74],
    operation(old) {
      return old + 6;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 2,
    throwToOnFalse: 0,
  },

  {
    mod: 13,
    items: [79, 60, 97],
    operation(old) {
      return old * old;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 1,
    throwToOnFalse: 3,
  },

  {
    mod: 17,
    items: [74],
    operation(old) {
      return old + 3;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 0,
    throwToOnFalse: 1,
  },
];

const realMonkeys: Monkey[] = [
  {
    mod: 11,
    items: [75, 63],
    operation(old) {
      return old * 3;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 7,
    throwToOnFalse: 2,
  },

  {
    mod: 2,
    items: [65, 79, 98, 77, 56, 54, 83, 94],
    operation(old) {
      return old + 3;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 2,
    throwToOnFalse: 0,
  },

  {
    mod: 5,
    items: [66],
    operation(old) {
      return old + 5;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 7,
    throwToOnFalse: 5,
  },

  {
    mod: 7,
    items: [51, 89, 90],
    operation(old) {
      return old * 19;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 6,
    throwToOnFalse: 4,
  },

  {
    mod: 17,
    items: [75, 94, 66, 90, 77, 82, 61],
    operation(old) {
      return old + 1;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 6,
    throwToOnFalse: 1,
  },

  {
    mod: 19,
    items: [53, 76, 59, 92, 95],
    operation(old) {
      return old + 2;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 4,
    throwToOnFalse: 3,
  },

  {
    mod: 3,
    items: [81, 61, 75, 89, 70, 92],
    operation(old) {
      return old * old;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 0,
    throwToOnFalse: 1,
  },

  {
    mod: 13,
    items: [81, 86, 62, 87],
    operation(old) {
      return old + 8;
    },
    test(item) {
      return item % this.mod === 0;
    },
    throwToOnTrue: 3,
    throwToOnFalse: 5,
  },
];
