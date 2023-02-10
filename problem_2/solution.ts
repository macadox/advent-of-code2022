import input from "./input";

const parseInput = (input: string) => input.split("\n");

type VillainOpts = "A" | "B" | "C";
type HeroOpts = "X" | "Y" | "Z";

const POINTS_FOR_WIN = 6;
const POINTS_FOR_DRAW = 3;
const POINTS_FOR_LOSE = 0;

const BONUS: Record<HeroOpts, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const calculateRound = (villain: VillainOpts, hero: HeroOpts): number => {
  switch (hero) {
    case "X": {
      if (villain === "A") return POINTS_FOR_DRAW;
      else if (villain === "B") return POINTS_FOR_LOSE;
      return POINTS_FOR_WIN;
    }
    case "Y": {
      if (villain === "A") return POINTS_FOR_WIN;
      else if (villain === "B") return POINTS_FOR_DRAW;
      return POINTS_FOR_LOSE;
    }
    case "Z": {
      if (villain === "A") return POINTS_FOR_LOSE;
      else if (villain === "B") return POINTS_FOR_WIN;
      return POINTS_FOR_DRAW;
    }
  }
};

const calculateTotalScore = (rounds: string[]) => {
  let total = 0;
  rounds.forEach((round) => {
    const [villain, hero] = round.split(" ") as [VillainOpts, HeroOpts];
    total += calculateRound(villain, hero) + BONUS[hero];
  });
  return total;
};

const solution1 = () => {
  const rounds = parseInput(input);
  return calculateTotalScore(rounds);
};
const solution2 = () => {};

console.log("solution to part1", solution1());
console.log("solution to part2", solution2());
