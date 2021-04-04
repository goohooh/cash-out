import React from "react";
import {
  addDays,
  subDays,
  addMonths,
  subMonths,
  endOfMonth,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

import Schedule from "../../../domain/entity/schedule";
import { groupBy } from "../../common/util";

import CalendarNavigator from "./CalendarNavigator";
import CalendarCell from "./CalendarCell";
import styles from "./Calendar.module.css";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarProps {
  baseDate: Date;
  data: Schedule[];
  setBaseDate: (date: Date) => void;
  onClickCell: (date: Date) => void;
  children?: React.ReactNode;
}

const Calendar = React.memo(({
  baseDate,
  data,
  setBaseDate,
  onClickCell,
  children
}: CalendarProps) => {
  const onClickPrevMonth = () => {
    setBaseDate(subMonths(baseDate, 1));
  }
  const onClickNextMonth = () => {
    setBaseDate(addMonths(baseDate, 1));
  }

  // - 컴포넌트가 상태를 최소화한다.
  // 1. component는 use case에게 전달할 인자들을 들고(알고)있다. - input port
  // 2. usecase는 유저의 입력에 따라 새로운 값을 리턴하고 - interactor를 호출한다 with input port
  // 3. 리턴된 값은 UI를 다시 렌더링 한다 ->  output port가 re-rendering
  /*
  const usecase = new CalendarUseCase(
    expenditureRepo,
    repo,
    repo,
  )

  class usecase {
    m() {}
    m1() {}
  }
  const [schedule, setSchedule] = useState([]);
  setSchedule
  */

  const endOfMonthDate: Date = endOfMonth(baseDate);

  const prevDays: Date[] = Array(baseDate.getDay())
    .fill(0)
    .map((_, i, arr) => subDays(baseDate, (arr.length - i)))
  const currentDays: Date[] = Array(endOfMonthDate.getDate())
    .fill(0)
    .map((_, i) => addDays(baseDate, i));
  const nextDays: Date[] = Array(7 - endOfMonthDate.getDay() - 1)
    .fill(0)
    .map((_, i) => addDays(endOfMonthDate, i + 1));

  const days = [...prevDays, ...currentDays, ...nextDays];

  const groupedData = groupBy(data, item => item.key);
  const today: Date = new Date();

  return (
    <div className="container">
      <CalendarNavigator baseDate={baseDate}
                         onClickPrevMonth={onClickPrevMonth}
                         onClickNextMonth={onClickNextMonth} />

      {children}

      <div className={styles.weekdays}>
        {weekdays.map(weekday => (
          <div key={weekday} className="txt-smaller">{weekday}</div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map(day => {
          const key = format(day, "MM-dd");
          const sameMonth = isSameMonth(day, baseDate);

          return <CalendarCell key={key}
                               isToday={isSameDay(day, today)}
                               isSameMonth={sameMonth}
                               date={day}
                               schedules={groupedData[key]}
                               onClick={() => {
                                 sameMonth && onClickCell(day);
                               }} />;
        })}      
      </div>
    </div>
  );
}, (prev, cur) => {
  return prev.data === cur.data;
});

export default Calendar;