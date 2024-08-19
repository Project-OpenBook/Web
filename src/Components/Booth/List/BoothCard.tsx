import React from "react";
import { useNavigate } from "react-router-dom";

interface BoothCardProps {
  id: number;
  name: string;
  eventName: string;
  image: string;
  endDate: string;
  tags?: string[];
}

export default function BoothCard({
  id,
  name,
  eventName,
  image,
  endDate,
  tags,
}: BoothCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/booth/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded overflow-hidden shadow-md w-full h-96 flex flex-col cursor-pointer"
    >
      <div className="flex-grow bg-sky-50 flex items-center justify-center max-h-[280px]">
        <img src={image} alt={name} className="object-contain h-full w-full" />
      </div>
      <div className="flex flex-col w-full gap-1 p-3">
        <p className="text-gray-600">종료일: {endDate}</p>
        <p className="text-black font-bold">
          &#91;{eventName}&#93; &nbsp;{name}
        </p>
        <div className="flex items-center gap-2">
          {tags?.map((tag) => (
            <p className="px-1 rounded-lg text-white bg-blue-400">{tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
