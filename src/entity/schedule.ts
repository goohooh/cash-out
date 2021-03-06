
interface Params {
  key: string;
  title: string;
  subtitle?: string;
  color: string;
  date: Date;
}

class Schedule {
  key: string;
  title: string;
  subtitle?: string;
  color: string;
  date: Date;

  constructor(params: Params) {
    this.key = params.key;
    this.title = params.title;
    this.subtitle = params.subtitle;
    this.color = params.color;
    this.date = params.date;
  }
}

export default Schedule;