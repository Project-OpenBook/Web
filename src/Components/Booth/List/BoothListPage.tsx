import React, { useState, useEffect } from "react";
import BoothCard from "./BoothCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Booth, fetchBooths } from "../../../Api/Util/BoothService";
import { getAccessToken } from "../../../Api/Util/token";

export default function BoothListPage() {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMoreBooths = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const response = await fetchBooths(sliceNumber);
      if (sliceNumber === 0) {
        setBooths(response.content);
      } else {
        setBooths((prevBooths) => [...prevBooths, ...response.content]);
      }
      setHasMore(response.hasNext);
      setSliceNumber((prevSliceNumber) => prevSliceNumber + 1);
    } catch (error) {
      console.error("Error fetching booths:", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBooths([]);
    setSliceNumber(0);
    setHasMore(true);
    setLoading(true);
    fetchMoreBooths();
  }, []);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  if (!getAccessToken()) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>로그인 후 이용해주세요.</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>데이터를 가져오는데 문제가 발생했습니다.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 m-8">
      <div className="p-4 mt-4 border-b-2 border-r-2 shadow-md">
        <div className="flex items-center mt-3 mx-10">
          <form className="mb-4 w-full flex" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="부스 검색"
              className="flex-grow p-2 border border-gray-300 rounded-l"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-r"
            >
              검색
            </button>
          </form>
        </div>
        {loading && booths.length === 0 ? (
          <h4 className="text-center my-4">로딩 중...</h4>
        ) : booths.length === 0 ? (
          <p className="text-center my-4">부스 정보가 없습니다</p>
        ) : (
          <InfiniteScroll
            dataLength={booths.length}
            next={fetchMoreBooths}
            hasMore={hasMore}
            loader={<h4 className="text-center my-4">로딩 중...</h4>}
            endMessage={
              <p className="text-center font-bold my-4">
                모든 부스를 불러왔습니다
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
              {booths.map((booth) => (
                <BoothCard
                  key={booth.id}
                  id={booth.id}
                  name={booth.name}
                  eventName={booth.eventName}
                  image={booth.mainImageUrl}
                  endDate={booth.closeDate}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
