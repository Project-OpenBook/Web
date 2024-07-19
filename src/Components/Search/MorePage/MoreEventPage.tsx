import React, { useState, useEffect } from "react";
import MoreCard from "./MoreCard";
import InfiniteScroll from "react-infinite-scroll-component";
import RadioButtons from "../../Event/List/RadioButtons";

interface Event {
  id: number;
  name: string;
  image?: string;
  endDate: string;
}

const dummyEvents: Event[] = [
  {
    id: 1,
    name: "Event 1",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Event 2",
    endDate: "2024-11-30",
  },
  {
    id: 3,
    name: "Event 3",
    endDate: "2024-12-31",
  },
  {
    id: 4,
    name: "Event 4",
    endDate: "2024-11-30",
  },
  {
    id: 5,
    name: "Event 5",
    endDate: "2024-12-31",
  },
  {
    id: 6,
    name: "Event 6",
    endDate: "2024-11-30",
  },
  {
    id: 7,
    name: "Event 7",
    endDate: "2024-12-31",
  },
  {
    id: 8,
    name: "Event 8",
    endDate: "2024-11-30",
  },
  {
    id: 9,
    name: "Event 9",
    endDate: "2024-12-31",
  },
  {
    id: 10,
    name: "Event 10",
    endDate: "2024-11-30",
  },
  {
    id: 11,
    name: "Event 11",
    endDate: "2024-12-31",
  },
  {
    id: 12,
    name: "Event 12",
    endDate: "2024-11-30",
  },
  {
    id: 13,
    name: "Event 13",
    endDate: "2024-12-31",
  },
  {
    id: 14,
    name: "Event 14",
    endDate: "2024-11-30",
  },
  {
    id: 15,
    name: "Event 15",
    endDate: "2024-12-31",
  },
  {
    id: 16,
    name: "Event 16",
    endDate: "2024-11-30",
  },
];

export default function MoreEventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("검색어");

  const fetchMoreEvents = () => {
    setLoading(true);
    const newEvents = dummyEvents.slice(sliceNumber * 6, (sliceNumber + 1) * 6);
    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    setHasMore(newEvents.length > 0);
    setSliceNumber((prevSliceNumber) => prevSliceNumber + 1);
    setLoading(false);
  };

  useEffect(() => {
    setEvents([]);
    setSliceNumber(0);
    setHasMore(true);
    setLoading(true);
    fetchMoreEvents();
  }, []);

  return (
    <div className="p-4 m-8">
      <div className="p-4 mt-4 border-b-2 border-r-2 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">
            “{searchTerm}” 와 관련된 "행사" 검색 결과입니다
          </h2>
        </div>
        <div className="flex justify-end mb-4 mx-10">
          <RadioButtons
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        </div>
        {loading && events.length === 0 ? (
          <h4 className="text-center my-4">로딩 중...</h4>
        ) : events.length === 0 ? (
          <p className="text-center my-4">행사 정보가 없습니다</p>
        ) : (
          <InfiniteScroll
            dataLength={events.length}
            next={fetchMoreEvents}
            hasMore={hasMore}
            loader={<h4 className="text-center my-4">로딩 중...</h4>}
            endMessage={
              <p className="text-center font-bold my-4">
                모든 행사를 불러왔습니다
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
              {events.map((event) => (
                <MoreCard
                  key={event.id}
                  name={event.name}
                  image={event.image}
                  endDate={event.endDate}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
