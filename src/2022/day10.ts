import '../array';
import { range } from '../util';

export function run() {
  const instructions = testInput.split('\n');
  const cpu = new Cpu(instructions);

  console.log('Part 1', [20, 40, 40, 40, 40, 40].map((n) => cpu.run(n) * cpu.cycle).sum());

  const cpu2 = new Cpu(instructions);
  const chars = range(0, 239).map((cycle) => {
    cpu2.run(1);
    const position = cycle % 40;
    const newLine = position === 39 ? '\n' : '';
    return (Math.abs(position - cpu2.v) < 2 ? '@' : ' ') + newLine;
  });
  console.log('Part 2');
  console.log(chars.join(''));
}

class Cpu {
  v = 1;
  addFromPrevious = 0;
  private instructions: string[];
  cycle = 0;
  runningInstruction = '';

  constructor(instructions: string[]) {
    this.instructions = [...instructions];
  }

  run(cycles: number) {
    while (cycles > 0) {
      this.v += this.addFromPrevious;
      this.addFromPrevious = 0;
      if (this.runningInstruction) {
        this.addFromPrevious = +this.runningInstruction.split(' ')[1];
        this.runningInstruction = '';
      } else {
        const newInstruction = this.instructions.shift()!;
        if (newInstruction !== 'noop') this.runningInstruction = newInstruction;
      }
      cycles--;
      this.cycle++;
    }
    return this.v;
  }
}

const testInput = `noop
noop
noop
addx 3
addx 20
noop
addx -12
noop
addx 4
noop
noop
noop
addx 1
addx 2
addx 5
addx 16
addx -14
addx -25
addx 30
addx 1
noop
addx 5
noop
addx -38
noop
noop
noop
addx 3
addx 2
noop
noop
noop
addx 5
addx 5
addx 2
addx 13
addx 6
addx -16
addx 2
addx 5
addx -15
addx 16
addx 7
noop
addx -2
addx 2
addx 5
addx -39
addx 4
addx -2
addx 2
addx 7
noop
addx -2
addx 17
addx -10
noop
noop
addx 5
addx -1
addx 6
noop
addx -2
addx 5
addx -8
addx 12
addx 3
addx -2
addx -19
addx -16
addx 2
addx 5
noop
addx 25
addx 7
addx -29
addx 3
addx 4
addx -4
addx 9
noop
addx 2
addx -20
addx 23
addx 1
noop
addx 5
addx -10
addx 14
addx 2
addx -1
addx -38
noop
addx 20
addx -15
noop
addx 7
noop
addx 26
addx -25
addx 2
addx 7
noop
noop
addx 2
addx -5
addx 6
addx 5
addx 2
addx 8
addx -3
noop
addx 3
addx -2
addx -38
addx 13
addx -6
noop
addx 1
addx 5
noop
noop
noop
noop
addx 2
noop
noop
addx 7
addx 3
addx -2
addx 2
addx 5
addx 2
noop
addx 1
addx 5
noop
noop
noop
noop
noop
noop`;
