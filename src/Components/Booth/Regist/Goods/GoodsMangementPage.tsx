import GoodsInfoCard from "./GoodsInfoCard";
import GoodsInfoCardAdd from "./GoodsInfoCardAdd";
import { ModalState } from "../BoothRegistPage";
interface Props {
  setModalState: (state: ModalState) => void;
}

export default function GoodsManagementPage({ setModalState }: Props) {
  const handleConfirm = () => {
    setModalState("none");
  };

  const handleCancel = () => {
    setModalState("none");
  };

  return (
    <>
      <div className="font-bold text-3xl mb-5">부스 물품 관리</div>
      <div className="grid place-items-center grid-cols-5 gap-4">
        <GoodsInfoCard />
        <GoodsInfoCard />
        <GoodsInfoCard />
        <GoodsInfoCard />
        <GoodsInfoCard />
        <GoodsInfoCard />
        <GoodsInfoCardAdd />
      </div>
      <div className="flex justify-center gap-4 mt-4 w-full">
        <button
          onClick={handleConfirm}
          className="w-1/4 bg-blue-500 text-white py-2 rounded"
        >
          확인
        </button>
        <button
          onClick={handleCancel}
          className="w-1/4 bg-red-500 text-white py-2 rounded"
        >
          취소
        </button>
      </div>
    </>
  );
}
