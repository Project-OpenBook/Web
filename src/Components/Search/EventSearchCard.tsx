import React from "react";
import { useNavigate } from "react-router-dom";

interface EventSearchCardProps {
  id: number;
  name: string;
  image: string;
  endDate: string;
  tags?: string[];
}

export default function EventSearchCard({
  id,
  name,
  image,
  endDate,
  tags,
}: EventSearchCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded overflow-hidden shadow-md w-full h-80 flex flex-col cursor-pointer"
    >
      <div className="flex-grow bg-sky-50 flex items-center justify-center max-h-[200px]">
        <img src={image} alt={name} className="object-contain h-full w-full" />
      </div>
      <div className="flex flex-col w-full gap-1 p-3 my-1">
        <p className="text-gray-600">종료일: {endDate}</p>
        <p className="text-black font-bold">{name}</p>
        <div className="flex items-center gap-2">
          {tags?.map((tag) => (
            <p className="px-2 py-1 rounded-lg text-sm text-white bg-blue-400">
              {tag}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
