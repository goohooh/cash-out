import Expenditure, { ExpenseType } from "../../entity/model/expenditure";
import styles from "./TotalReport.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { numFormat } from "../common/util";

const sumAllAmount = (total: number = 0, expenditure: Expenditure) => {
  total += expenditure.amount;
  return total;
};

interface TotalReportProps {
  data: Expenditure[];
  filters: string[];
  setFilters: (filter: string[]) => void;
}

const UnCheckedIcon = () =>
  <FontAwesomeIcon icon="check-square"
                   color="#eee"
                   className="m-right-smallest" />

const TotalReport = ({ data, filters, setFilters }: TotalReportProps) => {
  // Todo: Generic과 무엇을 사용하면 filter의 콜백을 추출할 수 있을까
  const taxTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.tax)
    .filter((expenditure: Expenditure) => !filters.some(filter => expenditure.type === filter))
    .reduce(sumAllAmount, 0);
  const utilityBillTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.utilityBill)
    .filter((expenditure: Expenditure) => !filters.some(filter => expenditure.type === filter))
    .reduce(sumAllAmount, 0);
  const cardBillTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.card)
    .filter((expenditure: Expenditure) => !filters.some(filter => expenditure.type === filter))
    .reduce(sumAllAmount, 0);
  const tradePayableTotal: number = data
    .filter((expenditure: Expenditure) => expenditure.type === ExpenseType.tradePayable)
    .filter((expenditure: Expenditure) => !filters.some(filter => expenditure.type === filter))
    .reduce(sumAllAmount, 0);
  
  const expenditureTotal = taxTotal + utilityBillTotal + cardBillTotal + tradePayableTotal;

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
            onClick={() => {
              toggleFilter(ExpenseType.utilityBill);
            }}>
          <span>
            {
              filters.some(filter => filter === ExpenseType.utilityBill)
                ? <UnCheckedIcon />
                : <FontAwesomeIcon icon="check-square"
                                   className="utility-bill-light-color m-right-smallest" />
            }
            {/* <FontAwesomeIcon icon="check-square"
                             className="utility-bill-light-color m-right-smallest" /> */}
            공과금
          </span>
          <strong className="utility-bill-light-color">
            {numFormat(utilityBillTotal)}원
            </strong>
        </li>

        <li className={styles.category}
            onClick={() => {
              toggleFilter(ExpenseType.tax);
            }}>
          <span>
            {
              filters.find(filter => filter === ExpenseType.tax)
                ? <UnCheckedIcon />
                : <FontAwesomeIcon icon="check-square"
                                   className="tax-color m-right-smallest" />
            }
            {/* <FontAwesomeIcon icon="check-square"
                             className="tax-color m-right-smallest" /> */}
            세금
          </span>
          <strong className="tax-color">
            {numFormat(taxTotal)}원
          </strong>
        </li>

        <li className={styles.category}
            onClick={() => {
              toggleFilter(ExpenseType.card);
            }}>
          <span>
            {
              filters.find(filter => filter === ExpenseType.card)
                ? <UnCheckedIcon />
                : <FontAwesomeIcon icon="check-square"
                                   className="card-color m-right-smallest" />
            }
            {/* <FontAwesomeIcon icon="check-square"
                             className="card-color m-right-smallest" /> */}
            카드 청구액
          </span>
          <strong className="card-color">
            {numFormat(cardBillTotal)}원
          </strong>
        </li>

        <li className={styles.category}
            onClick={() => {
              toggleFilter(ExpenseType.tradePayable);
            }}>
          <span>
            {
              filters.find(filter => filter === ExpenseType.tradePayable)
                ? <UnCheckedIcon />
                : <FontAwesomeIcon icon="check-square"
                                   className="trade-payable-color m-right-smallest" />
            }
            {/* <FontAwesomeIcon icon="check-square"
                             className="trade-payable-color m-right-smallest" /> */}
            거래처대금
          </span>
          <strong className="trade-payable-color">
            {numFormat(tradePayableTotal)}원
          </strong>
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