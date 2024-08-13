import React, { useState } from "react";
import { FcCalendar } from "react-icons/fc";

interface DateRangeFilterProps {
  onFilter: (startDate: string, endDate: string) => void;
}

export default function DateRangeFilter({ onFilter }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilter(startDate, endDate);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <FcCalendar className="h-6 w-6" />
      <span className="p-2 -translate-x-2">특정 기간 내 행사 찾기</span>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded"
      />
      <span>~</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleFilter}
        className={`bg-blue-500 text-white p-2 rounded ${
          !(startDate && endDate) ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!(startDate && endDate)}
      >
        찾기
      </button>
    </div>
  );
}
