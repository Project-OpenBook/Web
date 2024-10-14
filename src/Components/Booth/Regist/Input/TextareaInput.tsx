import { IconType } from "react-icons";

interface Props {
  label: string;
  placeholder?: string;
  setValue: (value: string) => void;
  Icon: IconType;
  value?: string;
}

export default function TextareaInput({
  label,
  setValue,
  Icon,
  placeholder,
  value,
}: Props) {
  const INPUT_CLASSNAME = "h-10 border-b-2 pl-1 mb-5";
  return (
    <div className="flex flex-col w-full max-w-screen-sm gap-2">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color="#0064FF" />
        <label htmlFor={label} className="font-bold">
          {label}{" "}
        </label>
      </div>
      <textarea
        placeholder={placeholder}
        className={INPUT_CLASSNAME}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}
