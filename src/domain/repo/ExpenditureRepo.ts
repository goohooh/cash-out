import Expenditure from "../entity/expenditure";

interface ExpenditureRepo {
    getExpenditures(year: number, month: number): Promise<Expenditure[]>
}

export default ExpenditureRepo;