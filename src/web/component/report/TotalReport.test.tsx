import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TotalReport from './TotalReport';
import { StoreProvider } from "../../store";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import Expenditure, { ExpenseType } from '../../../domain/entity/expenditure';

library.add(faCheckSquare);
library.add(faSquare);

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2021-03-01T15:00:00.000Z').getTime());

const mockData = [
  new Expenditure({
    name: "test-1",
    amount: 100,
    type: ExpenseType.tax,
    dueDateStart: "2021-03-01T15:00:00.000Z",
    dueDateEnd: "2021-03-01T15:00:00.000Z",
  }),
  new Expenditure({
    name: "test-2",
    amount: 300,
    type: ExpenseType.card,
    dueDateStart: "2021-03-03T15:00:00.000Z",
    dueDateEnd: "2021-03-03T15:00:00.000Z",
  }),
  new Expenditure({
    name: "test-3",
    amount: 500,
    type: ExpenseType.tradePayable,
    dueDateStart: "2021-03-05T15:00:00.000Z",
    dueDateEnd: "2021-03-05T15:00:00.000Z",
  }),
  new Expenditure({
    name: "test-4",
    amount: 700,
    type: ExpenseType.utilityBill,
    dueDateStart: "2021-03-05T15:00:00.000Z",
    dueDateEnd: "2021-03-05T15:00:00.000Z",
  }),
];

describe("필터링 조건에 맞게 총 금액 출력", () => {
  it("출금 항목 클릭시 각 항목 토글하여 총 출금액에 반영", async () => {
    renderTotalReport();

    expect(screen.getByText("1,600원")).toBeInTheDocument();

    fireEvent.click(screen.getByText("공과금"));
    await waitFor(() => {
      expect(screen.getByText("900원")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("거래처대금"));
    await waitFor(() => {
      expect(screen.getByText("400원")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("공과금"));
    await waitFor(() => {
      expect(screen.getByText("1,100원")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("카드 청구액"));
    await waitFor(() => {
      expect(screen.getByText("800원")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("세금"));
    fireEvent.click(screen.getByText("거래처대금"));
    await waitFor(() => {
      expect(screen.getByText("1,200원")).toBeInTheDocument();
    });
  });
});

function renderTotalReport() {
  return render(
    <StoreProvider initialValue={{
      expenditures: mockData,
      filteredExpenditures: mockData
    }}>
      <TotalReport />
    </StoreProvider>
  );
}