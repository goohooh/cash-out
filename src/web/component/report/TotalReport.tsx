import Expenditure, { ExpenseType } from "../../../entity/model/expenditure";
import { ExpenseTypeColorMap } from "../../../entity/structure/expenseTypeColorMap";
import styles from "./TotalReport.module.css";
import { numFormat } from "../../common/util";
import CategoryBox from "./CategoryBox";

const sumAllAmount = (total: number = 0, expenditure: Expenditure) => {
  total += expenditure.amount;
  return total;
};

export interface TotalReportProps {
  data: Expenditure[];
  filters: string[];
  setFilters: (filter: string[]) => void;
}

const TotalReport = ({ data, filters, setFilters }: TotalReportProps) => {
  // Todo: Generic과 무엇을 사용하면 filter의 콜백을 추출할 수 있을까
  const taxTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.tax)
    .reduce(sumAllAmount, 0);
  const utilityBillTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.utilityBill)
    .reduce(sumAllAmount, 0);
  const cardBillTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.card)
    .reduce(sumAllAmount, 0);
  const tradePayableTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.tradePayable)
    .reduce(sumAllAmount, 0);
  
  const expenditureTotal = taxTotal + utilityBillTotal + cardBillTotal + tradePayableTotal;
  const filterSet = new Set(filters);

  const toggleFilter = (filter: string) => {
    const index = filters.indexOf(filter);
    if (index === -1) {
      setFilters([...filters, filter]);
    } else {
      const newFilters = [...filters];
      newFilters.splice(index, 1);
      setFilters(newFilters)
    }
  }

  return (
    <div>
      <ul className={`${styles.container} flex flex-wrap`}>
        <li className={styles.category}
            onClick={() => toggleFilter(ExpenseType.utilityBill)}>
            <CategoryBox color={ExpenseTypeColorMap.utilityBill.colorLight}
                         label="공과금"
                         amount={utilityBillTotal}
                         unchecked={filterSet.has(ExpenseType.utilityBill)} />
        </li>

        <li className={styles.category}
            onClick={() => toggleFilter(ExpenseType.tax)}>
            <CategoryBox color={ExpenseTypeColorMap.tax.color}
                         label="세금"
                         amount={taxTotal}
                         unchecked={filterSet.has(ExpenseType.tax)} />
        </li>

        <li className={styles.category}
            onClick={() => toggleFilter(ExpenseType.card)}>
            <CategoryBox color={ExpenseTypeColorMap.card.color}
                         label="카드 청구액"
                         amount={cardBillTotal}
                         unchecked={filterSet.has(ExpenseType.card)} />
        </li>

        <li className={styles.category}
            onClick={() => toggleFilter(ExpenseType.tradePayable)}>
            <CategoryBox color={ExpenseTypeColorMap.card.color}
                         label="거래처대금"
                         amount={tradePayableTotal}
                         unchecked={filterSet.has(ExpenseType.tradePayable)} />
        </li>
      </ul>
      <div className={styles.total}>
        <span className="m-right-smallest">총 출금액</span>
        <strong>{numFormat(expenditureTotal)}원</strong>
      </div>
    </div>
  );
}

export default TotalReport;