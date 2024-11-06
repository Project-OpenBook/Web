import { useState, useEffect } from "react";
import { info } from "console";
import { useApplyReserve } from "../../../../Hooks/Booth/Detail/useApplyReserve";

interface CategoryModalProps {
  reserveInfo: { date: string; times: ReservationTime[] }[];

  onClose: () => void;
}

interface ApplyUser {
  id: string;
  name: string;
  nickname: string;
  role: string;
}

interface ReservationTime {
  id: number;
  times: string;
  status: "EMPTY" | "RESERVED" | string;
  applyUser?: ApplyUser;
}

export default function ReserveTable({
  onClose,
  reserveInfo: initialReserveInfo,
}: CategoryModalProps) {
  const [reserveInfo, setReserveInfo] = useState(initialReserveInfo);
  const { mutate } = useApplyReserve();

  useEffect(() => {
    setReserveInfo(initialReserveInfo);
  }, [initialReserveInfo]);

  const handleReserve = (id: string) => {
    mutate(id, {
      onSuccess: (updatedInfo) => {
        // 성공 후 reserveInfo 업데이트
        setReserveInfo((prev) =>
          prev.map((info) => ({
            ...info,
            times: info.times.map((timeSlot) =>
              timeSlot.id.toString() === id
                ? { ...timeSlot, status: "COMPLETE" }
                : timeSlot
            ),
          }))
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center bg-white w-1/2 p-6 rounded-lg shadow-lg relative gap-2">
        <div className="font-bold text-xl mb-4">예약 현황</div>
        <div className="w-full max-h-96 overflow-y-scroll">
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
                    {timeSlot.status === "EMPTY" && (
                      <>
                        <button
                          onClick={() => handleReserve(timeSlot.id.toString())}
                          className="px-2 py-1 rounded text-white bg-green-400"
                        >
                          예약 신청
                        </button>
                      </>
                    )}
                    {(timeSlot.status === "COMPLETE" ||
                      timeSlot.status === "WAITING") && (
                      <button
                        disabled
                        className="px-2 py-1 rounded text-white bg-red-500"
                      >
                        예약 불가
                      </button>
                    )}
                    {timeSlot.applyUser && (
                      <>
                        <button> 승인 </button>
                        <button> 거절 </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-blue-400 text-white px-10 py-2 rounded-md"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
