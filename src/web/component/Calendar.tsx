import React from "react";
import {
  addDays,
  subDays,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
} from "date-fns";

import Expenditure from "../../entity/expenditure";
import { groupBy } from "../../common/util";

// import Schedule from "./Schedule";
import CalendarNavigator from "./CalendarNavigator";
import CalendarCell from "./CalendarCell";
import styles from "./Calendar.module.css";
import Schedule from "../../entity/schedule";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarProps {
  baseDate: Date;
  selectedDate: number | null;
  setSelectedDate: (date: number | null) => void;
  setDate: (date: Date) => void;
  data: Expenditure[];
  toggle: () => void;
  children?: React.ReactNode;
}

const Calendar = ({
  baseDate,
  setDate,
  data,
  setSelectedDate,
  selectedDate,
  toggle,
  children
}: CalendarProps) => {
  const onClickPrevMonth = () => {
    const selectedMonth = baseDate.getMonth();
    const newDate = new Date(
      baseDate.getFullYear(),
      selectedMonth - 1,
      1
    );
    setDate(newDate);
  }
  const onClickNextMonth = () => {
    const selectedMonth = baseDate.getMonth();
    const newDate = new Date(
      baseDate.getFullYear(),
      selectedMonth + 1,
      1
    );
    setDate(newDate);
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


  const flatten = data
    .map(d => {
      const dayInterval: Date[] = eachDayOfInterval({
        start: d.dueDateStart,
        end: d.dueDateEnd,
      });

      if (dayInterval.length === 1) {
        return new Schedule({
          key: format(d.dueDateStart, "MM-dd"),
          title: d.name,
          subtitle: d.amount.toString(),
          date: d.dueDateStart,
          color: ""
        });
      }

      return dayInterval.map((dateObj, i, arr) => {
        const isLast = i === arr.length - 1;
        return new Schedule({
          key: format(dateObj, "MM-dd"),
          title: d.name,
          subtitle: isLast ? d.amount.toString() : "",
          date: dateObj,
          color: ""
        });
      });
    })
    .flat();

  const groupedData = groupBy(flatten, item => item.key);
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
          const date = day.getDate();

          return <CalendarCell key={key}
                               isToday={isSameDay(day, today)}
                               isSameMonth={isSameMonth(day, baseDate)}
                               date={day}
                               schedules={groupedData[key]}
                               onClick={() => {
                                 setSelectedDate(date);
                                 toggle();
                               }} />;
        })}      
      </div>
    </div>
  );
}

export default Calendar;