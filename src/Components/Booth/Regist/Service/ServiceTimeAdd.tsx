import { ChangeEvent, useState } from "react";
import { Modal_State } from "../BoothRegistPage";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWithinInterval,
  isToday,
} from "date-fns";

// Props 타입 정의
interface Props {
  setModalState: (state: string) => void;
  startDate: Date;
  endDate: Date;
}

interface ServiceDateAndTime {
  date: Date;
  timeList: string[];
}

export default function ServiceTimeAdd({
  startDate,
  endDate,
  setModalState,
}: Props) {
  const [serviceDateAndTimeList, setServiceDateAndTimeList] = useState<
    ServiceDateAndTime[]
  >([]);
  const [time, setTime] = useState("");

  const handleConfirm = () => {
    setModalState(Modal_State.serviceManage);
  };

  const handleCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setModalState(Modal_State.serviceManage);
    }
  };

  const addServiceTime = (selectDate: Date, time: string) => {
    setServiceDateAndTimeList((prevServiceDateAndTimeList) => {
      const existingService = prevServiceDateAndTimeList.find(
        (element) => element.date.getTime() === selectDate.getTime()
      );

      if (existingService) {
        // 같은 시간이 있는지 확인
        if (existingService.timeList.includes(time)) {
          alert("해당 시간은 이미 등록되어 있습니다.");
          return prevServiceDateAndTimeList; // 상태 변경 없이 기존 상태 반환
        }
        // 같은 시간이 없으면 추가
        return prevServiceDateAndTimeList.map((element) =>
          element.date.getTime() === selectDate.getTime()
            ? { ...element, timeList: [...element.timeList, time].sort() }
            : element
        );
      } else {
        // 날짜가 존재하지 않는 경우 새로운 날짜와 시간 추가
        return [
          ...prevServiceDateAndTimeList,
          { date: selectDate, timeList: [time] },
        ];
      }
    });
  };

  const getServiceTimeList = (selectedDate: Date | null) => {
    if (!selectedDate) return [];
    const serviceTimeList = serviceDateAndTimeList.find(
      (serviceTime) => serviceTime.date.getTime() === selectedDate.getTime()
    );
    return serviceTimeList ? serviceTimeList.timeList.slice().sort() : [];
  };

  // Month index is adjusted by subtracting 1
  const adjustedStartDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() - 1,
    startDate.getDate()
  );
  const adjustedEndDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth() - 1,
    endDate.getDate()
  );

  const [currentMonth, setCurrentMonth] = useState(
    startOfMonth(adjustedStartDate)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 현재 월의 모든 날짜 가져오기
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // 이전 달로 이동
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date: Date) => {
    if (
      isWithinInterval(date, { start: adjustedStartDate, end: adjustedEndDate })
    ) {
      setSelectedDate(date);
    }
  };

  // 시간 변경
  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-1/3">
          <div className="flex justify-between items-center w-full mb-2">
            <button
              onClick={handlePreviousMonth}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>
            <div className="text-lg font-bold">
              {format(currentMonth, "yyyy MMMM")}
            </div>
            <button
              onClick={handleNextMonth}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 w-full">
            {daysInMonth.map((day) => {
              const isActive = isWithinInterval(day, {
                start: adjustedStartDate,
                end: adjustedEndDate,
              });
              const isTodayDate = isToday(day);
              return (
                <div
                  key={format(day, "yyyy-MM-dd")}
                  className={`p-2 text-center border ${
                    isActive
                      ? "bg-white cursor-pointer"
                      : "bg-gray-300 cursor-not-allowed"
                  } border-gray-200`}
                  onClick={() => handleDateClick(day)}
                >
                  {format(day, "d")}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center bg-white w-1/3 p-4 mt-4">
          {selectedDate ? (
            <p className="font-bold text-xl">
              선택된 날짜: {format(selectedDate, "yyyy-MM-dd")}
            </p>
          ) : (
            <p className="font-bold text-xl">날짜를 선택해 주세요</p>
          )}
          <div className="flex gap-5">
            <h1 className="font-bold text-xl">시간 추가</h1>
            <input
              type="time"
              className="font-bold border-2 border-black rounded-md px-1"
              value={time}
              onChange={handleTimeChange}
            />
            <button
              onClick={() => {
                if (selectedDate) {
                  addServiceTime(selectedDate, time);
                }
              }}
              className="bg-blue-500 font-bold px-4 rounded-md text-white"
            >
              추가
            </button>
          </div>

          {selectedDate && (
            <div className="w-full flex flex-col items-center gap-1 text-center">
              {getServiceTimeList(selectedDate).map((time, i) => (
                <div
                  key={i}
                  className="px-4 py-2 font-bold w-1/3 bg-blue-500 text-white rounded"
                >
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-1/2 gap-4">
        <button
          onClick={handleConfirm}
          className="py-1 font-bold w-full h-10 hover:cursor-pointer bg-[#0064FF] rounded-md text-white mb-4"
        >
          확인
        </button>
        <button
          onClick={handleCancel}
          className="py-1 font-bold w-full h-10 hover:cursor-pointer bg-red-700 rounded-md text-white mb-4"
        >
          취소
        </button>
      </div>
    </div>
  );
}
