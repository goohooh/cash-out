import Expenditure from "../../entity/expenditure";
import Schedule from "./Schedule";

interface Props {
    isToday: boolean;
    month: number;
    date: number;
    data?: Expenditure[];
}

const CalendarCell = ({
    isToday,
    month,
    date,
    data,
}: Props) => {
    return (
        <div>
            <p className={isToday ? "today" : ""}>{date}</p>
            {data?.map(d => {
                const subtitle = `${d.amount}원`
                return (<Schedule title={d.name} subtitle={subtitle} />)
            })}
        </div>
    );

}

export default CalendarCell;