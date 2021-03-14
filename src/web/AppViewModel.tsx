import Expenditure from "../entity/model/expenditure";
import ExpenditureRepo from "../repo/ExpenditureRepo";

export default class AppViewModel {
  repo: ExpenditureRepo
  // expenditures: Expenditure[];
  // filters: string[];

  constructor(
    repo: ExpenditureRepo,
    // expenditures: Expenditure[], 
    // filters: string[],
  ) {
    // this.filters = filters;
    // this.expenditures = expenditures;
    this.repo = repo;
  }

  filteredExpenditures(expenditures: Expenditure[], filters: string[]) {
    return expenditures.filter(({ type }) => {
      return !filters.some(filter => filter === type); 
    });
  }

  getExpenditures(year: number, month: number) {
    return this.repo.getExpenditures(year, month);
  }
}