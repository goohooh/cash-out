import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CalendarNavigator.module.css";

interface Props {
  baseDate: Date;
  onClickPrevMonth: () => void;
  onClickNextMonth: () => void;
}

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

const CalendarNavigator = ({
  baseDate,
  onClickPrevMonth,
  onClickNextMonth,
}: Props) => {
  const currentMonth = baseDate.getMonth();

  const prevMonthStr = months[(currentMonth === 0 ? months.length : currentMonth) - 1];
  const prevYearStr =  prevMonthStr === months[months.length - 1] ? (baseDate.getFullYear() - 1) : "";
  const currentMonthStr = months[currentMonth];
  const nextMonthStr = months[currentMonth % 11 + (currentMonth === 11 ? 0 : 1)];
  const nextYearStr =  nextMonthStr === months[0] ? (baseDate.getFullYear() + 1) : "";

  return (
    <div className={`flex justify-between align-center ${styles.bdrTopBottom}`}>
      <button className={`${styles.btn} btn`} onClick={onClickPrevMonth}>
        <FontAwesomeIcon icon="chevron-left" className="m-right-smallest" />
        {prevYearStr} {prevMonthStr}
      </button>
      <h2 className="txt-big flex align-center">{currentMonthStr}</h2>
      <button className={`${styles.btn} btn`} onClick={onClickNextMonth}>
        {nextYearStr} {nextMonthStr}
        <FontAwesomeIcon icon="chevron-right" className="m-left-smallest" />
      </button>
    </div>
  );
}

export default CalendarNavigator;