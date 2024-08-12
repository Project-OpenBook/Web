import React from "react";
import { FcAdvertising } from "react-icons/fc";

interface AlarmCardProps {
  id: number;
  content_name: string;
  message: string;
  registeredAt: string;
  onDelete: (id: number) => void;
}

export default function AlarmCard({
  id,
  content_name,
  message,
  registeredAt,
  onDelete,
}: AlarmCardProps) {
  const handleDelete = () => {
    onDelete(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toTimeString().split(" ")[0];
    return `[${formattedDate}, ${formattedTime}]`;
  };

  return (
    <div className="relative bg-white p-3 rounded shadow-lg mt-3">
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <div className="flex items-center">
        <div className="border-2 border-blue-500 rounded-full p-1 bg-white ml-2">
          <FcAdvertising />
        </div>
        <div className="ml-5">
          <p className="font-bold">{content_name}</p>
          <p>{message}</p>
          <p className="text-gray-500 text-sm">{formatDate(registeredAt)}</p>
        </div>
      </div>
    </div>
  );
}
