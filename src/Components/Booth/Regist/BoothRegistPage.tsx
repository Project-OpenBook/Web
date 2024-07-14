import Modal from "../../Util/Modal";
import BoothRegistInput from "./BoothRegistInput";
import {
  MdStorefront,
  MdDriveFileRenameOutline,
  MdOutlineDescription,
} from "react-icons/md";
import {
  FaHashtag,
  FaRegImage,
  FaCalendarCheck,
  FaRegCreditCard,
} from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { useState } from "react";
import { useRegisteBooth } from "../../../Hooks/Booth/useRegistBooth";
import { useLocation } from "react-router-dom";
import RegistLocationPage from "./Location/RegistLocationPage";
import GoodsInfoInputPage from "./Goods/GoodsInfoInputPage";
import GoodsManagementPage from "./Goods/GoodsMangementPage";
import ServiceManagementPage from "./Service/ServiceManagementPage";
import ServiceTimeAdd from "./Service/ServiceTimeAdd";
import ServiceInfoInputPage from "./Service/ServiceInfoInputPage";
import AccountInput from "./Input/AccountInput";
import ImageInput from "./Input/ImageInput";
import TimeInput from "./Input/TimeInput";
import TextareaInput from "./Input/TextareaInput";

export type ModalState =
  | "none"
  | "goodsManage"
  | "serviceManage"
  | "goodsInput"
  | "serviceInput"
  | "serviceTime"
  | "locationSelect";

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
  } = useRegisteBooth(state?.name);
  const [isOpen, setIsOpen] = useState(true);
  const [modalState, setModalState] = useState<ModalState>("none");
  const [imageName, setImageName] = useState("X");
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<string[]>([]);

  if (!eventId) return <>잘못된 접근입니다.</>;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setMainImage(selectedFile);
      setImageName(selectedFile.name);
    } else {
      setMainImage(null);
      setImageName("X");
    }
  };

  const handleBoothSubmission = () => {
    setLinkedEvent(eventId);
    mutate();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-1/2 my-5 h-full justify-center items-center shadow-md border-b-2 border-r-2 p-5">
        <h1 className="font-bold text-3xl mb-5">부스 등록</h1>
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
          setEndTime={setEndTime}
        />
        <div className="flex flex-col w-1/2 mb-5">
          <div className="flex gap-2 items-center h-full mb-2">
            <SlLocationPin size={25} color="#0064FF" />
            <label className="font-bold">부스 위치</label>
          </div>
          <div className="flex items-center w-full gap-2">
            <input
              placeholder="부스 신청 위치를 선택해주세요"
              type="text"
              className="h-10 border-b-2 pl-1 w-3/4"
              onChange={(e) => {}}
              value={selectedSeatNumbers.join(", ")}
            />
            <button
              className="h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white"
              onClick={() => {
                setModalState("locationSelect");
              }}
            >
              선택
            </button>
          </div>
        </div>
        <ImageInput
          label="부스 대표이미지"
          Icon={FaRegImage}
          setImage={handleFileChange}
          imageName={imageName}
        />
        <TextareaInput
          placeholder="부스에 대한 간단한 설명을 입력해주세요"
          label="부스 설명"
          Icon={MdOutlineDescription}
          setValue={setDescription}
        />
        <BoothRegistInput
          placeholder="부스를 나타낼 수 있는 태그들을 설정해주세요"
          label="부스 태그"
          Icon={FaHashtag}
          setValue={() => {}}
          type="button"
        />
        <AccountInput
          placeholder="사용하시는 은행 및 계좌번호를 입력해주세요"
          label="계좌번호"
          Icon={FaRegCreditCard}
          setAccountNumber={setAccountNumber}
          setAccountBankName={setAccountBankName}
        />
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={() => setModalState("goodsManage")}
            className="p-1 w-1/4 font-bold h-8 hover:cursor-pointer bg-[#5E1675] rounded-lg text-white mb-4"
          >
            물품 등록 및 관리
          </button>
          <button
            onClick={() => setModalState("serviceManage")}
            className="p-1 w-1/4 font-bold h-8 hover:cursor-pointer bg-[#401F71] rounded-lg text-white mb-4"
          >
            서비스(예약) 등록 및 관리
          </button>
        </div>
        <button
          onClick={handleBoothSubmission}
          className="py-1 font-bold w-1/3 h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white mb-4"
        >
          부스 신청
        </button>
        {modalState !== "none" && (
          <Modal isOpen={isOpen}>
            {modalState === "locationSelect" && (
              <RegistLocationPage
                selectedSeatIds={selectedSeatIds}
                selectedSeatNumbers={selectedSeatNumbers}
                eventId={eventId}
                setSelectedSeatIds={setSelectedSeatIds}
                setSelectedSeatNumbers={setSelectedSeatNumbers}
                setModalState={setModalState}
              />
            )}
            {modalState === "goodsManage" && (
              <GoodsManagementPage setModalState={setModalState} />
            )}
            {modalState === "serviceManage" && (
              <ServiceManagementPage setModalState={setModalState} />
            )}
            {modalState === "goodsInput" && (
              <GoodsInfoInputPage setModalState={setModalState} />
            )}
            {modalState === "serviceInput" && <ServiceInfoInputPage />}
            {modalState === "serviceTime" && (
              <ServiceTimeAdd
                startDate={new Date(2024, 5, 23)}
                endDate={new Date(2024, 5, 30)}
              />
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}
