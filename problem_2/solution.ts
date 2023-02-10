import input from "./input";

const parseInput = (input: string) => input.split("\n");

type VillainOpts = "A" | "B" | "C";
type HeroOpts = "X" | "Y" | "Z";
type Results = "X" | "Y" | "Z";

const POINTS_FOR_WIN = 6;
const POINTS_FOR_DRAW = 3;
const POINTS_FOR_LOSE = 0;

const BONUS: Record<HeroOpts, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

const calculateRoundOne = (villain: VillainOpts, hero: HeroOpts): number => {
  const bonus = BONUS[hero];

  const calculateBaseScore = () => {
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

  return calculateBaseScore() + bonus;
};

const calculateRoundTwo = (villain: VillainOpts, result: Results) => {
  let baseScore = result === "Z" ? 6 : result === "Y" ? 3 : 0;

  const calculateBonus = (): number => {
    switch (result) {
      case "X": {
        if (villain === "A") return BONUS.Z;
        else if (villain === "B") return BONUS.X;
        return BONUS.Y;
      }
      case "Y": {
        if (villain === "A") return BONUS.X;
        else if (villain === "B") return BONUS.Y;
        return BONUS.Z;
      }
      case "Z": {
        if (villain === "A") return BONUS.Y;
        else if (villain === "B") return BONUS.Z;
        return BONUS.X;
      }
    }
  };

  return baseScore + calculateBonus();
};

const calculateTotalScore = (
  rounds: string[],
  calculateFunc: (villain: VillainOpts, variable: HeroOpts | Results) => number
) => {
  let total = 0;
  rounds.forEach((round) => {
    const [villain, hero] = round.split(" ") as [
      VillainOpts,
      HeroOpts | Results
    ];
    total += calculateFunc(villain, hero);
  });
  return total;
};

const solution1 = () => {
  const rounds = parseInput(input);
  return calculateTotalScore(rounds, calculateRoundOne);
};
const solution2 = () => {
  const rounds = parseInput(input);
  return calculateTotalScore(rounds, calculateRoundTwo);
};

console.log("solution to part1", solution1());
console.log("solution to part2", solution2());
