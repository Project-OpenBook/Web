import React from "react";
import SearchCard from "./SearchCard";

interface SearchSectionProps {
  title: string;
  items: { title: string }[];
  buttonText: string;
}

export default function SearchSection({
  title,
  items,
  buttonText,
}: SearchSectionProps) {
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-2 px-2 mx-44">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button>{buttonText} &gt;</button>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-8">
          {items.map((item, index) => (
            <SearchCard key={index} title={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}