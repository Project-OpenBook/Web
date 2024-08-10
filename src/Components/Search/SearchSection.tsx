import React from "react";
import SearchCard from "./SearchCard";

interface SearchSectionProps {
  title: string;
  items: { title: string; endDate: string }[]; // 종료일 추가
  buttonText: string;
}

export default function SearchSection({
  title,
  items,
  buttonText,
}: SearchSectionProps) {
  return (
    <div className="max-w-screen-2xl">
      <div className="flex justify-between items-center mb-2 px-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button>{buttonText} &gt;</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <SearchCard key={index} title={item.title} endDate={item.endDate} />
        ))}
      </div>
    </div>
  );
}
