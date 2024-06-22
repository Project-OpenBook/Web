import { IconType } from "react-icons";
import { SlLocationPin } from "react-icons/sl";

interface Props {
  label: string;
  placeholder: string;
  selectedSeatNumbers: string[];
  setModalState: (modalState: any) => void;
  Icon: IconType;
}

export default function LocationInput({
  Icon,
  label,
  placeholder,
  setModalState,
  selectedSeatNumbers,
}: Props) {
  return (
    <div className="flex flex-col w-1/2 mb-5">
      <div className="flex gap-2 items-center h-full mb-2">
        <SlLocationPin size={25} color="#0064FF" />
        <label className="font-bold">부스 위치</label>
      </div>
      <div className="flex items-center w-full gap-2">
        <input
          placeholder="원하는 부스 신청 위치를 선택해주세요"
          type="text"
          className="h-10 border-b-2 pl-1 w-3/4"
          onChange={(e) => {}}
          value={selectedSeatNumbers.join(", ")}
        />
        <button
          className="h-8 w-1/4 hover:cursor-pointer bg-[#0064FF] rounded-md text-white"
          onClick={() => {
            setModalState({ state: "locationSelect" });
          }}
        >
          선택
        </button>
      </div>
    </div>
  );
}
