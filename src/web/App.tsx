import { useEffect, useState } from "react";

import Expenditure from "../entity/expenditure";
import ExpenditureMockAPI from "../data/expenditureMockAPI";

import TotalReport from "./component/ToTalReport";
import Calendar from "./component/Calendar";
import Modal from "./component/Modal";

import useModal from "./hook/useModal";

function App() {
  const expenditureRepo = new ExpenditureMockAPI();
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    expenditureRepo.getExpenditures(year, month)
      .then(expenditures => (setExpenditures(expenditures)))
  }, [date]);

  return (
    <div className="App">
      <h1 className="header">장부</h1>
      <TotalReport data={expenditures} />
      <Calendar date={date}
                setDate={setDate}
                data={expenditures} />
      <Modal isShowing={isShowing}
             hide={toggle} />
    </div>
  );
}

export default App;
