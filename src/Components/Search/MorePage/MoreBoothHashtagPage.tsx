import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MoreBoothCard from "./MoreBoothCard";
import RadioButtons from "../../Event/List/RadioButtons";
import {
  fetchSearchBooths,
  SearchBooth,
  OrderType,
} from "../../../Api/Util/SearchService";
import { useLocation } from "react-router-dom";

export default function MoreBoothHashtagPage() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";
  const displayQuery = searchQuery.trim() === "" ? "전체" : searchQuery;

  const [boothHashtags, setBoothHashtags] = useState<SearchBooth[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortOrder, setSortOrder] = useState<OrderType>("최신순");

  const fetchMoreBoothHashtags = async (reset: boolean = false) => {
    try {
      setLoading(true);
      setIsError(false);
      const newSliceNumber = reset ? 0 : sliceNumber;
      const response = await fetchSearchBooths(
        searchQuery,
        "tagName",
        newSliceNumber,
        sortOrder
      );
      setBoothHashtags((prevBoothHashtags) =>
        reset ? response.content : [...prevBoothHashtags, ...response.content]
      );
      setHasMore(response.hasNext);
      setSliceNumber(newSliceNumber + 1);
    } catch (error) {
      console.error("Error loading booth hashtags", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreBoothHashtags(true);
  }, [sortOrder, searchQuery]);

  if (isError) {
    return <div>데이터를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return (
    <div className="p-4 m-8 border-b-2 border-r-2 shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        “#{displayQuery}” 와 관련된 부스
      </h2>
      <div className="flex justify-end mb-4">
        <RadioButtons sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
      </div>
      {loading && boothHashtags.length === 0 ? (
        <h4 className="text-center my-4">로딩 중...</h4>
      ) : (
        <InfiniteScroll
          dataLength={boothHashtags.length}
          next={() => fetchMoreBoothHashtags()}
          hasMore={hasMore}
          loader={<h4 className="text-center my-4">로딩 중...</h4>}
          endMessage={
            <p className="text-center font-bold my-4">
              모든 부스를 불러왔습니다
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {boothHashtags.map((boothHashtag) => (
              <MoreBoothCard
                key={boothHashtag.id}
                id={boothHashtag.id}
                name={boothHashtag.name}
                eventName={boothHashtag.eventName}
                image={boothHashtag.mainImageUrl}
                endDate={boothHashtag.closeDate}
                tags={boothHashtag.tags}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
