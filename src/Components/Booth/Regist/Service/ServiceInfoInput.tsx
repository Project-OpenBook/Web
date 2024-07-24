import { useRef } from "react";
import { IconType } from "react-icons";
import { MAIN_BLUE } from "../../../../Constants/Color";

interface Props {
  label: string;
  placeholder?: string;
  setValue: (value: any) => void;
  Icon: IconType;
  type: "text" | "image" | "button";
  imageName?: string;
}

export default function ServiceInfoInput({
  label,
  placeholder,
  type,
  setValue,
  Icon,
  imageName,
}: Props) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const onCickImageUploadHandler = (): void => {
    imageInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-1/2">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color={MAIN_BLUE} />
        <label htmlFor={label} className="font-bold">
          {label}
        </label>
      </div>
      {type === "text" && (
        <input
          placeholder={placeholder}
          type={type}
          className="h-10 border-b-2 pl-1 mb-5 w-full"
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      {type === "button" && (
        <div className="flex w-full">
          <input
            placeholder={placeholder}
            type="text"
            className="h-10 border-b-2 pl-1 mb-5 w-3/4"
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white  mb-4">
            선택
          </button>
        </div>
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
    </div>
  );
}
