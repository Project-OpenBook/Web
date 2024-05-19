import Modal from "../../../Hooks/Modal";
import BoothInput from "./BoothInput";
import { MdStorefront } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineDescription } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export default function BoothRegistPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-1/2 my-5 h-full justify-center items-center shadow-md border-b-2 border-r-2 p-5">
        <h1 className="font-bold text-3xl mb-5">부스 등록</h1>
        <BoothInput
          placeholder="부스명을 입력해 주세요"
          label="부스명"
          Icon={MdDriveFileRenameOutline}
          setValue={() => {}}
          type="text"
          value=""
        />
        <BoothInput
          placeholder=""
          label="행사명"
          Icon={MdStorefront}
          setValue={() => {}}
          type="text"
          value="한강뚜벅뚜벅걷기축제"
        />
        <BoothInput
          placeholder="부스 운영 일정을 선택해주세요"
          label="부스 운영 일정"
          Icon={FaCalendarCheck}
          setValue={() => {}}
          type="text"
          value=""
          button
        />
        <BoothInput
          placeholder="원하는 부스 신청 위치를 선택해주세요"
          label="부스 위치"
          Icon={SlLocationPin}
          setValue={() => {}}
          type="text"
          value=""
          button
        />
        <BoothInput
          placeholder="부스를 대표할 이미지를 선택해주세요"
          label="부스 대표이미지"
          Icon={FaRegImage}
          setValue={() => {}}
          type="text"
          value=""
          button
        />
        <BoothInput
          placeholder="부스에 대한 간단한 설명을 입력해주세요"
          label="부스 설명"
          Icon={MdOutlineDescription}
          setValue={() => {}}
          type="textarea"
          value=""
        />
        <BoothInput
          placeholder="부스를 나타내는 태그를 설정해주세요"
          label="부스 태그"
          Icon={FaHashtag}
          setValue={() => {}}
          type="text"
          value=""
          button
        />
        <BoothInput
          placeholder="사용하시는 은행 및 계좌번호를 입력해주세요"
          label="계좌번호"
          Icon={FaRegCreditCard}
          setValue={() => {}}
          type="text"
          value=""
          select
        />
        <div className="flex gap-4 w-1/2 justify-center">
          <button className="p-1 w-full font-bold grow-1 h-8 hover:cursor-pointer bg-[#5E1675] rounded-lg text-white mb-4">
            물품 등록 및 관리
          </button>
          <button className="p-1 w-full font-bold grow-1 h-8 hover:cursor-pointer bg-[#401F71] rounded-lg text-white mb-4">
            서비스(예약) 등록 및 관리
          </button>
        </div>
        <button className="py-1 font-bold w-1/2 h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white mb-4">
          부스 신청
        </button>
        <Modal>
          <div>
            <h1 className="font-bold text-2xl">
              부스 등록부스 등록부스 등록부스 등록부스 등록부스 등록부스
              등록부스 등록부스 등록부스 등록부스 등록부스 등록부스 등록부스
              등록부스 등록
            </h1>
            <h1 className="font-bold text-2xl">부스 등록aaa</h1>
            <h1 className="font-bold text-2xl">부스 등록aaa</h1>
            <h1 className="font-bold text-2xl">부스 등록aaa</h1>
            <h1 className="font-bold text-2xl">부스 등록aaa</h1>
            <h1 className="font-bold text-2xl">부스 등록aaa</h1>
            <h1 className="font-bold text-2xl">부스 등록aaa</h1>
            <h1 className="font-bold text-2xl">부스 등록aaa</h1>
          </div>
        </Modal>
      </div>
    </div>
  );
}