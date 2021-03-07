import Expenditure from "../../entity/expenditure";
import styles from "./TotalReport.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TotalReportProps {
  data: Expenditure[]
}

const sumAllAmount = (total: number = 0, expenditure: Expenditure) => {
  total += expenditure.amount;
  return total;
};

const TotalReport = (props: TotalReportProps) => {
  // Todo: Generic과 무엇을 사용하면 filter의 콜백을 추출할 수 있을까
  const taxTotal: number = props.data
    .filter((expenditure: Expenditure) => expenditure.type === "tax")
    .reduce(sumAllAmount, 0);
  const utilityBillTotal: number = props.data
    .filter((expenditure: Expenditure) => expenditure.type === "utilityBill")
    .reduce(sumAllAmount, 0);
  const cardBillTotal: number = props.data
    .filter((expenditure: Expenditure) => expenditure.type === "card")
    .reduce(sumAllAmount, 0);
  const tradePayableTotal: number = props.data
    .filter((expenditure: Expenditure) => expenditure.type === "tradePayable")
    .reduce(sumAllAmount, 0);
  
  const expenditureTotal = taxTotal + utilityBillTotal + cardBillTotal + tradePayableTotal;

  return (
    <div>
      <ul className={`${styles.container} flex flex-wrap`}>
        <li className={styles.category}>
          <span>
            <FontAwesomeIcon icon="check-square" /> 공과금
          </span>
          <strong>{utilityBillTotal}</strong>
        </li>

        <li className={styles.category}>
          <span>
            <FontAwesomeIcon icon="check-square" /> 세금
          </span>
          <strong>{taxTotal}원</strong>
        </li>

        <li className={styles.category}>
          <span>
            <FontAwesomeIcon icon="check-square" /> 카드 청구액
          </span>
          <strong>{cardBillTotal}원</strong>
        </li>

        <li className={styles.category}>
          <span>
            <FontAwesomeIcon icon="check-square" /> 거래처대금
          </span>
          <strong>{tradePayableTotal}원</strong>
        </li>
      </ul>
      <div className={styles.total}>
        <span className="m-right-smallest">총 출금액</span>
        <strong>{expenditureTotal}원</strong>
      </div>
    </div>
  );
}

export default TotalReport;