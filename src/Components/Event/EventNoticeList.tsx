import { useParams } from "react-router-dom";
import { useEventNotice } from "../../Hooks/Event/useEventNotice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useScrollDown } from "../../Hooks/useScrollDown";
import NoticeCard from "../NoticeCard";
import { useQuery } from "@tanstack/react-query";
import { Event, eventFetcher } from "./EventDetail";
import AddNotice from "../Notice/AddNotice";
import { useAuth } from "../../Hooks/useAuth";

export default function EventNoticeList() {
  const { id } = useParams();
  const { id: userId } = useAuth();
  const { data, fetchNextPage, hasNextPage, refetch } = useEventNotice(
    +(id ?? 1)
  );

  const { data: eventData } = useQuery<Event>({
    queryKey: ["event", id],
    enabled: !!id,
    queryFn: () => eventFetcher(id),
    retry: 1,
  });

  useScrollDown({ offset: 0, onScrollDownToEnd: () => refetch() });

  return (
    <InfiniteScroll
      dataLength={data?.pages[0].numberOfElements ?? 5}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className="text-center my-4">로딩 중...</h4>}
      className="w-full max-w-screen-lg h-screen p-2 pt-10 border-b mx-auto"
    >
      {eventData?.eventManager.id === userId && (
        <AddNotice id={+(id ?? 0)} type="events" refetch={refetch} />
      )}

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
