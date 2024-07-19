import { IconType } from "react-icons";
import { useRef } from "react";

interface Props {
  label: string;
  setImage: (value: any) => void;
  Icon: IconType;
  imageName: string;
}

export default function ImageInput({
  Icon,
  label,
  setImage,
  imageName,
}: Props) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const onCickImageUploadHandler = (): void => {
    imageInputRef.current?.click();
  };

  return (
    <div className="flex flex-col w-1/2">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color="#0064FF" />
        <label htmlFor={label} className="font-bold">
          {label}{" "}
        </label>
      </div>
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex w-3/4 border-b-2 py-2 pl-1">
          선택된 이미지 :
          {imageName && <div className="font-bold ml-2">{imageName}</div>}
        </div>
        <button
          onClick={onCickImageUploadHandler}
          className="border-none h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white"
        >
          이미지 등록
        </button>
        <input
          type="file"
          className="hidden"
          onChange={setImage}
          ref={imageInputRef}
          accept="image/*"
        />
      </div>
    </div>
  );
}
