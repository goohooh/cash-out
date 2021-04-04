import { useContext } from "react";

import { storeContext, ActionTypes } from "../../store";

import Expenditure, { ExpenseType } from "../../../domain/entity/expenditure";
import { ExpenseTypeColorMap } from "../../../domain/value-object/expenseTypeColorMap";
import styles from "./TotalReport.module.css";
import { numFormat } from "../../common/util";
import CategoryBox from "./CategoryBox";

const sumAllAmount = (total: number = 0, expenditure: Expenditure) => {
  total += expenditure.amount;
  return total;
};

const typeFilter = (type: ExpenseType) => (expenditure: Expenditure) =>
    expenditure.type === type;

const TotalReport = () => {
  const { state, dispatch } = useContext(storeContext);
  const { filters, filteredExpenditures } = state;

  // Todo: Generic과 무엇을 사용하면 filter의 콜백을 추출할 수 있을까
  const taxTotal: number = filteredExpenditures
    .filter(typeFilter(ExpenseType.tax))
    .reduce(sumAllAmount, 0);
  const utilityBillTotal: number = filteredExpenditures
    .filter(typeFilter(ExpenseType.utilityBill))
    .reduce(sumAllAmount, 0);
  const cardBillTotal: number = filteredExpenditures
    .filter(typeFilter(ExpenseType.card))
    .reduce(sumAllAmount, 0);
  const tradePayableTotal: number = filteredExpenditures
    .filter(typeFilter(ExpenseType.tradePayable))
    .reduce(sumAllAmount, 0);
 
  // 아래 한줄로 모든 로직 해결
  // const [schedule, setSchedule] = useState(usecase.getThisMonthAnalytics(options)); 
  const expenditureTotal = taxTotal + utilityBillTotal + cardBillTotal + tradePayableTotal;

  const filterSet = new Set(filters);
  const setFilters = (filter: ExpenseType) => {
    dispatch({ type: ActionTypes.ToggleFilter, payload: filter});
    dispatch({ type: ActionTypes.SetFilteredExpenditures });
  }

  return (
    <div>
      <ul className={`${styles.container} flex flex-wrap`}>
        <li className={styles.category}
            onClick={(e) => {
              e.stopPropagation();
              setFilters(ExpenseType.utilityBill)
            }}>
            <CategoryBox color={ExpenseTypeColorMap.utilityBill.colorLight}
                         label="공과금"
                         amount={utilityBillTotal}
                         unchecked={filterSet.has(ExpenseType.utilityBill)} />
        </li>

        <li className={styles.category}
            onClick={() => setFilters(ExpenseType.tax)}>
            <CategoryBox color={ExpenseTypeColorMap.tax.color}
                         label="세금"
                         amount={taxTotal}
                         unchecked={filterSet.has(ExpenseType.tax)} />
        </li>

        <li className={styles.category}
            onClick={() => setFilters(ExpenseType.card)}>
            <CategoryBox color={ExpenseTypeColorMap.card.color}
                         label="카드 청구액"
                         amount={cardBillTotal}
                         unchecked={filterSet.has(ExpenseType.card)} />
        </li>

        <li className={styles.category}
            onClick={() => setFilters(ExpenseType.tradePayable)}>
            <CategoryBox color={ExpenseTypeColorMap.tradePayable.color}
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