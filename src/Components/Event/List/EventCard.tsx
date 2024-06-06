import React from "react";

interface EventCardProps {
  name: string;
  image: string;
  endDate: string;
}

export default function EventCard({ name, image, endDate }: EventCardProps) {
  return (
    <div className="border rounded overflow-hidden shadow-md w-full h-96 flex flex-col">
      <div className="flex-grow bg-gray-300 flex items-center justify-center h-56">
        <img src={image} alt={name} className="object-cover h-full w-full" />
      </div>
      <div className="p-4">
        <p className="text-gray-600">종료일: {endDate}</p>
        <p className="text-black font-bold">{name}</p>
      </div>
    </div>
  );
}
