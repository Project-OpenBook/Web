import React from "react";
import tempBanner from "../../logo.svg";

interface SearchCardProps {
  title: string;
  image?: string;
  endDate: string;
}

export default function SearchCard({
  title,
  image = tempBanner,
  endDate,
}: SearchCardProps) {
  return (
    <div className="border rounded overflow-hidden shadow-md w-full h-88 flex flex-col">
      <div className="flex-grow bg-gray-300 flex items-center justify-center h-40">
        <img src={image} alt={title} className="object-contain h-48 w-full" />
      </div>
      <div className="p-4">
        <p className="text-gray-600">종료일: {endDate}</p>
        <p className="text-black font-bold">{title}</p>
      </div>
    </div>
  );
}
