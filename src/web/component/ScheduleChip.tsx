interface Props {
  title: string;
  subtitle?: string;
}

const Schedule = ({ title, subtitle }: Props) => {
  return (
    <div className="w-100">
        <p>{title}</p>
        <p>{subtitle}</p>
    </div>
  );
}

export default Schedule;