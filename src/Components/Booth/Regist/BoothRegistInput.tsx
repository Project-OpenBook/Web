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
  const banks = [
    "국민은행",
    "신한은행",
    "하나은행",
    "우리은행",
    "기업은행",
    "농협은행",
    "산업은행",
    "수출입은행",
    "부산은행",
    "대구은행",
    "광주은행",
    "전북은행",
    "제주은행",
    "SC제일은행",
    "씨티은행",
    "카카오뱅크",
  ];

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

        {type === "image" && (
          <div className="flex w-full justify-between items-center mb-4">
            <div className="flex w-3/4 border-b-2 py-2 pl-1">
              선택된 이미지 :
              {imageName && <div className="font-bold ml-2">{imageName}</div>}
            </div>
            <button
              onClick={() => {
                onCickImageUploadHandler();
              }}
              className="border-none h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white"
            >
              이미지 등록
            </button>
            <input
              type="file"
              className="hidden"
              onChange={setValue}
              ref={imageInputRef}
              accept="image/*"
            />
          </div>
        )}
        {type === "select" && (
          <>
            <input
              placeholder={placeholder}
              type="text"
              className={INPUT_CLASSNAME}
              onChange={(e) => setValue(e.target.value)}
            />
            <select
              className="h-10 w-1/4 mb-4"
              onChange={(e) => {
                if (setValue2) {
                  setValue2(e.target.value);
                }
              }}
            >
              {banks.map((bank) => {
                return <option value={bank}>{bank}</option>;
              })}
            </select>
          </>
        )}
      </div>
    </div>
  );
}
