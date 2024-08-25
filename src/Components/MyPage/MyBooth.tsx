import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../Api/Util/token";
import { useEffect, useState } from "react";
import RadioButtons from "../Event/List/RadioButtons";
import { OrderType } from "../../Api/Util/EventService";
import InfiniteScroll from "react-infinite-scroll-component";
import BoothCard from "../Booth/List/BoothCard";
import { Booth } from "../../Api/Util/BoothService";
import { useScrollDown } from "../../Hooks/useScrollDown";

enum BoothStatus {
  all = "ALL",
  aprove = "APPROVE",
  waiting = "WAITING",
  reject = "REJECT",
}

enum BoothSort {
  desc = "DESC",
  asc = "ASC",
}

interface InfinityMyEvent {
  hasNext: boolean;
  numberOfElements: number;
  sliceNumber: number;
  content: Array<Booth>;
}

const fetcher = (
  boothSort: OrderType,
  boothStatus: BoothStatus,
  page: number
) =>
  fetch(
    `http://52.79.91.214:8080/manage/booths?status=${boothStatus}&sort=registeredAt%2C${
      boothSort === "최신순" ? BoothSort.desc : BoothSort.asc
    }&page=${page}`,
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

export default function MyBooth() {
  const [boothStatus] = useState<BoothStatus>(BoothStatus.all);
  const [boothSort, setBoothSort] = useState<OrderType>("최신순");

  const { data, fetchNextPage, hasNextPage, isError, refetch } =
    useInfiniteQuery({
      queryKey: ["mybooth"],
      queryFn: ({ pageParam }) => fetcher(boothSort, boothStatus, pageParam),
      getNextPageParam: (lastPage: InfinityMyEvent) =>
        (lastPage.hasNext && lastPage.sliceNumber + 1) || undefined,
      initialPageParam: 0,
    });

  useEffect(() => {
    refetch();
  }, [boothSort, refetch]);

  useScrollDown({
    onScrollDownToEnd: fetchNextPage,
    offset: 100,
  });

  if (isError && !data?.pages) {
    return <>내 부스 데이터를 가져오는데 실패했습니다.</>;
  }

  return (
    <InfiniteScroll
      dataLength={data?.pages[0].numberOfElements ?? 6}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className="text-center my-4">로딩 중...</h4>}
      endMessage={
        <p className="text-center font-bold my-4">모든 부스를 불러왔습니다</p>
      }
    >
      <section className="flex flex-col gap-4">
        <RadioButtons sortOrder={boothSort} onSortOrderChange={setBoothSort} />
        {data?.pages.map((myBooth) =>
          myBooth.content.map((booth) => (
            <BoothCard
              endDate={booth.closeDate}
              id={booth.id}
              image={booth.mainImageUrl}
              name={booth.name}
              key={booth.id}
              eventName={booth.eventName}
              // tags={booth.tags} TODO: 부스 tags 브랜치 머지 후 주석 해제
            />
          ))
        )}
      </section>
    </InfiniteScroll>
  );
}
