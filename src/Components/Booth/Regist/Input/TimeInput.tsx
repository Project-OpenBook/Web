import { IconType } from "react-icons";

interface Props {
  label: string;
  placeholder?: string;
  setStartTime: (value: any) => void;
  setEndTime: (value: any) => void;
  Icon: IconType;
  imageName?: string;
}

export default function TimeInput({
  label,
  setStartTime,
  Icon,
  setEndTime,
}: Props) {
  const INPUT_CLASSNAME = "h-10 border-b-2 pl-1 mb-5 w-full";

  return (
    <div className="flex flex-col w-1/2">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color="#0064FF" />
        <label htmlFor={label} className="font-bold">
          {label}{" "}
        </label>
      </div>
      <div className="flex justify-between items-center w-3/4 gap-3">
        <input
          type="time"
          className={INPUT_CLASSNAME}
          onChange={(e) => setStartTime(`${e.target.value}:00`)}
        />
        <div className="pb-3 font-bold"> ~ </div>
        <input
          type="time"
          className={INPUT_CLASSNAME}
          onChange={(e) => setEndTime(`${e.target.value}:00`)}
        />
      </div>
    </div>
  );
}
