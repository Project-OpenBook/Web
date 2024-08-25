import React, { useState, useEffect } from "react";
import MoreCard from "./MoreCard";
import InfiniteScroll from "react-infinite-scroll-component";
import RadioButtons from "../../Event/List/RadioButtons";
import { OrderType } from "../../../Api/Util/EventService";

interface EventHashtag {
  id: number;
  name: string;
  image?: string;
  endDate: string;
}

const dummyEventHashtags: EventHashtag[] = [
  {
    id: 1,
    name: "Event_Hashtag 1",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Event_Hashtag 2",
    endDate: "2024-11-30",
  },
  {
    id: 3,
    name: "Event_Hashtag 3",
    endDate: "2024-12-31",
  },
  {
    id: 4,
    name: "Event_Hashtag 4",
    endDate: "2024-11-30",
  },
  {
    id: 5,
    name: "Event_Hashtag 5",
    endDate: "2024-12-31",
  },
  {
    id: 6,
    name: "Event_Hashtag 6",
    endDate: "2024-11-30",
  },
  {
    id: 7,
    name: "Event_Hashtag 7",
    endDate: "2024-12-31",
  },
  {
    id: 8,
    name: "Event_Hashtag 8",
    endDate: "2024-11-30",
  },
  {
    id: 9,
    name: "Event_Hashtag 9",
    endDate: "2024-12-31",
  },
  {
    id: 10,
    name: "Event_Hashtag 10",
    endDate: "2024-11-30",
  },
  {
    id: 11,
    name: "Event_Hashtag 11",
    endDate: "2024-12-31",
  },
  {
    id: 12,
    name: "Event_Hashtag 12",
    endDate: "2024-11-30",
  },
  {
    id: 13,
    name: "Event_Hashtag 13",
    endDate: "2024-12-31",
  },
  {
    id: 14,
    name: "Event_Hashtag 14",
    endDate: "2024-11-30",
  },
  {
    id: 15,
    name: "Event_Hashtag 15",
    endDate: "2024-12-31",
  },
  {
    id: 16,
    name: "Event_Hashtag 16",
    endDate: "2024-11-30",
  },
];

export default function MoreEventHashtagPage() {
  const [eventhashtags, setEventHashtags] = useState<EventHashtag[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<OrderType>("최신순");
  const [searchTerm, setSearchTerm] = useState("검색어");

  const fetchMoreEventHashtags = () => {
    setLoading(true);
    const newEventHashtags = dummyEventHashtags.slice(
      sliceNumber * 6,
      (sliceNumber + 1) * 6
    );
    setEventHashtags((prevEventHashtags) => [
      ...prevEventHashtags,
      ...newEventHashtags,
    ]);
    setHasMore(newEventHashtags.length > 0);
    setSliceNumber((prevSliceNumber) => prevSliceNumber + 1);
    setLoading(false);
  };

  useEffect(() => {
    setEventHashtags([]);
    setSliceNumber(0);
    setHasMore(true);
    setLoading(true);
    fetchMoreEventHashtags();
  }, []);

  return (
    <div className="p-4 m-8">
      <div className="p-4 mt-4 border-b-2 border-r-2 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">
            “#{searchTerm}” 와 관련된 "행사" 검색 결과입니다
          </h2>
        </div>
        <div className="flex justify-end mb-4 mx-10">
          <RadioButtons
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        </div>
        {loading && eventhashtags.length === 0 ? (
          <h4 className="text-center my-4">로딩 중...</h4>
        ) : eventhashtags.length === 0 ? (
          <p className="text-center my-4">행사 정보가 없습니다</p>
        ) : (
          <InfiniteScroll
            dataLength={eventhashtags.length}
            next={fetchMoreEventHashtags}
            hasMore={hasMore}
            loader={<h4 className="text-center my-4">로딩 중...</h4>}
            endMessage={
              <p className="text-center font-bold my-4">
                모든 행사를 불러왔습니다
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-10">
              {eventhashtags.map((eventhashtag) => (
                <MoreCard
                  key={eventhashtag.id}
                  name={eventhashtag.name}
                  image={eventhashtag.image}
                  endDate={eventhashtag.endDate}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
