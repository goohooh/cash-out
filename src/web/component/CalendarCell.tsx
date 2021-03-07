import Schedule from "../../entity/schedule";
import ScheduleChip from "./ScheduleChip";
import styles from "./CalendarCell.module.css";

interface Props {
  isToday: boolean;
  isSameMonth: boolean,
  date: Date;
  schedules?: Schedule[];
  onClick?: () => void;
}

const CalendarCell = ({
  isToday,
  isSameMonth,
  date,
  schedules,
  onClick,
}: Props) => {
  return (
    <div className={styles.cell} onClick={onClick}>
      {isSameMonth
        ? (
          <p className={styles.dayNum}>
            <span className={`${isToday ? styles.today : ""}`}>{date.getDate()}</span>
          </p>
        )
        : null
      }

      {schedules?.map((d, i) => {
        return (
          <ScheduleChip key={`${d.key}-${i}`}
                        title={d.title}
                        subtitle={d.subtitle} />)
      })}
    </div>
  );

}

export default CalendarCell;