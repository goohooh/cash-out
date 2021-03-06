import React from "react";
import { eachDayOfInterval } from "date-fns";

import Expenditure from "../../entity/expenditure";

// import Schedule from "./Schedule";
import CalendarNavigator from "./CalendarNavigator";
import CalendarCell from "./CalendarCell";
import styles from "./_calendar.module.css";
import Schedule from "../../entity/schedule";


interface CalendarProps {
  date: Date;
  selectedDate: number | null;
  setSelectedDate: (date: number | null) => void;
  setDate: (date: Date) => void;
  data: Expenditure[];
  toggle: () => void;
  children?: React.ReactNode;
}


const Calendar = ({ date, setDate, data, setSelectedDate, selectedDate, toggle, children }: CalendarProps) => {
  // const : CalendarProps = props;

  const onClickPrevMonth = () => {
    const selectedMonth = date.getMonth();
    const newDate = new Date(
      date.getFullYear(),
      selectedMonth - 1,
      1
    );
    setDate(newDate);
  }
  const onClickNextMonth = () => {
    const selectedMonth = date.getMonth();
    const newDate = new Date(
      date.getFullYear(),
      selectedMonth + 1,
      1
    );
    setDate(newDate);
  }

  const today: Date = new Date();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const prevDays: number[] = Array(firstDayIndex).fill(prevLastDay).map((prevDay, i, arr) => prevDay - (arr.length - i - 1))
  const days: Date[] = Array(lastDay).fill(0).map((_, i) => {
    const d = new Date(date);
    d.setDate(d.getDate() + i);
    return d;
  });
  const nextDays: number[] = Array(7 - lastDayIndex - 1).fill(0).map((_, i) => i + 1);

  const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);

  const generateKeyByMonthDate = (date: Date): string => {
    return `${date.getMonth()}-${date.getDate()}`;
  }


  const flatten = data
    .map(d => {
      const dayInterval: Date[] = eachDayOfInterval({
        start: d.dueDateStart,
        end: d.dueDateEnd,
      });

      if (dayInterval.length === 1) {
        return new Schedule({
          key: generateKeyByMonthDate(d.dueDateStart),
          title: d.name,
          subtitle: d.amount.toString(),
          date: d.dueDateStart,
          color: ""
        });
      }

      return dayInterval.map((dateObj, i, arr) => {
        const isLast = i === arr.length - 1;
        return new Schedule({
          key: generateKeyByMonthDate(dateObj),
          title: d.name,
          subtitle: isLast ? d.amount.toString() : "",
          date: dateObj,
          color: ""
        });
      });
    })
    .flat();
  const groupedData = groupBy(flatten, item => item.key);
  return (
    <div className="container">
      {/* date(getMonth(), getFullYear), onClickPrevMonth, onClickNextMonth */}
      <CalendarNavigator date={date}
                         onClickPrevMonth={onClickPrevMonth}
                         onClickNextMonth={onClickNextMonth} />
      {children}
      <div className="weekdays">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>
      <div className={styles.days}>
        {prevDays.map(day => {
          return <div key={`prev-${day}`} className={styles.prevDate}>{day}</div>;
        })}      
        {days.map(day => {
          const date = day.getDate();
          const isToday = (
            day.getFullYear() === today.getFullYear() &&
            day.getMonth() === today.getMonth() &&
            day.getDate() === today.getDate()
          );
          const key = generateKeyByMonthDate(day);

          return <CalendarCell key={key}
                               isToday={isToday}
                               date={day}
                               data={groupedData[key]}
                               onClick={() => {
                                 setSelectedDate(date);toggle();
                               }} />;
        })}      
        {nextDays.map(day => {
          return <div key={`next-${day}`} className={styles.nextDate}>{day}</div>;
        })}      
      </div>
    </div>
  );
}

export default Calendar;