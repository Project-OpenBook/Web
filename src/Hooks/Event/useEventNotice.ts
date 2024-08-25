import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../Api/Util/token";

export interface EventNotice {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  type: "BASIC" | "EVENT";
  registeredAt: string;
  eventId: number;
  eventName: string;
  eventManagerId: number;
}

interface InfinityEventNotice {
  hasNext: boolean;
  numberOfElements: number;
  sliceNumber: number;
  content: Array<EventNotice>;
}

const fetcher = (eventId: number) => {
  return fetch(`http://52.79.91.214:8080/events/${eventId}/notices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });
};

export function useEventNotice(eventId: number) {
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["eventNotice", eventId],
    queryFn: ({ pageParam }) => fetcher(pageParam),
    getNextPageParam: (lastPage: InfinityEventNotice) =>
      (lastPage.hasNext && lastPage.sliceNumber + 1) || undefined,
    initialPageParam: eventId,
  });

  return { data, fetchNextPage, hasNextPage, refetch };
}
