import { useEffect, useState, useMemo } from "react";

import Expenditure from "../entity/expenditure";
import ExpenditureMockAPI from "../data/expenditureMockAPI";
import ExpenditureRepo from "../repo/ExpenditureRepo";

import TotalReport from "./component/ToTalReport";
import Calendar from "./component/Calendar";
import Modal from "./component/Modal";

import useModal from "./hook/useModal";

function App() {
  const [expenditureRepo] = useState<ExpenditureRepo>(() => new ExpenditureMockAPI());
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const selectedExpenditures = useMemo(() => {
    return selectedDate
      ? expenditures.filter(exp => exp.dueDateStart.getDate() <= selectedDate)
      : [];
  }, [selectedDate]);
  console.log(selectedExpenditures)

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    expenditureRepo
      .getExpenditures(
        date.getFullYear(),
        date.getMonth()
      )
      .then(expenditures => {
        setExpenditures(expenditures)
      });
  }, [date]);

  return (
    <div className="App">
      <h1 className="header">장부</h1>
      <TotalReport data={expenditures} />
      <Calendar date={date}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setDate={setDate}
                data={expenditures}
                toggle={toggle} />
      <Modal isShowing={isShowing}
             hide={toggle}
             data={selectedExpenditures} />
    </div>
  );
}

export default App;
