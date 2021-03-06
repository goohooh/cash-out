import Expenditure from "../../entity/expenditure";
import styles from "./_calendar.module.css";

const months: string[] = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

interface CalendarProps {
  date: Date;
  setDate: Function;
  data: Expenditure[];
}


const Calendar = (props: CalendarProps) => {
  const { date, setDate, data }: CalendarProps = props;
  console.log(data);

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

  const month = months[date.getMonth()];
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
  const days: number[] = Array(lastDay).fill(0).map((_, i) => i + 1);
  const nextDays: number[] = Array(7 - lastDayIndex - 1).fill(0).map((_, i) => i + 1);
  return (
    <div className="container">
      <div>
        <button onClick={onClickPrevMonth}>지난달</button>
        <h2>{month}</h2>
        <button onClick={onClickNextMonth}>다음달</button>
      </div>
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
          if (day === today.getDate()) {
            return <div key={`current-${day}`} className={styles.today}>{day}</div>;
          }
          return <div key={day}>{day}</div>;
        })}      
        {nextDays.map(day => {
          return <div key={`next-${day}`} className={styles.nextDate}>{day}</div>;
        })}      
      </div>
    </div>
  );
}

export default Calendar;