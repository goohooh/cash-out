import Schedule from "../../entity/schedule";
import ScheduleChip from "./ScheduleChip";

interface Props {
    isToday: boolean;
    date: Date;
    data?: Schedule[];
    onClick?: () => void;
}

const CalendarCell = ({
    isToday,
    date,
    data,
    onClick,
}: Props) => {
    return (
        <div onClick={onClick}>
            {/* <p className={isToday ? "today" : ""}>{date.getDate()}</p> */}
            <p className={isToday ? "today" : ""}>{date.getDate()}</p>
            {data?.map(d => {
                return (<ScheduleChip title={d.title} subtitle={d.subtitle} />)
            })}
        </div>
    );

}

export default CalendarCell;