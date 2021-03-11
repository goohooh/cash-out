import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TotalReport, { TotalReportProps } from './TotalReport';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import Expenditure, { ExpenseType } from '../../entity/model/expenditure';
import { numFormat } from "../common/util";

library.add(faCheckSquare);

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

describe("Render total report properly", () => {
  it("show total amount all", async () => {
    renderTotalReport({ data: mockData });

    const totalAmount = await screen.findByText(`${numFormat(1600)}원`);

    await waitFor(() => {
      expect(totalAmount).toBeInTheDocument();
    });
  });

  it("show total amount without utility bill", async () => {
    renderTotalReport({
      data: mockData.filter(
        (exp: Expenditure) => exp.type !== ExpenseType.utilityBill
      )
    });

    const totalAmount = await screen.findByText(`${numFormat(900)}원`);

    await waitFor(() => {
      expect(totalAmount).toBeInTheDocument();
    });
  });

  it("show total amount without tax", async () => {
    renderTotalReport({
      data: mockData.filter(
        (exp: Expenditure) => exp.type !== ExpenseType.tax
      )
    });

    const totalAmount = await screen.findByText(`${numFormat(1500)}원`);

    await waitFor(() => {
      expect(totalAmount).toBeInTheDocument();
    });
  });

  it("show total amount without card", async () => {
    renderTotalReport({
      data: mockData.filter(
        (exp: Expenditure) => exp.type !== ExpenseType.card
      )
    });

    const totalAmount = await screen.findByText(`${numFormat(1300)}원`);

    await waitFor(() => {
      expect(totalAmount).toBeInTheDocument();
    });
  });

  it("show total amount without trade payable", async () => {
    renderTotalReport({
      data: mockData.filter(
        (exp: Expenditure) => exp.type !== ExpenseType.tradePayable
      )
    });

    const totalAmount = await screen.findByText(`${numFormat(1100)}원`);

    await waitFor(() => {
      expect(totalAmount).toBeInTheDocument();
    });
  });
});

function renderTotalReport(props: Partial<TotalReportProps> = {}) {
  const defaultProps: TotalReportProps = {
    data: [],
    filters: [],
    setFilters: () => {},
  };
  return render(<TotalReport {...defaultProps} {...props} />);
}