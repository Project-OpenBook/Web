import { useParams } from "react-router-dom";
import { useBoothNotice } from "../../../Hooks/Booth/useBoothNotice";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useScrollDown } from "../../../Hooks/useScrollDown";
import NoticeCard from "../../NoticeCard";
import RadioButtons from "../../Event/List/RadioButtons";

export default function BoothNoticeList() {
  const { id } = useParams();

  const { data, fetchNextPage, hasNextPage, refetch } = useBoothNotice(
    +(id ?? 1)
  );

  //   const {
  //     data: eventData,
  //     isError,
  //     isLoading,
  //   } = useQuery<Event>({
  //     queryKey: ["event", id],
  //     enabled: !!id,
  //     queryFn: () => eventFetcher(id),
  //     retry: 1,
  //   });

  useScrollDown({ offset: 0, onScrollDownToEnd: () => refetch() });

  return (
    <InfiniteScroll
      dataLength={data?.pages[0].numberOfElements ?? 5}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className="text-center my-4">로딩 중...</h4>}
      endMessage={
        <p className="text-center font-bold my-4">모든 공지를 불러왔습니다</p>
      }
      className="w-full max-w-screen-lg h-full p-2 pt-10 mx-auto"
    >
      {/* {eventData?.isUserManager && <NoticeRegister eventId={+(id ?? 0)} />} */}
      <section className="w-full flex flex-col gap-4">
        {/* <RadioButtons sortOrder={eventSort} onSortOrderChange={setEventSort} /> */}

        {data?.pages.map((notices) =>
          notices.content.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        )}
      </section>
    </InfiniteScroll>
  );
}