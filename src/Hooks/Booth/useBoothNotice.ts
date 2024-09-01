import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../Api/Util/token";
import { Notice } from "../Event/useEventNotice";

export interface BoothNotice extends Notice {
  boothId: number;
  boothName: string;
  boothManagerId: number;
}

interface InfinityEventNotice {
  hasNext: boolean;
  numberOfElements: number;
  sliceNumber: number;
  content: Array<BoothNotice>;
}

const fetcher = (boothid: number) => {
  return fetch(`http://52.79.91.214:8080/booths/${boothid}/notices`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });
};

export function useBoothNotice(eventId: number) {
  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["eventNotice", eventId],
    queryFn: ({ pageParam }) => fetcher(pageParam),
    getNextPageParam: (lastPage: InfinityEventNotice) =>
      (lastPage.hasNext && lastPage.sliceNumber + 1) || undefined,
    initialPageParam: eventId,
  });

  return { data, fetchNextPage, hasNextPage, refetch };
}
