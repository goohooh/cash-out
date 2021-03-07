import { ExpenseType } from "../model/expenditure";

export interface Color {
  color: string,
  background: string,
}

export const ExpenseTypeColorMap: Record<string, Color> = {
  [ExpenseType.utilityBill]: {
    color: "#C53A51",
    background: "rgba(255, 230, 192, 1)",
  },
  [ExpenseType.tax]: {
    color: "#0B357E",
    background: "rgba(217, 243, 255, 1)",
  },
  [ExpenseType.card]: {
    color: "#9055A2",
    background: "rgba(232, 219, 240, 1)",
  },
  [ExpenseType.tradePayable]: {
    color: "#07A8AD",
    background: "rgba(207, 240, 218, 1)",
  },
};
