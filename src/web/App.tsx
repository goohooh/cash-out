import data from "../data/data.json";
import Calendar from "./component/Calendar";
import ExpenditureMockAPI from "../data/expenditureMockAPI";
import Expenditure from "../entity/expenditure";
import { useEffect, useState } from "react";

function App() {
  const expenditureRepo = new ExpenditureMockAPI();
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);

  useEffect(() => {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    expenditureRepo.getExpenditures(year, month)
      .then(expenditures => (setExpenditures(expenditures)))
  }, [date]);

  return (
    <div className="App">
      <ul>
        {data.map((d: any, i: number) => (<li key={i}>{d.name}</li>))}
      </ul>
      <Calendar date={date}
                setDate={setDate}
                data={expenditures} />
    </div>
  );
}

export default App;
