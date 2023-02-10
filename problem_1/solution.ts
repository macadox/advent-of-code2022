import input from "./input";

const regex = new RegExp("(?:\r?\n){2,}");

const parseInput = (input: string) =>
  input.split(regex).map((item) => item.split("\n"));

function countTotal(vals: number[]): number;
function countTotal(vals: string[]): number;

function countTotal(vals: number[] | string[]): number {
  let sum = 0;

  vals.forEach((val: number | string) => {
    if (typeof val === "number") sum += val;
    else sum += Number(val);
  });

  return sum;
}

const countTopElfsBags = (elfBags: string[][], top: number) => {
  const topElfsKcal: number[] = new Array(top).fill(0);

  elfBags.forEach((bag) => {
    const currentBagKcal = countTotal(bag);
    const indexToReplace = topElfsKcal.findIndex((bag) => bag < currentBagKcal);

    if (indexToReplace > -1) {
      topElfsKcal[indexToReplace] = currentBagKcal;
    }

    topElfsKcal.sort((a, b) => a - b);
  });

  return topElfsKcal;
};

const solution1 = () => {
  const _input = parseInput(input);
  const topCalories = countTopElfsBags(_input, 1);

  return countTotal(topCalories);
};

const solution2 = () => {
  const _input = parseInput(input);
  const topCalories = countTopElfsBags(_input, 3);

  return countTotal(topCalories);
};

console.log("solution to part1", solution1());
console.log("solution to part2", solution2());
