import { IconType } from "react-icons";
import { useRef } from "react";

interface Props {
  label: string;
  placeholder?: string;
  setValue: (value: any) => void;
  Icon: IconType;
  type: "button" | "select" | "text" | "textarea" | "image" | "time";
  imageName?: string;
  value?: string;
}

export default function BoothRegistInput({
  label,
  placeholder,
  type,
  setValue,
  Icon,
  value,
}: Props) {
  const INPUT_CLASSNAME = `h-10 border-b-2 pl-1 mb-5 w-full`;

  return (
    <div className="flex flex-col w-full max-w-screen-sm">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color="#0064FF" />
        <label htmlFor={label} className="font-bold">
          {label}{" "}
        </label>
      </div>
      <div className="flex gap-2 items-center h-full">
        {type === "text" && (
          <input
            placeholder={placeholder}
            type="text"
            value={value}
            className={INPUT_CLASSNAME}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        {type === "button" && (
          <>
            <input
              placeholder={placeholder}
              type="text"
              className={INPUT_CLASSNAME}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className="h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white  mb-4">
              선택
            </button>
          </>
        )}
      </div>
    </div>
  );
}
