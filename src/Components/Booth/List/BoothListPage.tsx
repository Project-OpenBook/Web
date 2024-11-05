import React, { useState, useEffect } from "react";
import BoothCard from "./BoothCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Booth, fetchBooths, OrderType } from "../../../Api/Util/BoothService";
// import { getAccessToken } from "../../../Api/Util/token";
import RadioButtons from "../../Event/List/RadioButtons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Event } from "../../../Api/Util/EventService";
import { eventFetcher } from "../../Event/EventDetail";
import { IoTrashBinSharp } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";

export default function BoothListPage() {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortOrder, setSortOrder] = useState<OrderType>("최신순");
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const navi = useNavigate();

  const { data } = useQuery<Event>({
    queryKey: ["event", eventId],
    enabled: !!eventId,
    queryFn: () => eventFetcher(eventId ?? undefined),
    retry: 1,
  });

  const fetchMoreBooths = async (reset = false) => {
    try {
      setLoading(true);
      setIsError(false);
      const newSliceNumber = reset ? 0 : sliceNumber;
      const response = await fetchBooths(newSliceNumber, sortOrder, eventId);
      setBooths((prevBooths) =>
        reset ? response.content : [...prevBooths, ...response.content]
      );
      setHasMore(response.hasNext);
      setSliceNumber(newSliceNumber + 1);
    } catch (error) {
      console.error("Error fetching booths:", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreBooths(true);
  }, [sortOrder, eventId]);

  // if (!getAccessToken()) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <h2>로그인 후 이용해주세요.</h2>
  //     </div>
  //   );
  // }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>데이터를 가져오는데 문제가 발생했습니다.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 m-3">
      <div className="p-4 mt-4 border-b-2 border-r-2 shadow-md">
        {data && (
          <div className="flex items-center w-fit bg-blue-50 p-2 rounded-md">
            <span className="underline underline-offset-4">{data.name}</span>의
            부스 목록
            <span className="ml-2">
              <CiCircleRemove
                size={20}
                onClick={() => {
                  navi("/BoothListPage");
                }}
              />
            </span>
          </div>
        )}
        <div className="flex justify-end my-4 mr-10">
          <RadioButtons
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        </div>
        {loading && booths.length === 0 ? (
          <h4 className="text-center my-4">로딩 중...</h4>
        ) : booths.length === 0 ? (
          <p className="text-center my-4">부스 정보가 없습니다</p>
        ) : (
          <InfiniteScroll
            dataLength={booths.length}
            next={() => fetchMoreBooths(false)}
            hasMore={hasMore}
            loader={<h4 className="text-center my-4">로딩 중...</h4>}
            endMessage={
              <p className="text-center font-bold my-4">
                모든 부스를 불러왔습니다
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-4">
              {booths.map((booth) => (
                <BoothCard
                  key={booth.id}
                  id={booth.id}
                  name={booth.name}
                  eventName={booth.eventName}
                  image={booth.mainImageUrl}
                  endDate={booth.closeDate}
                  tags={booth.tags}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
