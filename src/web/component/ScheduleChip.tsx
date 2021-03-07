import styles from "./ScheduleChip.module.css";

interface Props {
  title: string;
  subtitle?: string;
  color: string;
  background: string;
}

const Schedule = ({
  title,
  subtitle,
  color,
  background
}: Props) => {
  return (
    <div className={styles.chip}
         style={{ color, background }}>
        <p>{title}</p>
        <p>{subtitle}</p>
    </div>
  );
}

export default Schedule;