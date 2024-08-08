import { useQuery } from "@tanstack/react-query";
import EventCard from "../Event/List/EventCard";
import { getAccessToken } from "../../Api/Util/token";
import { useEffect, useState } from "react";
import { Event } from "../Event/EventDetail";
import RadioButtons from "../Event/List/RadioButtons";
import { OrderType } from "../../Api/Util/EventService";

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

const fetcher = (status: EventStatus, sort: OrderType) =>
  fetch(
    `http://52.79.91.214:8080/manage/events?status=${status}&sort=registeredAt%2C${
      sort === "최신순" ? EventSort.desc : EventSort.asc
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

  const { data, isError, refetch } = useQuery<InfinityMyEvent>({
    queryKey: ["my-event"],
    queryFn: () => fetcher(eventStatus, eventSort),
  });

  useEffect(() => {
    refetch();
  }, [eventSort, refetch]);

  if (isError) {
    return <>내 행사 데이터를 가져오는데 실패했습니다.</>;
  }

  return (
    <section className="flex flex-col gap-4">
      <RadioButtons sortOrder={eventSort} onSortOrderChange={setEventSort} />

      {data?.content.map((event) => (
        <EventCard
          endDate={event.closeDate}
          id={event.id}
          image={event.mainImageUrl}
          name={event.name}
          key={event.id}
          tags={event.tags}
        />
      ))}
    </section>
  );
}
