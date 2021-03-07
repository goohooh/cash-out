export type ExpenseType = "tax" | "card" | "utilityBill" | "tradePayable";

interface ExpenditureData {
  name: string;
  amount: number;
  type: string;
  dueDateStart: string;
  dueDateEnd: string;
}

class Expenditure {
  name: string;
  amount: number;
  type: string;
  dueDateStart: Date;
  dueDateEnd: Date;

  constructor(param: ExpenditureData) {
    this.name = param.name;
    this.amount = param.amount;
    this.type = param.type;
    this.dueDateStart = new Date(param.dueDateStart);
    this.dueDateEnd = new Date(param.dueDateEnd);
  }
}

export default Expenditure;