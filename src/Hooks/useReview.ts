import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccessToken } from "../Api/Util/token";

export interface Review {
  reviewer: { id: number; nickname: string; role: string };
  id: number;
  star: number;
  content: string;
  images: [
    {
      id: number;
      url: string;
      seq: number;
    }
  ];
  registerDate: string;
}

export interface EventReview extends Review {
  eventId: number;
  eventName: string;
  eventManagerId: number;
}

interface InfinityEventReview {
  hasNext: boolean;
  numberOfElements: number;
  sliceNumber: number;
  content: Array<EventReview>;
}

const fetcher = (eventId: number, page: number) => {
  return fetch(
    `http://52.79.91.214:8080/event/reviews?&event_id=${eventId}&page=${page}`,
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
};

export function useEventReview(eventId: number) {
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["eventReview", eventId],
    queryFn: ({ pageParam }) => fetcher(eventId, pageParam),
    getNextPageParam: (lastPage: InfinityEventReview) =>
      (lastPage.hasNext && lastPage.sliceNumber + 1) || undefined,
    initialPageParam: 0,
  });

  return { data, fetchNextPage, hasNextPage, refetch };
}
