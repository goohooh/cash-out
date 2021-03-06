interface Props {
  title: string;
  subtitle?: string;
}

const Schedule = ({ title, subtitle }: Props) => {
  return (
    <div>
        <h4>{title}</h4>
        <p>{subtitle}</p>
    </div>
  );
}

export default Schedule;