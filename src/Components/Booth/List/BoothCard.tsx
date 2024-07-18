import React from "react";
import { useNavigate } from "react-router-dom";

interface BoothCardProps {
  id: number;
  name: string;
  eventName: string;
  image: string;
  endDate: string;
}

export default function BoothCard({
  id,
  name,
  eventName,
  image,
  endDate,
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
      <div className="flex-grow bg-gray-300 flex items-center justify-center h-56">
        <img src={image} alt={name} className="object-cover h-full w-full" />
      </div>
      <div className="p-4">
        <p className="text-gray-600">종료일: {endDate}</p>
        <p className="text-black font-bold">
          &#91;{eventName}&#93; &nbsp;{name}
        </p>
      </div>
    </div>
  );
}
