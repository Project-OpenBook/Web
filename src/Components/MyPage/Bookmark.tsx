import InfiniteScroll from "react-infinite-scroll-component";
import { useBookmark } from "../Bookmark/useBookmark";
import BoothCard from "../Booth/List/BoothCard";
import EventCard from "../Event/List/EventCard";
import { useState } from "react";

export default function Bookmark() {
  const [selectedType, setSelectedType] = useState<"EVENT" | "BOOTH">("EVENT");
  const { data, fetchNextPage, hasNextPage } = useBookmark(selectedType);

  return (
    <section>
      <div className="flex space-x-4 mb-4">
        <label>
          <input
            type="radio"
            value="행사"
            checked={selectedType === "EVENT"}
            onChange={() => setSelectedType("EVENT")}
            className="mr-2"
          />
          행사
        </label>
        <label>
          <input
            type="radio"
            value="부스"
            checked={selectedType === "BOOTH"}
            onChange={() => setSelectedType("BOOTH")}
            className="mr-2"
          />
          부스
        </label>
      </div>
      <InfiniteScroll
        dataLength={data?.pages[0].numberOfElements ?? 6}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4 className="text-center my-4">로딩 중...</h4>}
        endMessage={
          <p className="text-center font-bold my-8">
            모든 북마크 {selectedType === "EVENT" ? "행사" : "부스"}를
            불러왔습니다
          </p>
        }
      >
        <div className="flex flex-col gap-4">
          {data?.pages.map((items) =>
            items.content.map((item) =>
              item.bookmarkType === "BOOTH" ? (
                <BoothCard
                  endDate={item.booth.closeDate}
                  id={item.booth.id}
                  image={item.booth.mainImageUrl}
                  name={item.booth.name}
                  key={item.booth.id}
                  eventName={item.booth.eventName}
                  // tags={item.tags} TODO: 부스 tags 브랜치 머지 후 주석 해제
                />
              ) : (
                <EventCard
                  endDate={item.event.closeDate}
                  id={item.event.id}
                  image={item.event.mainImageUrl}
                  name={item.event.name}
                  key={item.event.id}
                  tags={item.event.tags}
                />
              )
            )
          )}
        </div>
      </InfiniteScroll>
    </section>
  );
}
