import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import EventCard from "../Event/List/EventCard";
import { getAccessToken } from "../../Api/Util/token";
import { useEffect, useState } from "react";
import { Event } from "../Event/EventDetail";
import RadioButtons from "../Event/List/RadioButtons";
import { OrderType } from "../../Api/Util/EventService";
import InfiniteScroll from "react-infinite-scroll-component";

enum EventStatus {
  all = "ALL",
  aprove = "APPROVE",
  waiting = "WAITING",
  reject = "REJECT",
}

enum EventSort {
  desc = "DESC",
  asc = "ASC",
}

interface InfinityMyEvent {
  hasNext: boolean;
  numberOfElements: number;
  sliceNumber: number;
  content: Array<Event>;
}

const fetcher = (
  eventSort: OrderType,
  eventStatus: EventStatus,
  page: number
) =>
  fetch(
    `http://52.79.91.214:8080/manage/events?status=${eventStatus}&sort=registeredAt%2C${
      eventSort === "최신순" ? EventSort.desc : EventSort.asc
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  ).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });

export default function MyEvent() {
  const [eventStatus] = useState<EventStatus>(EventStatus.all);
  const [eventSort, setEventSort] = useState<OrderType>("최신순");

  const { data, fetchNextPage, hasNextPage, isError, refetch } =
    useInfiniteQuery({
      queryKey: ["myevent"],
      queryFn: ({ pageParam }) => fetcher(eventSort, eventStatus, pageParam),
      getNextPageParam: (lastPage: InfinityMyEvent) =>
        (lastPage.hasNext && lastPage.sliceNumber + 1) || undefined,
      initialPageParam: 0,
    });

  useEffect(() => {
    refetch();
  }, [eventSort, refetch]);

  if (isError && !data?.pages) {
    return <>내 행사 데이터를 가져오는데 실패했습니다.</>;
  }

  return (
    <InfiniteScroll
      dataLength={data?.pages[0].numberOfElements ?? 5}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className="text-center my-4">로딩 중...</h4>}
      endMessage={
        <p className="text-center font-bold my-4">모든 행사를 불러왔습니다</p>
      }
    >
      <section className="flex flex-col gap-4">
        <RadioButtons sortOrder={eventSort} onSortOrderChange={setEventSort} />

        {data?.pages.map((myEvent) =>
          myEvent.content.map((event) => (
            <EventCard
              endDate={event.closeDate}
              id={event.id}
              image={event.mainImageUrl}
              name={event.name}
              key={event.id}
              tags={event.tags}
            />
          ))
        )}
      </section>
    </InfiniteScroll>
  );
}
