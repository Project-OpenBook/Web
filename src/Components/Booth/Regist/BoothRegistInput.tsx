import { IconType } from "react-icons";
import { useRef } from "react";

interface Props {
  label: string;
  placeholder?: string;
  setValue: (value: any) => void;
  setValue2?: (value: any) => void;
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
  imageName,
  setValue2,
  value,
}: Props) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const onCickImageUploadHandler = (): void => {
    imageInputRef.current?.click();
  };

  const INPUT_CLASSNAME = `h-10 border-b-2 pl-1 mb-5  ${
    type === "button" || "select" ? "w-3/4" : "w-full"
  }`;

  return (
    <div className="flex flex-col w-1/2">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color="#0064FF" />
        <label htmlFor={label} className="font-bold">
          {label}{" "}
        </label>
      </div>
      <div className="flex gap-2 items-center h-full">
        {type === "textarea" && (
          <textarea
            placeholder={placeholder}
            className={INPUT_CLASSNAME}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        {type === "time" && (
          <div className="flex justify-between items-center w-3/4 gap-3">
            <input
              type="time"
              className={INPUT_CLASSNAME}
              onChange={(e) => setValue(`${e.target.value}:00`)}
            />
            <div className="pb-3 font-bold"> ~ </div>
            {setValue2 && (
              <input
                type="time"
                className={INPUT_CLASSNAME}
                onChange={(e) => setValue2(`${e.target.value}:00`)}
              />
            )}
          </div>
        )}
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
