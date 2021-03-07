
interface Params {
  key: string;
  title: string;
  subtitle?: string;
  date: Date;
  color: string;
  background: string;
}

class Schedule {
  key: string;
  title: string;
  subtitle?: string;
  date: Date;
  color: string;
  background: string;

  constructor(params: Params) {
    this.key = params.key;
    this.title = params.title;
    this.subtitle = params.subtitle;
    this.date = params.date;
    this.color = params.color;
    this.background = params.background;
  }
}

export default Schedule;