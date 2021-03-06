interface Props {
  date: Date;
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
  date,
  onClickPrevMonth,
  onClickNextMonth,
}: Props) => {
  const currentMonth = date.getMonth();
  const prevMonthStr = months[currentMonth - 1];
  const currentMonthStr = months[currentMonth];
  const nextMonthStr = months[currentMonth + 1];

  return (
    <div>
      <button onClick={onClickPrevMonth}>{prevMonthStr}</button>
      <h2>{currentMonthStr}</h2>
      <button onClick={onClickNextMonth}>{nextMonthStr}</button>
    </div>
  );
}

export default CalendarNavigator;