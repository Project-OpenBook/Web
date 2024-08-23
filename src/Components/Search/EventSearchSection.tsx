import React from "react";
import EventSearchCard from "./EventSearchCard";

interface EventSearchSectionProps {
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

export default function EventSearchSection({
  title,
  items,
  buttonText,
}: EventSearchSectionProps) {
  return (
    <div className="max-w-screen-xl">
      <div className="flex justify-between items-center mb-2 px-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="text-blue-500">{buttonText} &gt;</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {items.map((item) => (
          <EventSearchCard
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
