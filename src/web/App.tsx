import { useEffect, useState, useMemo } from "react";
import useModal from "./hook/useModal";
import { startOfMonth } from "date-fns";

import Expenditure from "../entity/expenditure";
import ExpenditureMockAPI from "../data/expenditureMockAPI";
import ExpenditureRepo from "../repo/ExpenditureRepo";

import TotalReport from "./component/TotalReport";
import Calendar from "./component/Calendar";
import Modal from "./component/Modal";

import "./App.css";
import "./Fontawesome";

const expenditureRepo: ExpenditureRepo = new ExpenditureMockAPI();

function App() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [baseDate, setDate] = useState<Date>(() => startOfMonth(new Date()));
  const selectedExpenditures = useMemo<Expenditure[]>(() => {
    return selectedDate
      ? expenditures.filter(exp => exp.dueDateStart.getDate() <= selectedDate)
      : [];
  }, [selectedDate, expenditures]);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    expenditureRepo
      .getExpenditures(
        baseDate.getFullYear(),
        baseDate.getMonth()
      )
      .then(expenditures => {
        setExpenditures(expenditures)
      });
  }, [baseDate]);

  return (
    <div className="app">
      <h1 className="header txt-big">장부</h1>
      <Calendar baseDate={baseDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setDate={setDate}
                data={expenditures}
                toggle={toggle}>
        <TotalReport data={expenditures} />
      </Calendar>
      <Modal isShowing={isShowing}
             hide={toggle}
             data={selectedExpenditures} />
    </div>
  );
}

export default App;
