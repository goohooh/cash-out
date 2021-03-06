import Expenditure from "../../entity/expenditure";

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
      <ul>
        <li>공과금 {utilityBillTotal}</li>
        <li>세금 {taxTotal}</li>
        <li>공과금 {cardBillTotal}</li>
        <li>공과금 {tradePayableTotal}</li>
      </ul>
      <div>총 출금액 {expenditureTotal}</div>
    </div>
  );
}

export default TotalReport;