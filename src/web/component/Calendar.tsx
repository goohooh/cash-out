import React from "react";
import {
  addDays,
  subDays,
  endOfMonth,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

import Schedule from "../../entity/model/schedule";
import { groupBy } from "../../common/util";

// import Schedule from "./Schedule";
import CalendarNavigator from "./CalendarNavigator";
import CalendarCell from "./CalendarCell";
import styles from "./Calendar.module.css";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarProps {
  baseDate: Date;
  setSelectedDate: (date: Date | null) => void;
  setBaseDate: (date: Date) => void;
  data: Schedule[];
  toggleModal: () => void;
  children?: React.ReactNode;
}

const Calendar = ({
  baseDate,
  setBaseDate,
  data,
  setSelectedDate,
  toggleModal,
  children
}: CalendarProps) => {
  const onClickPrevMonth = () => {
    const selectedMonth = baseDate.getMonth();
    const newDate = new Date(
      baseDate.getFullYear(),
      selectedMonth - 1,
      1
    );
    setBaseDate(newDate);
  }
  const onClickNextMonth = () => {
    const selectedMonth = baseDate.getMonth();
    const newDate = new Date(
      baseDate.getFullYear(),
      selectedMonth + 1,
      1
    );
    setBaseDate(newDate);
  }

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

  const days = [
    ...prevDays,
    ...currentDays,
    ...nextDays
  ];



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

          return <CalendarCell key={key}
                               isToday={isSameDay(day, today)}
                               isSameMonth={isSameMonth(day, baseDate)}
                               date={day}
                               schedules={groupedData[key]}
                               onClick={() => {
                                 setSelectedDate(day);
                                 toggleModal();
                               }} />;
        })}      
      </div>
    </div>
  );
}

export default Calendar;