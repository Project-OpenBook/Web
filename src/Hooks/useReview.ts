import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccessToken } from "../Api/Util/token";
import { ContentType } from "../Components/Event/EventReviewList";

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

const fetcher = (type: ContentType, id: number, page: number) => {
  const idKey = type === "events" ? "event_id" : "booth_id";
  const contentType = type === "events" ? "event" : "booth";

  const token = getAccessToken();

  const option: any = {
    method: "GET",
  };

  if (token) {
    option.headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
  }

  return fetch(
    `http://52.79.91.214:8080/${contentType}/reviews?&${idKey}=${id}&page=${page}`,
    option
  ).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });
};

export function useReview(contentType: ContentType, id: number) {
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["review", id],
    queryFn: ({ pageParam }) => fetcher(contentType, id, pageParam),
    getNextPageParam: (lastPage: InfinityEventReview) =>
      (lastPage.hasNext && lastPage.sliceNumber + 1) || undefined,
    initialPageParam: 0,
  });

  return { data, fetchNextPage, hasNextPage, refetch };
}
