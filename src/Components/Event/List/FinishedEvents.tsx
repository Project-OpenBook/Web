import React, { useState, useEffect, useRef } from "react";
import EventCard from "./EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Event, fetchEvents, OrderType } from "../../../Api/Util/EventService";

interface FinishedEventsProps {
  sortOrder: OrderType;
  startDate: string | null;
  endDate: string | null;
}

export default function FinishedEvents({
  sortOrder,
  startDate,
  endDate,
}: FinishedEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const initialLoad = useRef(true);
  const isFetching = useRef(false);

  const filterEventsByDate = (events: Event[]) => {
    if (!startDate || !endDate) return events;

    const formatDateString = (dateString: string) => {
      return dateString.replace(/-/g, "/");
    };

    const start = new Date(formatDateString(startDate));
    const end = new Date(formatDateString(endDate));

    return events.filter((event) => {
      const eventStart = new Date(formatDateString(event.openDate));
      const eventEnd = new Date(formatDateString(event.closeDate));
      return eventStart <= end && eventEnd >= start;
    });
  };

  const fetchMoreEvents = async () => {
    if (loading || !hasMore || isFetching.current) return;

    isFetching.current = true;

    try {
      setLoading(true);
      setIsError(false);

      const response = await fetchEvents(sliceNumber, sortOrder, "terminated");

      let fetchedEvents = response.content;
      let filteredEvents = filterEventsByDate(fetchedEvents);

      while (filteredEvents.length === 0 && response.hasNext) {
        const nextSliceNumber = sliceNumber + 1;
        const nextResponse = await fetchEvents(
          nextSliceNumber,
          sortOrder,
          "terminated"
        );
        fetchedEvents = nextResponse.content;
        filteredEvents = filterEventsByDate(fetchedEvents);

        if (filteredEvents.length > 0) {
          setSliceNumber(nextSliceNumber);
          break;
        }

        if (!nextResponse.hasNext) {
          setHasMore(false);
          break;
        }
      }

      const uniqueEvents = filteredEvents.filter(
        (event) =>
          !events.some((existingEvent) => existingEvent.id === event.id)
      );

      if (uniqueEvents.length > 0) {
        setEvents((prevEvents) => [...prevEvents, ...uniqueEvents]);
      }

      if (!response.hasNext || uniqueEvents.length === 0) {
        setHasMore(false);
      } else {
        setSliceNumber((prevSliceNumber) => prevSliceNumber + 1);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setIsError(true);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  const resetAndFetchEvents = () => {
    setEvents([]);
    setSliceNumber(0);
    setHasMore(true);
    setLoading(false);
  };

  useEffect(() => {
    if (sliceNumber === 0) {
      fetchMoreEvents();
    }
  }, [sliceNumber]);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      fetchMoreEvents();
      return;
    }

    resetAndFetchEvents();
  }, [sortOrder, startDate, endDate]);

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
            endDate={event.closeDate}
            tags={event.tags}
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
