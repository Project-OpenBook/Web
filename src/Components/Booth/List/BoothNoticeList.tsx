import { useParams } from "react-router-dom";
import { useBoothNotice } from "../../../Hooks/Booth/useBoothNotice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useScrollDown } from "../../../Hooks/useScrollDown";
import NoticeCard from "../../NoticeCard";
import AddNotice from "../../Notice/AddNotice";
import { useAuth } from "../../../Hooks/useAuth";
import { useGetBoothDetail } from "../../../Hooks/Booth/useGetBoothDetail";

export default function BoothNoticeList() {
  const { id } = useParams();
  const { id: userId } = useAuth();

  const { data: boothData } = useGetBoothDetail(id ?? "");

  const { data, fetchNextPage, hasNextPage, refetch } = useBoothNotice(
    +(id ?? 1)
  );

  useScrollDown({ offset: 0, onScrollDownToEnd: () => refetch() });

  return (
    <InfiniteScroll
      dataLength={data?.pages[0].numberOfElements ?? 5}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4 className="text-center my-4">로딩 중...</h4>}
      className="w-full max-w-screen-lg h-full p-2 pt-10 mx-auto"
    >
      {
        /*boothData?.manager.id === userId && (*/
        <AddNotice type="booths" id={+(id ?? 0)} refetch={refetch} />
        /*)*/
      }
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
