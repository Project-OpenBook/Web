import GoodsInfoInput from "./GoodsInfoInput";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { boothImageState } from "../../../../../Recoil/Booth/boothRegistAtom";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineDescription } from "react-icons/md";
import { TbNumber123 } from "react-icons/tb";
import { FaRegImage } from "react-icons/fa6";
import { Modal_State } from "../../../Regist/BoothRegistPage";
import { BiSolidCategory } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useCategoryList } from "../../../../../Hooks/Booth/Detail/useGetCategory";
import { usePatchProduct } from "../../../../../Hooks/Booth/Detail/usePatchProduct";

interface Props {
  setModalState: (state: string) => void;
  setPatchModal: (state: boolean) => void;
  product: {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    images: Image[];
  };
  category?: string;
}

interface Image {
  id: string;
  url: string;
}

export default function ProductPatchInputPage({
  setModalState,
  product,
  setPatchModal,
  category,
}: Props) {
  const {
    mutate,
    setCategoryId2,
    setDescription,
    setImages,
    setName,
    setPrice,
    setStock,
    name,
    categoryId2,
    description,
    images,
    price,
    stock,
  } = usePatchProduct(product, category || "");

  let { boothId } = useParams();
  const setBoothImage = useSetRecoilState(boothImageState);
  const [imageName, setImageName] = useState("X");
  const { data: categoryList } = useCategoryList(boothId ?? "");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setImages([selectedFile]);
      setImageName(selectedFile.name);
    } else {
      setBoothImage(null);
      setImageName("X");
    }
  };

  const handleConfirm = () => {
    mutate();
  };

  const handleCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setPatchModal(false);
      setModalState(Modal_State.goodsManage);
    }
  };

  return (
    <>
      <div className="flex flex-col w-1/2 p-3 justify-center items-center">
        <h1 className="font-bold text-3xl mb-5">물품 수정</h1>
        <GoodsInfoInput
          Icon={MdDriveFileRenameOutline}
          label="물품명"
          placeholder="물품의 이름을 입력해주세요"
          setValue={setName}
          value={name}
          type="text"
        />
        <GoodsInfoInput
          Icon={BiSolidCategory}
          label="카테고리"
          placeholder="우측에서 물품의 카테고리를 선택해주세요"
          setValue={setCategoryId2}
          type="select"
          categoryData={categoryList}
          value={categoryId2}
        />
        <GoodsInfoInput
          Icon={MdOutlineDescription}
          label="물품 설명"
          placeholder="물품에 대한 간략한 설명을 입력해주세요"
          setValue={setDescription}
          type="text"
          value={description}
        />
        <GoodsInfoInput
          Icon={IoIosPricetags}
          label="개당 가격(원)"
          placeholder="물품의 개당 가격(원)을 숫자로 입력해주세요"
          setValue={setPrice}
          type="text"
          value={price.toString()}
        />
        <GoodsInfoInput
          Icon={TbNumber123}
          label="재고 수"
          placeholder="물품의 재고 수를 입력해주세요"
          setValue={setStock}
          type="text"
          value={stock.toString()}
        />
        <GoodsInfoInput
          Icon={FaRegImage}
          label="물품 이미지"
          setValue={handleFileChange}
          type="image"
          imageName={imageName}
        />
        <div className="flex w-full gap-4 mt-4">
          <button
            onClick={handleConfirm}
            className="py-1 font-bold w-full h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white mb-4"
          >
            수정
          </button>
          <button
            onClick={handleCancel}
            className="py-1 font-bold w-full h-10 hover:cursor-pointer bg-red-700 rounded-md text-white mb-4"
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
