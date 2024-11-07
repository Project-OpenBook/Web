import { useState, useEffect } from "react";
import { useApplyReserve } from "../../../../Hooks/Booth/Detail/useApplyReserve";
import { useManageApply } from "../../../../Hooks/Booth/Detail/useManageApply";

interface CategoryModalProps {
  reserveInfo: { date: string; times: ReservationTime[] }[];
  isManager: boolean;
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
  status: "EMPTY" | "RESERVED" | "WAITING" | "COMPLETE" | string;
  applyUser?: ApplyUser;
}

export default function ReserveTable({
  onClose,
  reserveInfo: initialReserveInfo,
  isManager,
}: CategoryModalProps) {
  const [reserveInfo, setReserveInfo] = useState(initialReserveInfo);
  const { mutate } = useApplyReserve();
  const { mutate: changeApply, setApprove } = useManageApply();

  useEffect(() => {
    setReserveInfo(initialReserveInfo);
  }, [initialReserveInfo]);

  const handleReserve = (id: string) => {
    mutate(id, {
      onSuccess: (updatedInfo) => {
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

  const handleApprovalChange = (id: string, status: "COMPLETE" | "EMPTY") => {
    setApprove(status);
    changeApply(id, {
      onSuccess: () => {
        setReserveInfo((prev) =>
          prev.map((info) => ({
            ...info,
            times: info.times.map((timeSlot) =>
              timeSlot.id.toString() === id ? { ...timeSlot, status } : timeSlot
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
            <div key={index} className="flex gap-4 mb-4 border-b pb-2">
              <div className={`${isManager ? "w-1/4" : "w-1/2"} flex flex-col`}>
                <h3 className="font-semibold">날짜</h3>
                <div>{info.date}</div>
              </div>
              <div className={`${isManager ? "w-1/2" : "w-1/2"} flex flex-col`}>
                <h3 className="font-semibold">시간대</h3>
                {info.times.map((timeSlot) => (
                  <div
                    key={timeSlot.id}
                    className="flex items-center gap-2 my-1"
                  >
                    <span>{timeSlot.times}</span>
                    {timeSlot.status === "EMPTY" && (
                      <button
                        onClick={() => handleReserve(timeSlot.id.toString())}
                        className="px-2 py-1 rounded text-white bg-green-400"
                        disabled={isManager}
                      >
                        {isManager ? "신청 대기" : "예약 신청"}
                      </button>
                    )}
                    {timeSlot.status === "WAITING" && (
                      <>
                        <button
                          disabled
                          className={`px-2 py-1 rounded text-white ${
                            isManager ? "bg-orange-500" : "bg-red-500"
                          }`}
                        >
                          {isManager ? "승인 대기" : "예약 불가"}
                        </button>
                        {isManager && (
                          <>
                            <span>-</span>
                            <button
                              onClick={() =>
                                handleApprovalChange(
                                  timeSlot.id.toString(),
                                  "COMPLETE"
                                )
                              }
                              className="px-2 py-1 rounded text-white bg-blue-400"
                            >
                              승인
                            </button>
                            <button
                              onClick={() =>
                                handleApprovalChange(
                                  timeSlot.id.toString(),
                                  "EMPTY"
                                )
                              }
                              className="px-2 py-1 rounded text-white bg-red-500"
                            >
                              거절
                            </button>
                          </>
                        )}
                      </>
                    )}
                    {timeSlot.status === "COMPLETE" && (
                      <button
                        disabled
                        className={`px-2 py-1 rounded text-white ${
                          isManager ? "bg-blue-500" : "bg-red-500"
                        }`}
                      >
                        {isManager ? "승인됨" : "예약 불가"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isManager && (
                <div className="w-1/4 flex flex-col">
                  <h3 className="font-semibold">신청자</h3>
                  {info.times.map((timeSlot) => (
                    <div key={timeSlot.id} className="my-1 py-1">
                      <span>
                        {timeSlot.applyUser
                          ? timeSlot.applyUser.nickname
                          : "신청자 없음"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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
