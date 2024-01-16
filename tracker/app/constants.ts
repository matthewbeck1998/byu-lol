// Ranks

const diamondMinusTiers = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Emerald",
  "Diamond",
];

const diamondMinusDivisions = ["IV", "III", "II", "I"];
const diamondMinusRanks = diamondMinusTiers
  .flatMap((tier) =>
    diamondMinusDivisions.map((division) => `${tier} ${division}`)
  )
  .concat();

const masterPlusTiers = ["Master", "Grandmaster", "Challenger"];
const masterPlusRanks = masterPlusTiers.map((tier) => `${tier} I`);

export const rankList = [...diamondMinusRanks, ...masterPlusRanks];

// Dates

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];