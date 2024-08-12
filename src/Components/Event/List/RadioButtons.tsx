import React from "react";
import { OrderType } from "../../../Api/Util/EventService";

interface RadioButtonsProps {
  sortOrder: OrderType;
  onSortOrderChange: (sortOrder: OrderType) => void;
}

export default function RadioButtons({
  sortOrder,
  onSortOrderChange,
}: {
  sortOrder: OrderType;
  onSortOrderChange: (sortOrder: OrderType) => void;
}) {
  return (
    <div className="flex space-x-4">
      <label>
        <input
          type="radio"
          value="최신순"
          checked={sortOrder === "최신순"}
          onChange={() => onSortOrderChange("최신순")}
          className="mr-2"
        />
        최신순
      </label>
      <label>
        <input
          type="radio"
          value="오래된순"
          checked={sortOrder === "오래된순"}
          onChange={() => onSortOrderChange("오래된순")}
          className="mr-2"
        />
        오래된순
      </label>
    </div>
  );
}
