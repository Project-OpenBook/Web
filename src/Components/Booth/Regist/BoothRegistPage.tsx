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
import LocationInput from "./Input/LocationInput";
import { CiCircleInfo } from "react-icons/ci";
import InfoBoothRegist from "./InfoBoothRegist";

export const Modal_State = {
  none: "none",
  goodsManage: "GM",
  serviceManage: "SM",
  goodsInput: "GI",
  serviceInput: "SI",
  serviceTime: "ST",
  locationSelect: "LS",
  inforMation: "INFO",
};

export default function BoothRegistPage() {
  const { state } = useLocation();
  const eventId = state?.eventId;
  const {
    mutate,
    setName,
    setMainImage,
    setAccountNumber,
    setOpenTime,
    setEndTime,
    setDescription,
    boothName,
    setAccountBankName,
    setLinkedEvent,
    selectedSeatIds,
    setSelectedSeatIds,
    setTagNames,
    tagNames,
    accountBankName,
    openTime,
    endTime,
    mainImage,
  } = useRegisteBooth(state?.name);
  const [modalState, setModalState] = useState(Modal_State.none);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<string[]>([]);

  if (!eventId) return <>잘못된 접근입니다.</>;

  const handleBoothSubmission = () => {
    setLinkedEvent(eventId);
    mutate();
  };

  console.log(openTime);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex w-full max-w-screen-sm flex-col my-5 h-full justify-center items-center p-5">
        <h1 className="font-bold text-3xl mb-5">부스 등록</h1>
        <button
          onClick={() => {
            setModalState(Modal_State.inforMation);
          }}
          className="flex gap-2 ml-auto border-blue-300 border-2 rounded-md p-1 text-blue-400"
        >
          <CiCircleInfo size={25} />
          부스 등록 방법
        </button>
        <BoothRegistInput
          placeholder="부스명을 입력해 주세요"
          label="부스명"
          Icon={MdDriveFileRenameOutline}
          setValue={setName}
          type="text"
        />
        <BoothRegistInput
          label="행사명"
          Icon={MdStorefront}
          setValue={() => {}}
          value={boothName}
          type="text"
        />
        <TimeInput
          label="부스 운영 시간"
          Icon={FaCalendarCheck}
          setStartTime={setOpenTime}
          endTimeValue={endTime}
          startTimeValue={openTime}
          setEndTime={setEndTime}
        />
        <LocationInput
          placeholder="부스 신청 위치를 선택해주세요"
          selectedSeatNumbers={selectedSeatNumbers}
          setModalState={setModalState}
        />
        <ImageInput
          label="부스 대표이미지"
          Icon={FaRegImage}
          setImage={setMainImage}
          value={mainImage}
        />
        <TextareaInput
          placeholder="부스에 대한 간단한 설명을 입력해주세요"
          label="부스 설명"
          Icon={MdOutlineDescription}
          setValue={setDescription}
        />
        <TagInput
          placeholder="부스의 태그를 설정한 뒤 확인 버튼을 눌러주세요"
          tagNames={tagNames}
          setTagNames={setTagNames}
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
          className="py-1 font-bold w-1/3 h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white mb-4"
        >
          부스 신청
        </button>
        {modalState !== "none" && (
          <>
            <Modal width="w-3/4" isOpen={true}>
              {modalState === Modal_State.locationSelect && (
                <RegistLocationPage
                  selectedSeatIds={selectedSeatIds}
                  selectedSeatNumbers={selectedSeatNumbers}
                  eventId={eventId}
                  setSelectedSeatIds={setSelectedSeatIds}
                  setSelectedSeatNumbers={setSelectedSeatNumbers}
                  setModalState={setModalState}
                />
              )}
              {modalState === Modal_State.inforMation && (
                <InfoBoothRegist setModalState={setModalState} />
              )}
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}
