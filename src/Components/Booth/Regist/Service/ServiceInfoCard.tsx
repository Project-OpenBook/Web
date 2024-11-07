import noImage from "../../../../images/noimage.png";
import { useState, useMemo } from "react";
import ReserveTable from "./ReserveTable";

interface Props {
  serviceData: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    reservations: ReservationDate[];
  };
  isManager: boolean;
}
interface ApplyUser {
  id: string;
  name: string;
  nickname: string;
  role: string;
}
interface ReservationDate {
  date: string;
  times: ReservationTime[];
}

interface ReservationTime {
  id: number;
  times: string;
  status: "EMPTY" | "RESERVED" | string;
  applyUser?: ApplyUser;
}

export default function ServiceInfoCard({ serviceData, isManager }: Props) {
  const [isTableModalOpen, setTableModalOpen] = useState(false);

  const reversedReservations = useMemo(
    () => [...serviceData.reservations].reverse(),
    [serviceData.reservations]
  );

  return (
    <>
      <div className="w-full border p-2 rounded-lg flex relative bg-white hover:shadow-sm">
        <img
          src={serviceData.imageUrl || noImage}
          className="w-32 h-32 object-cover rounded-lg"
          alt={serviceData.name}
        />
        <div className="flex flex-col justify-between flex-grow pl-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-gray-900">
                {serviceData.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {reversedReservations[reversedReservations.length - 1].date}
                {" ~ "}
                {reversedReservations[0].date}
              </p>
              <p className="text-xl font-semibold text-gray-800">
                {serviceData.price.toLocaleString()}원
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setTableModalOpen(true);
                }}
                className="px-3 py-1 text-sm font-medium text-white rounded-md bg-blue-400 hover:bg-blue-500"
              >
                예약 내용 보기
              </button>
              {isManager && (
                <button className="px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded-md hover:bg-red-50">
                  삭제
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600 mt-3 line-clamp-2">
            {serviceData.description || "설명이 없습니다."}
          </p>
        </div>
      </div>
      {isTableModalOpen && (
        <ReserveTable
          isManager={isManager}
          reserveInfo={reversedReservations}
          onClose={() => setTableModalOpen(false)}
        />
      )}
    </>
  );
}
