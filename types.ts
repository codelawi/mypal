export type transformsTable = {
  id: string;
  content: string;
  type: "up" | "down";
  amont: number;
  date: string;
  time: string;
};

export type balanceTable = {
  id: string;
  total: number;
  salaryDate: string;
};

export type getTypes = {
  table: string;
};
