import { useEffect, useState, useMemo, useCallback, useReducer } from "react";
import useModal from "./hook/useModal";
import { startOfMonth } from "date-fns";

import "./App.css";
import "./Fontawesome";

import Expenditure from "../entity/model/expenditure";
import Schedule from "../entity/model/schedule";
import { expenditureToSchedule } from "./common/transfer";
import ExpenditureMockAPI from "../data/expenditureMockAPI";
import ExpenditureRepo from "../repo/ExpenditureRepo";

import TotalReport from "./component/report/TotalReport";
import Calendar from "./component/calendar/Calendar";
import Modal from "./component/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const expenditureRepo: ExpenditureRepo = new ExpenditureMockAPI();

const urlParams = new URLSearchParams(window.location.search);
const year = parseInt(urlParams.get("year") || "");
const month = parseInt(urlParams.get("month") || "");

const _baseDate = year && month
  ? new Date(year, month - 1, 1)
  : startOfMonth(new Date());

interface AppReducer {
  (state: any, action: any): any;
}

const reducer: AppReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FILTER":
      const filter = action.payload;
      const { filters } = state;
      const index = filters.indexOf(filter);

      let newFilters = [];
      if (index === -1) {
        newFilters = [...filters, filter];
      } else {
        newFilters = [...filters];
        newFilters.splice(index, 1);
      }
      return {
        ...state,
        filters: newFilters,
      };
    default:
      return state;
  }
}

const initialState = {
  expenditures: [],
  filters: [],
  baseDate: _baseDate,
  selectedDate: null,
}

function App() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [baseDate, setDate] = useState<Date>(_baseDate);
  const [filters, setFilters] = useState<string[]>([]);

  const { isShowing, toggleModal } = useModal();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    expenditureRepo
      .getExpenditures(
        baseDate.getFullYear(),
        baseDate.getMonth()
      )
      .then(expenditures => {
        setExpenditures(
          expenditures.filter(expenditure =>
            !filters.some(filter => filter === expenditure.type)
          )
        );
      });
  }, [baseDate, filters]);

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
                onClickCell={onClickCell}>
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
