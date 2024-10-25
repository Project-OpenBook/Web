import { useDeleteProduct } from "../../../../../Hooks/Booth/Detail/useDeleteProduct";
import noImage from "../../../../../images/noimage.png";
import ProductPatchInputPage from "./ProductPatchInputPage";
import Modal from "../../../../Util/Modal";
import { useState } from "react";
interface Props {
  product: {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    images: Image[] | [];
  };
  setModalState: (state: string) => void;
  category?: string;
  totalRefetch?: () => void;
  refetch?: () => void;
}

interface Image {
  id: string;
  url: string;
}

export default function GoodsInfoCard({
  product,
  setModalState,
  category,
  refetch,
  totalRefetch,
}: Props) {
  const { mutate } = useDeleteProduct(product.id);
  const [patchModal, setPatchModal] = useState<boolean>(false);

  return (
    <div className="flex h-96 flex-col p-4 w-64 gap-4 items-start rounded-lg font-medium shadow-md bg-white border border-gray-300">
      <div className="flex h-40 w-full bg-gray-100 rounded-lg justify-center items-center overflow-hidden relative">
        {product.images.length > 0 ? (
          <img
            className="object-contain h-full w-full"
            src={product.images[0].url}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <img
              alt="기본 이미지"
              className="object-contain h-full w-full"
              src={noImage}
            />
          </div>
        )}
      </div>

      <div className="text-base flex flex-col gap-2 w-full">
        <div className="text-gray-700">
          <span className="font-semibold text-gray-800">제품명: </span>
          <span className="text-black">{product.name}</span>
        </div>
        <div className="text-gray-700">
          <span className="font-semibold text-gray-800">설명: </span>
          <span className="text-black">{product.description}</span>
        </div>
        <div className="text-gray-700">
          <span className="font-semibold text-gray-800">가격: </span>
          <span className="text-black">
            {product.price.toLocaleString()} 원
          </span>
        </div>
        <div className="text-gray-700">
          <span className="font-semibold text-gray-800">재고: </span>
          <span className="text-black font-semibold">{product.stock} 개</span>
        </div>
      </div>
      <div className="flex justify-center gap-2 w-full text-white mt-auto">
        <button
          onClick={() => {
            setPatchModal(true);
          }}
          className="bg-blue-400 rounded-md w-full p-1.5 transition-all hover:bg-blue-500 duration-500 shadow-md text-sm"
        >
          수정
        </button>
        <button
          onClick={() => {
            mutate();
          }}
          className="bg-red-400 rounded-md w-full p-1.5 transition-all hover:bg-red-500 duration-500 shadow-md text-sm"
        >
          삭제
        </button>
      </div>
      <Modal width="w-2 /4" isOpen={patchModal}>
        <ProductPatchInputPage
          setModalState={setModalState}
          product={product}
          setPatchModal={setPatchModal}
          category={category}
          totalRefech={totalRefetch}
        />
      </Modal>
    </div>
  );
}
