import "../../../../index.css"; // 사용자 정의 CSS 파일 포함
import { useGetLocation } from "../../../../Hooks/Event/useGetLocation";
import LocationStateInfo from "./LocationStateInfo";
import { useState, useEffect } from "react";
import { ModalState } from "../BoothRegistPage";

interface Props {
  eventId: string;
  selectedSeatIds: number[];
  selectedSeatNumbers: string[];
  setSelectedSeatIds: (ids: number[] | ((prev: number[]) => number[])) => void;
  setSelectedSeatNumbers: (
    numbers: string[] | ((prev: string[]) => string[])
  ) => void;
  setModalState: (state: ModalState) => void;
}

interface Area {
  id: number;
  number: string;
  status: "EMPTY" | "WAITING" | "COMPLETE";
}

interface Data {
  layoutType: "ALPHABET" | "NUMBER";
  layoutImageUrls: string[];
  areas: { [key: string]: Area[] };
}

export default function RegistLocationPage({
  eventId,
  selectedSeatIds,
  selectedSeatNumbers,
  setSelectedSeatIds,
  setSelectedSeatNumbers,
  setModalState,
}: Props) {
  const { isLoading, isError, data } = useGetLocation(eventId);
  const maxSelectableSeats = 3;
  const [tempSeatIds, setTempSeatIds] = useState<number[]>([]);
  const [tempSeatNumbers, setTempSeatNumbers] = useState<string[]>([]);

  useEffect(() => {
    setTempSeatIds(selectedSeatIds);
    setTempSeatNumbers(selectedSeatNumbers);
  }, [selectedSeatIds, selectedSeatNumbers]);

  console.log(
    "선택된 좌석 ID들 :" +
      selectedSeatIds +
      "선택된 좌석 번호들" +
      selectedSeatNumbers
  );
  console.log(
    "임시 좌석 ID들 :" + tempSeatIds + "임시 좌석 번호들 :" + tempSeatNumbers
  );

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const getColorClass = (status: "EMPTY" | "WAITING" | "COMPLETE") => {
    switch (status) {
      case "EMPTY":
        return "bg-yellow-400 hover:bg-yellow-500";
      case "WAITING":
        return "bg-red-400";
      case "COMPLETE":
        return "bg-gray-400";
      default:
        return "";
    }
  };

  const handleSeatClick = (seatId: number, seatNumber: string, row: string) => {
    const uniqueSeatNumber = `${row}-${seatNumber}`;

    setTempSeatIds((prevTempSeatIds: number[]) => {
      if (prevTempSeatIds.includes(seatId)) {
        return prevTempSeatIds.filter((id) => id !== seatId);
      } else if (prevTempSeatIds.length < maxSelectableSeats) {
        return [...prevTempSeatIds, seatId];
      } else {
        alert(`최대 ${maxSelectableSeats}자리까지 선택할 수 있습니다.`);
        return prevTempSeatIds;
      }
    });

    setTempSeatNumbers((prevTempSeatNumbers: string[]) => {
      if (prevTempSeatNumbers.includes(uniqueSeatNumber)) {
        return prevTempSeatNumbers.filter(
          (number) => number !== uniqueSeatNumber
        );
      } else if (prevTempSeatNumbers.length < maxSelectableSeats) {
        return [...prevTempSeatNumbers, uniqueSeatNumber];
      } else {
        return prevTempSeatNumbers;
      }
    });
  };

  const handleConfirm = () => {
    setSelectedSeatIds(tempSeatIds);
    setSelectedSeatNumbers(tempSeatNumbers);
    setModalState("none");
  };

  const handleCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setTempSeatIds(selectedSeatIds);
      setTempSeatNumbers(selectedSeatNumbers);
      setModalState("none");
    }
  };

  const renderSeats = () => {
    if (!data) return null;
    const layoutType = data.layoutType;
    const seatRows: JSX.Element[] = [];

    if (layoutType === "ALPHABET") {
      for (const row in data.areas) {
        const seatElements: JSX.Element[] = data.areas[row].map((area) => {
          const seatNumber = `${row}${area.number}`;
          return (
            <div
              key={area.id}
              className={`w-16 h-16 ${getColorClass(
                area.status
              )} m-1 flex items-center justify-center text-center text-sm font-mono ${
                tempSeatIds.includes(area.id) ? "border-4 border-blue-500" : ""
              } ${area.status === "EMPTY" ? "cursor-pointer" : ""}`}
              onClick={() =>
                area.status === "EMPTY" &&
                handleSeatClick(area.id, seatNumber, row)
              }
            >
              {seatNumber}
            </div>
          );
        });
        seatRows.push(
          <div key={row} className="flex justify-start mb-2 font-bold">
            {seatElements}
          </div>
        );
      }
    } else if (layoutType === "NUMBER") {
      let rowCount = 0;
      let seatElements: JSX.Element[] = [];

      for (const row in data.areas) {
        data.areas[row].forEach((area) => {
          const seatNumber = area.number;
          seatElements.push(
            <div
              key={area.id}
              className={`w-16 h-16 ${getColorClass(
                area.status
              )} m-1 flex items-center justify-center text-center text-sm font-mono ${
                tempSeatIds.includes(area.id) ? "border-4 border-blue-500" : ""
              } ${area.status === "EMPTY" ? "cursor-pointer" : ""}`}
              onClick={() =>
                area.status === "EMPTY" &&
                handleSeatClick(area.id, seatNumber, row)
              }
            >
              {seatNumber}
            </div>
          );

          if (seatElements.length === 8) {
            // 한 줄에 8개씩 배치
            seatRows.push(
              <div key={rowCount} className="flex justify-start mb-2 font-bold">
                {seatElements}
              </div>
            );
            seatElements = [];
            rowCount++;
          }
        });
      }
      if (seatElements.length > 0) {
        seatRows.push(
          <div key={rowCount} className="flex justify-start mb-2 font-bold">
            {seatElements}
          </div>
        );
      }
    }

    return seatRows;
  };

  return data ? (
    <>
      <div className="flex w-full gap-4 h-full">
        <div className="w-1/2 gap-4 py-5 flex flex-col h-[500px] items-center bg-blue-100 rounded-lg ">
          <div className="text-3xl font-bold">행사장 구조도</div>
          <div className="flex justify-center items-center w-full h-3/4">
            <img
              src={data.layoutImageUrls[0]}
              alt="Event Venue"
              className="w-full h-full object-contain px-5 pb-10 rounded mt-3"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center pt-5 bg-blue-100 rounded-lg h-[500px] overflow-x-scroll overflow-y-scroll scrollbar-custom">
          <div className="text-3xl font-bold">부스 신청 현황</div>
          <div className="w-full flex flex-col items-start pl-5 pt-3">
            {renderSeats()}
          </div>
        </div>
      </div>
      <div className="flex pr-1 mt-4 w-full justify-end">
        <LocationStateInfo color="yellow-400" state={"비어있음"} />
        <LocationStateInfo color="red-400" state={"예약됨"} />
        <LocationStateInfo color="gray-400" state={"승인됨"} />
      </div>
      <div className="flex justify-center gap-4 mt-4 w-full">
        <button
          onClick={handleConfirm}
          className="w-1/4 bg-blue-500 text-white py-2 rounded"
        >
          확인
        </button>
        <button
          onClick={handleCancel}
          className="w-1/4 bg-red-500 text-white py-2 rounded"
        >
          취소
        </button>
      </div>
    </>
  ) : (
    <>잘못된 접근입니다.</>
  );
}
