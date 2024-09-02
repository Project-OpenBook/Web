import React from "react";
import BoothSearchCard from "./BoothSearchCard";
import { FcAbout } from "react-icons/fc";

interface BoothSearchSectionProps {
  title: string;
  items: {
    id: number;
    name: string;
    eventName: string;
    image: string;
    endDate: string;
    tags?: string[];
  }[];
  buttonText: string;
  sliceNumber: number;
  numberOfElements: number;
  onMoreClick: () => void;
}

export default function BoothSearchSection({
  title,
  items,
  buttonText,
  sliceNumber,
  numberOfElements,
  onMoreClick,
}: BoothSearchSectionProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {sliceNumber === 0 && numberOfElements >= 5 && (
          <button
            onClick={onMoreClick}
            className="text-blue-400 font-bold px-3 py-px border border-blue-400 rounded-full hover:bg-blue-100"
          >
            {buttonText}
          </button>
        )}
      </div>
      {sliceNumber === 0 && numberOfElements === 0 ? (
        <div className="flex flex-col items-center justify-center h-80">
          <FcAbout className="text-4xl mb-2" />
          <p className="text-gray-500 text-lg font-bold">
            해당하는 데이터가 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <BoothSearchCard
              key={item.id}
              id={item.id}
              name={item.name}
              eventName={item.eventName}
              image={item.image}
              endDate={item.endDate}
              tags={item.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
}
