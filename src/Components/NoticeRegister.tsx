import { MdStorefront } from "react-icons/md";
import EventFormInput from "./Event/EventFormInput";
import { useState } from "react";
import RadioButtons from "./Event/List/RadioButtons";
import { getAccessToken } from "../Api/Util/token";

interface Props {
  eventId: number;
}

export default function NoticeRegister({ eventId }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState<"BASIC" | "EVENT">("BASIC");
  const [mainImage, setMainImage] = useState<File | null>(null);

  const handleImageChange = (e: any) => {
    setMainImage(e.target.files[0]);
  };

  const onSubmit = () => {
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("noticeType", type);
    mainImage && form.append("image", mainImage);

    fetch(`http://52.79.91.214:8080/events/${eventId}/notices`, {
      method: "post",
      body: form,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-2 border-b-4 pb-4">
      <EventFormInput
        placeholder="제목을 입력해주세요"
        onChange={(e) => setTitle(e.target.value)}
        name="name"
        label="제목"
        Icon={MdStorefront}
      />
      <EventFormInput
        placeholder="내용을 입력해주세요"
        onChange={(e) => setContent(e.target.value)}
        name="name"
        label="내용"
        Icon={MdStorefront}
      />
      <div className="flex space-x-4">
        <label>
          <input
            type="radio"
            value="최신순"
            checked={type === "BASIC"}
            onChange={() => setType("BASIC")}
            className="mr-2"
          />
          기본
        </label>
        <label>
          <input
            type="radio"
            value="오래된순"
            checked={type === "EVENT"}
            onChange={() => setType("EVENT")}
            className="mr-2"
          />
          이벤트
        </label>
      </div>
      <label>
        <input
          type="file"
          name="mainImage"
          onChange={handleImageChange}
          hidden
        />
        {mainImage ? (
          <img
            src={URL.createObjectURL(mainImage)}
            alt="메인이미지"
            className="w-full h-80 object-contain"
          />
        ) : (
          <div className="w-full h-8 p-10 border-2 border-dashed flex justify-center items-center whitespace-nowrap">
            메인이미지 업로드
          </div>
        )}
      </label>
      <button
        onClick={onSubmit}
        className="w-fit ml-auto bg-green-500 text-white font-nanumB font-xl px-2 py-1 rounded-md"
      >
        등록
      </button>
    </div>
  );
}
