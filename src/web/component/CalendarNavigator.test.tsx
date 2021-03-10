import { render, screen, waitFor } from '@testing-library/react';
import CalendarNavigator, { Props } from './CalendarNavigator';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronLeft);
library.add(faChevronRight);

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2021-03-01T15:00:00.000Z').getTime());

describe("render navigator properly", () => {
  it("renders month correctly", async () => {
    const baseDate = new Date();
    renderCalendarNavigator({ baseDate });

    const current = new Date();
    const currentMonth = current.getMonth() + 1;
    const prevMonthText = screen.getByText(`${currentMonth - 1}월`);
    const currentMonthText = screen.getByText(`${currentMonth}월`);
    const nextMonthText = screen.getByText(`${currentMonth + 1}월`);

    await waitFor(() => {
      expect(prevMonthText).toBeInTheDocument();
      expect(currentMonthText).toBeInTheDocument();
      expect(nextMonthText).toBeInTheDocument();
    });
  });
})

function renderCalendarNavigator(props: Partial<Props> = {}) {
    const defaultProps: Props = {
      baseDate: new Date,
      onClickNextMonth: () => {},
      onClickPrevMonth: () => {},
    };
    return render(<CalendarNavigator {...defaultProps} {...props} />);
  }