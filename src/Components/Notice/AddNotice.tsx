import { useState } from "react";
import { getAccessToken } from "../../Api/Util/token";
import EventFormInput from "../Event/EventFormInput";
import { MdStorefront } from "react-icons/md";

interface Props {
  type: "events" | "booths";
  id: string | number;
  refetch: () => void;
}
export default function AddNotice({ type, id, refetch }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [noticeType, setNoticeType] = useState<"BASIC" | "EVENT">("BASIC");
  const [mainImage, setMainImage] = useState<File | null>(null);

  const handleImageChange = (e: any) => {
    setMainImage(e.target.files[0]);
  };

  const onSubmit = () => {
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("noticeType", noticeType);
    mainImage && form.append("image", mainImage);

    fetch(`http://52.79.91.214:8080/${type}/${id}/notices`, {
      method: "post",
      body: form,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("등록되었습니다");
          setMainImage(null);
          setIsModalOpen(false);
          refetch();
        } else {
          throw new Error("등록 실패");
        }
      })
      .catch((err) => {
        alert("등록에 실패했습니다");
      });
  };

  return (
    <div className="flex">
      <button
        className="bg-green-400 px-2 py-1 rounded-md text-white font-bold ml-auto mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        공지 및 이벤트 등록하기
      </button>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/10"
          onMouseDown={() => setIsModalOpen(false)}
        >
          <div
            className="w-full p-2 max-w-md bg-white"
            onMouseDown={(e) => e.stopPropagation()}
          >
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
                    checked={noticeType === "BASIC"}
                    onChange={() => setNoticeType("BASIC")}
                    className="mr-2"
                  />
                  기본
                </label>
                <label>
                  <input
                    type="radio"
                    value="오래된순"
                    checked={noticeType === "EVENT"}
                    onChange={() => setNoticeType("EVENT")}
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
          </div>
        </div>
      )}
    </div>
  );
}
