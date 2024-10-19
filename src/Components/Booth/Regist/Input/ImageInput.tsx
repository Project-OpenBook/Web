import { IconType } from "react-icons";
import { useRef, ChangeEvent, useState, useEffect } from "react";

interface Props {
  label: string;
  setImage: (file: any) => void; // File 객체 전달
  Icon: IconType;
  value?: File | string | null; // File 객체 또는 URL 또는 null
}

export default function ImageInput({ Icon, label, setImage, value }: Props) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null); // 미리보기 URL 관리

  // File 또는 URL을 미리보기 URL로 설정
  useEffect(() => {
    if (value instanceof File) {
      const objectURL = URL.createObjectURL(value); // File을 URL로 변환
      setPreviewURL(objectURL);

      // 메모리 누수 방지: 컴포넌트 언마운트 시 URL 해제
      return () => {
        URL.revokeObjectURL(objectURL);
      };
    } else if (typeof value === "string") {
      setPreviewURL(value); // URL일 경우 그대로 설정
    }
  }, [value]);

  const onClickImageUploadHandler = (): void => {
    imageInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 파일 가져오기
    if (file) {
      setImage(file); // 부모 컴포넌트로 파일 전달
    }
  };

  return (
    <div className="flex flex-col w-full max-w-screen-sm">
      <div className="flex gap-2 items-center h-full">
        <Icon size={25} color="#0064FF" />
        <label htmlFor={label} className="font-bold">
          {label}
        </label>
      </div>
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex justify-center w-3/4 bg-slate-100">
          {previewURL ? (
            <img src={previewURL} alt="미리보기" className="w-1/2" />
          ) : (
            <p>이미지를 선택해주세요</p>
          )}
        </div>
        <button
          onClick={onClickImageUploadHandler}
          className="border-none h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white"
        >
          이미지 등록
        </button>
        <input
          type="file"
          className="hidden"
          onChange={handleImageChange} // 파일 선택 핸들러 설정
          ref={imageInputRef}
          accept="image/*"
        />
      </div>
    </div>
  );
}
