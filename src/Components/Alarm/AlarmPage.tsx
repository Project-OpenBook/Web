import React, { useState, useEffect, useCallback, useRef } from "react";
import AlarmCard from "./AlarmCard";
import { FcAbout } from "react-icons/fc"; // 아이콘 추가
import {
  fetchAlarms,
  Alarm,
  deleteAllAlarms,
} from "../../Api/Util/AlarmService";

interface Props {
  onClose: () => void;
}

export default function AlarmPage({ onClose }: Props) {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loadMoreAlarms = useCallback(async () => {
    if (hasNext && !isLoading) {
      setIsLoading(true);
      try {
        const response = await fetchAlarms(sliceNumber);
        setAlarms((prev) => [...prev, ...response.content]);
        setSliceNumber((prevSliceNumber) => prevSliceNumber + 1);
        setHasNext(response.hasNext);
      } catch (error) {
        console.error("Failed to fetch alarms:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [hasNext, isLoading, sliceNumber]);

  useEffect(() => {
    loadMoreAlarms();
  }, []);

  const handleScroll = () => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
        scrollRef.current.scrollHeight - 50
    ) {
      loadMoreAlarms();
    }
  };

  const handleDelete = (id: number) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllAlarms();
      setAlarms([]);
    } catch (error) {
      console.error("Failed to delete all alarms:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">알림</span>
        <button
          onClick={onClose}
          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-black hover:bg-gray-300 focus:outline-none"
        >
          <span className="text-xl">&times;</span>
        </button>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-4 p-2"
      >
        {alarms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <FcAbout className="text-6xl mb-4" />
            <span className="text-gray-500">표시할 알림이 없습니다.</span>
          </div>
        ) : (
          alarms.map((alarm, index) => (
            <AlarmCard
              key={index}
              id={alarm.id}
              content_name={alarm.content_name}
              message={alarm.message}
              registeredAt={alarm.registeredAt}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      <div className="mt-3 flex justify-end">
        <button onClick={handleDeleteAll} className="text-black p-2 rounded">
          모두 지우기
        </button>
      </div>
    </div>
  );
}
