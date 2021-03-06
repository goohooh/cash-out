import data from "../data/data.json";
import Calendar from "./component/Calendar";

function App() {
  return (
    <div className="App">
      <ul>
        {data.map((d: any, i: number) => (<li key={i}>{d.name}</li>))}
      </ul>
      <Calendar />
    </div>
  );
}

export default App;
