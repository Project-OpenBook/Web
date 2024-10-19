import { IconType } from "react-icons";

interface Props {
  label: string;
  placeholder?: string;
  setStartTime: (value: string) => void;
  setEndTime: (value: any) => void;
  Icon: IconType;
  imageName?: string;
  startTimeValue?: string;
  endTimeValue?: string;
}

export default function TimeInput({
  label,
  setStartTime,
  Icon,
  setEndTime,
  startTimeValue,
  endTimeValue,
}: Props) {
  const INPUT_CLASSNAME = "h-10 border-b-2 pl-1 mb-5 w-full";

  function formatToHHMM(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  if (!startTimeValue || !endTimeValue) return <div>잘못된 경로입니다.</div>;

  return (
    <div className="flex flex-col w-full max-w-screen-sm">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color="#0064FF" />
        <label htmlFor={label} className="font-bold">
          {label}{" "}
        </label>
      </div>
      <div className="flex justify-between items-center gap-3">
        <input
          type="time"
          className={INPUT_CLASSNAME}
          onChange={(e) => setStartTime(`2024-10-31T${e.target.value}:00`)}
          value={formatToHHMM(startTimeValue)}
        />

        <div className="pb-3 font-bold"> ~ </div>
        <input
          type="time"
          className={INPUT_CLASSNAME}
          onChange={(e) => setEndTime(`2024-10-31T${e.target.value}:00`)}
          value={formatToHHMM(endTimeValue)}
        />
      </div>
    </div>
  );
}
