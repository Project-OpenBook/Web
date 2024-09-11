import { ChangeEvent, useState, MouseEvent } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWithinInterval,
} from "date-fns";
import { Modal_State } from "../BoothRegistPage";
import { useReserveInput } from "../../../../Hooks/Booth/Detail/useRegistReserve";
interface Props {
  setModalState: (state: string) => void;
  startDate: Date;
  endDate: Date;
  selectedDates?: string[];
  setSelectedDates?: (date: string) => void;
  timeList?: string[];
  setTimeList?: (time: string) => void;
}

export default function ServiceTimeAdd({
  startDate,
  endDate,
  setModalState,
}: Props) {
  const [selectedDates, setSelectedDates] = useState<string[]>([]); // 선택된 날짜 배열
  const [timeList, setTimeList] = useState<string[]>([]); // 시간 배열
  const [time, setTime] = useState(""); // 입력된 시간

  const { date } = useReserveInput();

  console.log(selectedDates, timeList);
  const handleConfirm = () => {
    setModalState(Modal_State.serviceManage);
  };

  const handleCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setModalState(Modal_State.serviceManage);
    }
  };

  // 날짜 클릭 또는 드래그하여 다중 선택
  const toggleSelectDate = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    setSelectedDates((prevSelectedDates) => {
      if (prevSelectedDates.includes(formattedDate)) {
        return prevSelectedDates.filter((d) => d !== formattedDate); // 이미 선택된 날짜는 제거
      } else {
        return [...prevSelectedDates, formattedDate].sort(); // 새로운 날짜 추가 후 정렬
      }
    });
  };

  // 시간 추가
  const addTime = () => {
    if (time) {
      // 중복 시간 체크
      if (timeList.includes(time)) {
        alert("이미 등록된 시간입니다.");
        return;
      }

      setTimeList((prevTimeList) => [...prevTimeList, time].sort()); // 시간 추가 후 정렬
      setTime(""); // 시간 추가 후 초기화
    }
  };

  // 날짜 삭제
  const removeDate = (date: string) => {
    setSelectedDates((prevSelectedDates) =>
      prevSelectedDates.filter((d) => d !== date)
    );
  };

  // 시간 삭제
  const removeTime = (time: string) => {
    setTimeList((prevTimeList) => prevTimeList.filter((t) => t !== time));
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

  // 시간 변경
  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  // 드래그 시작 및 끝 핸들러 설정
  const handleMouseDown = (event: MouseEvent, date: Date) => {
    event.preventDefault();
    const isActive = isWithinInterval(date, {
      start: adjustedStartDate,
      end: adjustedEndDate,
    });

    // 비활성화된 날짜는 선택되지 않도록 처리
    if (isActive) {
      toggleSelectDate(date);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full max-w-screen-xl">
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center w-full max-w-screen-xl">
        {/* 달력 */}
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between items-center w-full mb-4">
            <button
              onClick={handlePreviousMonth}
              className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
            >
              Prev
            </button>
            <div className="text-lg font-bold">
              {format(currentMonth, "yyyy MMMM")}
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
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
              const isSelected = selectedDates.includes(
                format(day, "yyyy-MM-dd")
              );
              return (
                <div
                  key={format(day, "yyyy-MM-dd")}
                  className={`flex items-center justify-center p-2 text-center border rounded ${
                    isSelected
                      ? "bg-blue-400 text-white"
                      : isActive
                      ? "bg-white text-black hover:bg-blue-100 cursor-pointer"
                      : "bg-gray-300 text-gray-400 cursor-not-allowed"
                  } border-gray-200 transition-all`}
                  onMouseDown={(event) => handleMouseDown(event, day)}
                >
                  {format(day, "d")}
                </div>
              );
            })}
          </div>
        </div>

        {/* 시간 추가 및 선택된 날짜 */}
        <div className="flex flex-col gap-4 items-center w-full p-6 rounded-lg shadow-lg">
          <h1 className="font-bold text-xl">선택된 날짜들</h1>
          <div className="grid grid-cols-3 gap-2 w-full justify-center">
            {selectedDates.length > 0 ? (
              selectedDates.map((date) => (
                <div
                  key={date}
                  className="flex whitespace-nowrap items-center justify-between pl-4 py-2 font-bold bg-blue-500 text-white rounded shadow-md"
                >
                  {date}
                  <button
                    onClick={() => removeDate(date)}
                    className="w-full text-white"
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p className="font-bold text-lg text-gray-600">
                날짜를 선택해 주세요
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="font-bold text-xl">시간 추가</h1>
            <input
              type="time"
              className="font-bold border-2 border-gray-400 rounded-md px-2 py-1 w-full"
              value={time}
              onChange={handleTimeChange}
            />
            <button
              onClick={addTime}
              className="bg-blue-500 font-bold px-6 py-2 rounded-md text-white w-full hover:bg-blue-600 transition-colors"
            >
              추가
            </button>
          </div>

          {/* 선택된 시간들 */}
          <div className="grid grid-cols-3 gap-2 w-full">
            {timeList.map((time, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2 font-bold bg-blue-500 text-white rounded text-center shadow-sm"
              >
                {time}
                <button
                  onClick={() => removeTime(time)}
                  className="ml-2 text-white"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 확인 및 취소 버튼 */}
      <div className="flex gap-4 w-1/2 justify-center">
        <button
          onClick={handleConfirm}
          className="py-2 w-full font-bold text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          확인
        </button>
        <button
          onClick={handleCancel}
          className="py-2 w-full font-bold text-lg bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          취소
        </button>
      </div>
    </div>
  );
}
