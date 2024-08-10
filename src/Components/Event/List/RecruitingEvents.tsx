import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Event, fetchEvents, OrderType } from "../../../Api/Util/EventService";

interface RecruitingEventsProps {
  sortOrder: OrderType;
}

export default function RecruitingEvents({ sortOrder }: RecruitingEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMoreEvents = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const response = await fetchEvents(sliceNumber, sortOrder, "recruiting");
      if (sliceNumber === 0) {
        setEvents(response.content);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...response.content]);
      }
      setHasMore(response.hasNext);
      setSliceNumber((prevSliceNumber) => prevSliceNumber + 1);
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEvents([]);
    setSliceNumber(0);
    setHasMore(true);
    setLoading(true);
    fetchMoreEvents();
  }, [sortOrder]);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>데이터를 가져오는데 문제가 발생했습니다.</h2>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={events.length}
      next={fetchMoreEvents}
      hasMore={hasMore}
      loader={<h4 className="text-center my-4">로딩 중...</h4>}
      endMessage={
        <p className="text-center font-bold my-4">모든 행사를 불러왔습니다.</p>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            image={event.mainImageUrl}
            endDate={event.recruitEndDate}
            tags={event.tags}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
