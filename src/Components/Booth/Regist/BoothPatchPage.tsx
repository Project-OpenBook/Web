import Modal from "../../Util/Modal";
import BoothRegistInput from "./BoothRegistInput";
import {
  MdStorefront,
  MdDriveFileRenameOutline,
  MdOutlineDescription,
} from "react-icons/md";
import { FaRegImage, FaCalendarCheck, FaRegCreditCard } from "react-icons/fa";
import { useState } from "react";
import { useRegisteBooth } from "../../../Hooks/Booth/useRegistBooth";
import { useLocation } from "react-router-dom";
import RegistLocationPage from "./Location/RegistLocationPage";
import AccountInput from "./Input/AccountInput";
import ImageInput from "./Input/ImageInput";
import TimeInput from "./Input/TimeInput";
import TextareaInput from "./Input/TextareaInput";
import TagInput from "./Input/TagInput";
import { useGetBoothDetail } from "../../../Hooks/Booth/useGetBoothDetail";
import { useParams } from "react-router-dom";
import { usePatchBooth } from "../../../Hooks/Booth/Detail/usePatchBooth";

export default function BoothPatchPage() {
  const mockBoothData = {
    id: 1,
    name: "Sample Booth",
    openData: "2024-10-01 09:00",
    closeData: "2024-10-01 18:00",
    location: [
      { classification: "A", number: "12" },
      { classification: "B", number: "34" },
    ],
    description: "This is a sample description for the booth.",
    mainImageUrl: "https://example.com/sample-image.jpg",
    tags: ["Technology", "Innovation", "Expo"],
    eventId: 100,
    eventName: "Sample Expo 2024",
    event: {
      id: "100",
      name: "Sample Expo 2024",
      manager: {
        id: "manager123",
        nickname: "ExpoManager",
        role: "Event Manager",
      },
    },
    isUserManager: true,
    manager: {
      id: "manager123",
      nickname: "ExpoManager",
      role: "Event Manager",
    },
  };

  const { state } = useLocation();
  const { boothId } = useParams();
  const { data: boothData } = useGetBoothDetail(boothId ?? "");
  const {
    accountBankName,
    accountNumber,
    closeTime,
    description,
    mainImage,
    mutate,
    name,
    openTime,
    setAccountBankName,
    setAccountNumber,
    setCloseTime,
    setDescription,
    setMainImage,
    setName,
    setOpenTime,
    setTags,
    tags,
    setTagToAdd,
    setTagToDelete,
    tagToAdd,
    tagToDelete,
  } = usePatchBooth(boothData ?? mockBoothData, boothId ?? "");

  const [imageName, setImageName] = useState("X");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setImageName(selectedFile.name);
    } else {
      setImageName("X");
    }
  };

  const handleBoothSubmission = () => {
    mutate();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-full max-w-screen-sm flex-col h-full justify-center shadow-lg items-center mt-20 p-10 border border-slate-200 rounded-md">
        <h1 className="font-bold text-3xl mb-5">부스 수정</h1>
        <p>◎ 이미 등록된 부스의 위치는 수정할 수 없습니다</p>
        <BoothRegistInput
          placeholder="부스명을 입력해 주세요"
          label="부스명"
          Icon={MdDriveFileRenameOutline}
          setValue={setName}
          type="text"
          value={name}
        />
        <TextareaInput
          placeholder="부스에 대한 간단한 설명을 입력해주세요"
          label="부스 설명"
          Icon={MdOutlineDescription}
          setValue={setDescription}
          value={description}
        />
        <TimeInput
          label="부스 운영 시간"
          Icon={FaCalendarCheck}
          setStartTime={setOpenTime}
          setEndTime={setCloseTime}
          startTimeValue={openTime}
          endTimeValue={closeTime}
        />
        <ImageInput
          label="부스 대표이미지"
          Icon={FaRegImage}
          setImage={handleFileChange}
          imageName={imageName}
        />
        <TagInput
          placeholder="부스의 태그를 설정한 뒤 확인 버튼을 눌러주세요"
          tagNames={tags}
          setTagNames={setTags}
          setAddTags={setTagToAdd}
          setDelTags={setTagToDelete}
          addTags={tagToAdd}
          delTags={tagToDelete}
        />
        <AccountInput
          placeholder="사용하시는 은행 및 계좌번호를 입력해주세요"
          label="계좌번호"
          Icon={FaRegCreditCard}
          setAccountNumber={setAccountNumber}
          setAccountBankName={setAccountBankName}
        />
        <button
          onClick={handleBoothSubmission}
          className="py-1 font-bold w-1/3 h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white "
        >
          수정
        </button>
      </div>
    </div>
  );
}
