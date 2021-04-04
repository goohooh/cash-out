import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import useModal from "./hook/useModal";
import { storeContext } from "./store";
import { startOfMonth } from "date-fns";

import "./App.css";
import "./Fontawesome";

import Schedule from "../domain/entity/schedule";
import { expenditureToSchedule } from "./common/transfer";
import ExpenditureMockAPI from "../adapter/expenditureMockAPI";
import ExpenditureRepo from "../domain/repo/ExpenditureRepo";

import TotalReport from "./component/report/TotalReport";
import Calendar from "./component/calendar/Calendar";
import Modal from "./component/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionTypes } from "./store";

const expenditureRepo: ExpenditureRepo = new ExpenditureMockAPI();

const urlParams = new URLSearchParams(window.location.search);
const year = parseInt(urlParams.get("year") || "");
const month = parseInt(urlParams.get("month") || "");

const _baseDate = year && month
  ? new Date(year, month - 1, 1)
  : startOfMonth(new Date());

function App() {
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [baseDate, setDate] = useState<Date>(_baseDate);
  const { isShowing, toggleModal } = useModal();

  const { state, dispatch } = useContext(storeContext);
  const { filteredExpenditures } = state;

  useEffect(() => {
    expenditureRepo
      .getExpenditures(
        baseDate.getFullYear(),
        baseDate.getMonth()
      )
      .then(expenditures => {
        dispatch({ type: ActionTypes.SetExpenditures, payload: expenditures });
        dispatch({ type: ActionTypes.SetFilteredExpenditures });
      });
  }, [baseDate, dispatch]);

  
  const schedules: Schedule[] = useMemo(() => {
    return expenditureToSchedule(filteredExpenditures);
  }, [filteredExpenditures]);

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
                onClickCell={onClickCell}>
        <TotalReport />
      </Calendar>
      <Modal isShowing={isShowing}
             hide={toggleModal}
             selectedDate={selectedDate}
             data={filteredExpenditures} />
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
