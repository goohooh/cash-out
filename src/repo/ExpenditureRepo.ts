import Expenditure from "../entity/model/expenditure";

interface ExpenditureRepo {
    getExpenditures(year: number, month: number): Promise<Expenditure[]>
}

export default ExpenditureRepo;