import React from "react";
import BoothSearchCard from "./BoothSearchCard";

interface BoothSearchSectionProps {
  title: string;
  items: Array<{
    id: number;
    name: string;
    image: string;
    endDate: string;
    tags?: string[];
  }>;
  buttonText: string;
}

export default function BoothSearchSection({
  title,
  items,
  buttonText,
}: BoothSearchSectionProps) {
  return (
    <div className="max-w-screen-xl">
      <div className="flex justify-between items-center mb-2 px-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className={`text-blue-500 ${items.length <= 4 && "hidden"}`}>
          {buttonText} &gt;
        </button>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {items.map((item) => (
          <BoothSearchCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            endDate={item.endDate}
            tags={item.tags}
          />
        ))}
      </div>
    </div>
  );
}
