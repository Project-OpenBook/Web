import { Modal_State } from "./BoothRegistPage";
import CompCarousel from "../../Util/CompCarousel";
import InfoStep from "./Info/InfoStep";
interface Props {
  setModalState: (state: string) => void;
}

export default function InfoBoothRegist({ setModalState }: Props) {
  const handleConfirm = () => {
    setModalState(Modal_State.none);
  };

  return (
    <div className="flex flex-col max-w-80 items-center gap-4">
      <div className="text-2xl font-bold">부스 등록 방법</div>
      <CompCarousel
        comps={[
          <InfoStep
            classname="h-96 border-blue-300 border-2 rounded-md"
            step="1"
            description="설명입니다."
            warn="하면 안됩니다."
          />,
          <InfoStep
            classname=" h-96 border-blue-300 border-2 rounded-md"
            step="2"
            description="설명입니다."
          />,
          <InfoStep
            classname=" h-96 border-blue-300 border-2 rounded-md"
            step="3"
            description="설명입니다."
          />,
        ]}
      />
      <button
        onClick={handleConfirm}
        className="py-1 font-bold w-2/4 h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white mb-4"
      >
        확인
      </button>
    </div>
  );
}
