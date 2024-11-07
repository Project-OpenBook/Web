import { info } from "console";
import { useApplyReserve } from "../../../../Hooks/Booth/Detail/useApplyReserve";

interface ReserveInfo {
  date: string;
  times: Timeslot[];
}

interface Timeslot {
  id: number;
  times: string;
  status: "COMPLETE" | "EMPTY" | string;
}

interface CategoryModalProps {
  onClose: () => void;
  reserveInfo: ReserveInfo[];
}

export default function ReserveTableAdmin({
  onClose,
  reserveInfo,
}: CategoryModalProps) {
  const { mutate } = useApplyReserve();
  console.log(reserveInfo);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white w-1/2 p-6 rounded-lg shadow-lg relative gap-2">
        <div className="font-bold text-xl mb-4">예약 현황</div>
        {/* 예약 정보 리스트 */}
        <div className="w-full">
          {reserveInfo.map((info, index) => (
            <div
              key={index}
              className="flex justify-between gap-2 mb-4 border-b pb-2"
            >
              <div className="w-1/2">
                <h3 className="font-semibold">날짜</h3>
                <div>{info.date}</div>
              </div>
              <div className="w-1/2">
                <h3 className="font-semibold">시간대</h3>
                {info.times.map((timeSlot) => (
                  <div
                    key={timeSlot.id}
                    className="flex items-center gap-2 my-1"
                  >
                    <span>{timeSlot.times}</span>
                    <span
                      onClick={() => {
                        mutate(timeSlot.id.toString());
                      }}
                      className={`px-2 py-1 rounded text-white ${
                        timeSlot.status === "COMPLETE"
                          ? "bg-red-500"
                          : "bg-green-400"
                      }`}
                    >
                      {timeSlot.status === "EMPTY" ? "예약 신청" : "예약 불가"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-10 py-2 rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
