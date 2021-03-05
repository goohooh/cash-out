type expenseType = "tax" | "card" | "utilityBill" | "tradePayable";

interface Expenditure {
  readonly name: string;
  readonly amount: number;
  readonly type: expenseType;
  readonly dueDateStart: Date;
  readonly dueDateEnd: Date;
  // readonly paid: boolean;
}

export default Expenditure;