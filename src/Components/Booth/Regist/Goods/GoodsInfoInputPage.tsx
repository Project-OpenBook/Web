import GoodsInfoInput from "./GoodsInfoInput";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { boothImageState } from "../../../../Recoil/Booth/boothRegistAtom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";
import { FaRegImage } from "react-icons/fa6";
import { Modal_State } from "../BoothRegistPage";
interface Props {
  setModalState: (state: string) => void;
}

export default function GoodsInfoInputPage({ setModalState }: Props) {
  const setBoothImage = useSetRecoilState(boothImageState);
  const [imageName, setImageName] = useState("X");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setBoothImage(selectedFile);
      setImageName(selectedFile.name);
    } else {
      setBoothImage(null);
      setImageName("X");
    }
  };

  const handleConfirm = () => {
    setModalState(Modal_State.goodsManage);
  };

  const handleCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setModalState(Modal_State.goodsManage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col w-1/2 h-full justify-center items-center shadow-md border-b-2">
        <h1 className="font-bold text-3xl mb-5">물품 등록</h1>
        <GoodsInfoInput
          Icon={MdDriveFileRenameOutline}
          label="물품명"
          placeholder="물품의 이름을 입력해주세요"
          setValue={() => {}}
          type="text"
        />
        <GoodsInfoInput
          Icon={MdOutlineDescription}
          label="물품 설명"
          placeholder="물품에 대한 간략한 설명을 입력해주세요"
          setValue={() => {}}
          type="text"
        />
        <GoodsInfoInput
          Icon={IoIosPricetags}
          label="개당 가격(원)"
          placeholder="물품의 개당 가격(원)을 숫자로 입력해주세요"
          setValue={() => {}}
          type="text"
        />
        <GoodsInfoInput
          Icon={TbNumber123}
          label="재고 수"
          placeholder="물품의 재고 수를 입력해주세요"
          setValue={() => {}}
          type="text"
        />
        <GoodsInfoInput
          Icon={FaRegImage}
          label="물품 이미지"
          setValue={handleFileChange}
          type="image"
          imageName={imageName}
        />
        <div className="flex w-1/2 gap-4">
          <button className="py-1 font-bold w-full h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white mb-4">
            물품 등록
          </button>
          <button
            onClick={handleCancel}
            className="py-1 font-bold w-full h-10 hover:cursor-pointer bg-red-700 rounded-md text-white mb-4"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
