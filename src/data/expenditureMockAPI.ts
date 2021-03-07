import ExpenditureRepo from "../repo/ExpenditureRepo";
import Expenditure from "../entity/model/expenditure";
import mockData from "./data.json";

export default class ExpenditureMockAPI implements ExpenditureRepo {
    getExpenditures(year: number, month: number): Promise<Expenditure[]> {
        const filtered: Expenditure[] = mockData
            .map(data => new Expenditure(data))
            .filter(data => {
                const start: Date = data.dueDateStart;
                const end: Date = data.dueDateEnd;

                const inThisYear: boolean =
                    [start.getFullYear(), end.getFullYear()]
                        .some((_year: number) => _year === year);
                const inThisMonth: boolean =
                    [start.getMonth(), end.getMonth()]
                        .some((_month: number) => _month === month);

                return inThisYear && inThisMonth;
            });

        return Promise.resolve(filtered);
    } 
}