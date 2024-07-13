import GoodsInfoInput from "./GoodsInfoInput";
import { ModalState } from "../BoothRegistPage";
interface Props {
  setModalState: (state: ModalState) => void;
}

export default function GoodsInfoCardNone({ setModalState }: Props) {
  return (
    <div className="flex h-80 flex-col p-3 pb-5 w-full gap-6 items-center rounded-md font-bold shadow-lg">
      <button className="flex flex-col ">
        <div className="flex p-8 bg-slate-100 rounded-lg justify-center">
          <img
            alt="제품 이미지"
            className="flex w-1/2"
            src="images/boothRegist/plus_symbol.png"
          />
        </div>
        <button
          onClick={() => {
            setModalState("goodsInput");
          }}
          className="rounded-md w-full h-full mt-10"
        >
          물품 등록
        </button>
      </button>
    </div>
  );
}
