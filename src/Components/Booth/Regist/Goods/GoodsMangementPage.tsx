import GoodsInfoCard from "./GoodsInfoCard";
import GoodsInfoCardAdd from "./GoodsInfoCardAdd";
import ModalButton from "../Location/ModalButton";

export default function GoodsManagementPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <div className="flex flex-col w-4/5 shadow-lg justify-center items-center m-5 p-3">
        <div className="font-bold text-3xl mb-5">부스 물품 관리</div>
        <div className="grid place-items-center grid-cols-5 gap-4">
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCard />
          <GoodsInfoCardAdd />
        </div>
        <button className="mt-5 font-bold w-1/3 h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white">
          확인
        </button>
        <ModalButton
          action={() => {
            switchModal();
            setModalState("none");
          }}
          color="blue-500"
          text="확인"
        />
        <ModalButton
          action={() => {
            switchModal();
            setModalState("none");
          }}
          color="red-500"
          text="취소"
        />
      </div>
    </div>
  );
}
