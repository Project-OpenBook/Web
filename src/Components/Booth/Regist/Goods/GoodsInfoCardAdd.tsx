import GoodsInfoInput from "./GoodsInfoInput";
import { Modal_State } from "../BoothRegistPage";
interface Props {
  setModalState: (state: string) => void;
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
            setModalState(Modal_State.goodsInput);
          }}
          className="rounded-md w-full h-full mt-10"
        >
          물품 등록
        </button>
      </button>
    </div>
  );
}
