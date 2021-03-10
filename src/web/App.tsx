import { useEffect, useState, useMemo, useCallback } from "react";
import useModal from "./hook/useModal";
import { startOfMonth } from "date-fns";

import "./App.css";
import "./Fontawesome";

import Expenditure from "../entity/model/expenditure";
import Schedule from "../entity/model/schedule";
import { expenditureToSchedule } from "../entity/transfer";
import ExpenditureMockAPI from "../data/expenditureMockAPI";
import ExpenditureRepo from "../repo/ExpenditureRepo";

import TotalReport from "./component/TotalReport";
import Calendar from "./component/Calendar";
import Modal from "./component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const expenditureRepo: ExpenditureRepo = new ExpenditureMockAPI();

function App() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [baseDate, setDate] = useState<Date>(() => startOfMonth(new Date()));
  const [filters, setFilters] = useState<string[]>([]);

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

  const schedules: Schedule[] = useMemo(() => {
    return expenditureToSchedule(expenditures);
  }, [expenditures]);

  const onClickCell = useCallback((date: Date) => {
    setSelectedDate(date);
    toggleModal();
  }, [toggleModal]);

  return (
    <div className="app">
      <h1 className="header txt-big">장부</h1>
      <Calendar baseDate={baseDate}
                setBaseDate={setDate}
                data={schedules}
                onClickCell={onClickCell}
                filters={filters}>
        <TotalReport data={expenditures}
                     filters={filters}
                     setFilters={setFilters} />
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
