interface Expenditure {
  readonly name: string;
  readonly amount: number;
  readonly type: string;
  readonly dueDateStart: Date;
  readonly dueDateEnd: Date;
  readonly paid: boolean;
}

export default Expenditure;