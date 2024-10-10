import { useInfiniteQuery } from "@tanstack/react-query";
import { Booth } from "../../Api/Util/BoothService";
import { Event } from "../Event/EventDetail";
import { useEffect, useState } from "react";
import { useScrollDown } from "../../Hooks/useScrollDown";
import { OrderType } from "../../Api/Util/EventService";
import { BoothSort } from "../MyPage/MyBooth";
import { getAccessToken } from "../../Api/Util/token";

interface BookmarkBooth {
  bookmarkType: "BOOTH";
  id: number;
  booth: Booth;
}

interface BookmarkEvent {
  bookmarkType: "EVENT";
  id: number;
  event: Event;
}

interface InfinityMyBookmark {
  hasNext: boolean;
  numberOfElements: number;
  sliceNumber: number;
  content: Array<BookmarkEvent | BookmarkBooth>;
}

/*정렬넣으면 에러 발생함
&sort=registeredAt%2C${
    boothSort === "최신순" ? BoothSort.desc : BoothSort.asc
}
 */
const fetcher = (boothSort: OrderType, type: "BOOTH" | "EVENT", page: number) =>
  fetch(`http://52.79.91.214:8080/bookmark-list?type=${type}&page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });

export const useBookmark = (type: "BOOTH" | "EVENT") => {
  const [boothSort, setBoothSort] = useState<OrderType>("최신순");

  const { data, fetchNextPage, hasNextPage, isError, refetch } =
    useInfiniteQuery({
      queryKey: ["bookmark", type],
      queryFn: ({ pageParam }) => fetcher(boothSort, type, pageParam),
      getNextPageParam: (lastPage: InfinityMyBookmark) =>
        (lastPage.hasNext && lastPage.sliceNumber + 1) || undefined,
      initialPageParam: 0,
    });

  useEffect(() => {
    refetch();
  }, [boothSort, refetch]);

  useScrollDown({
    onScrollDownToEnd: fetchNextPage,
    offset: 5,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
  };
};
