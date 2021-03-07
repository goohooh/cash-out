import { useEffect, useState } from "react";
import useModal from "./hook/useModal";
import {
  startOfMonth,
  format,
  eachDayOfInterval,
} from "date-fns";
import { numFormat } from "../common/util";

import "./App.css";
import "./Fontawesome";

import Expenditure from "../entity/model/expenditure";
import Schedule from "../entity/model/schedule";
import { ExpenseTypeColorMap } from "../entity/structure/expenseTypeColorMap";
import ExpenditureMockAPI from "../data/expenditureMockAPI";
import ExpenditureRepo from "../repo/ExpenditureRepo";

import TotalReport from "./component/TotalReport";
import Calendar from "./component/Calendar";
import Modal from "./component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const expenditureRepo: ExpenditureRepo = new ExpenditureMockAPI();

function App() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [baseDate, setDate] = useState<Date>(() => startOfMonth(new Date()));

  const { isShowing, toggleModal } = useModal();

  useEffect(() => {
    expenditureRepo
      .getExpenditures(
        baseDate.getFullYear(),
        baseDate.getMonth()
      )
      .then(expenditures => {
        setExpenditures(expenditures);
      });
  }, [baseDate]);

  const schedules: Schedule[] = expenditures
    .map(d => {
      const dayInterval: Date[] = eachDayOfInterval({
        start: d.dueDateStart,
        end: d.dueDateEnd,
      });

      if (dayInterval.length === 1) {
        return new Schedule({
          key: format(d.dueDateStart, "MM-dd"),
          title: d.name,
          subtitle: numFormat(d.amount),
          date: d.dueDateStart,
          color: ExpenseTypeColorMap[d.type].color,
          background: ExpenseTypeColorMap[d.type].background,
        });
      }

      // 납부 기한이 하루 이상인 경우
      return dayInterval.map((dateObj, i, arr) => {
        const isLast = i === arr.length - 1;
        return new Schedule({
          key: format(dateObj, "MM-dd"),
          title: d.name,
          subtitle: isLast ? numFormat(d.amount) : "",
          date: dateObj,
          color: ExpenseTypeColorMap[d.type].color,
          background: ExpenseTypeColorMap[d.type].background,
        });
      });
    })
    .flat();

  return (
    <div className="app">
      <h1 className="header txt-big">장부</h1>
      <Calendar baseDate={baseDate}
                setBaseDate={setDate}
                data={schedules}
                onClickCell={(date: Date) => {
                  setSelectedDate(date);
                  toggleModal();
                }}>
        <TotalReport data={expenditures} />
      </Calendar>
      <Modal isShowing={isShowing}
             hide={toggleModal}
             selectedDate={selectedDate}
             data={expenditures} />
      <div className="notice">
        <p>
          <FontAwesomeIcon icon="info-circle" className="m-right-smallest" />
          캘린더에서 각 일자를 누르면 자세한 정보를 제공합니다.
        </p>
      </div>
    </div>
  );
}

export default App;
