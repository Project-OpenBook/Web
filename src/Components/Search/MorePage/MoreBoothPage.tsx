import React, { useState, useEffect } from "react";
import MoreCard from "./MoreCard";
import InfiniteScroll from "react-infinite-scroll-component";
import RadioButtons from "../../Event/List/RadioButtons";
import { OrderType } from "../../../Api/Util/BoothService"; // 아직 검색 결과 페이지 데이터 패칭 진행이 안되서 임시로 BoothService에서 데이터 타입 받아온 것

interface Booth {
  id: number;
  name: string;
  image?: string;
  endDate: string;
}

const dummyBooths: Booth[] = [
  {
    id: 1,
    name: "Booth 1",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Booth 2",
    endDate: "2024-11-30",
  },
  {
    id: 3,
    name: "Booth 3",
    endDate: "2024-12-31",
  },
  {
    id: 4,
    name: "Booth 4",
    endDate: "2024-11-30",
  },
  {
    id: 5,
    name: "Booth 5",
    endDate: "2024-12-31",
  },
  {
    id: 6,
    name: "Booth 6",
    endDate: "2024-11-30",
  },
  {
    id: 7,
    name: "Booth 7",
    endDate: "2024-12-31",
  },
  {
    id: 8,
    name: "Booth 8",
    endDate: "2024-11-30",
  },
  {
    id: 9,
    name: "Booth 9",
    endDate: "2024-12-31",
  },
  {
    id: 10,
    name: "Booth 10",
    endDate: "2024-11-30",
  },
  {
    id: 11,
    name: "Booth 11",
    endDate: "2024-12-31",
  },
  {
    id: 12,
    name: "Booth 12",
    endDate: "2024-11-30",
  },
  {
    id: 13,
    name: "Booth 13",
    endDate: "2024-12-31",
  },
  {
    id: 14,
    name: "Booth 14",
    endDate: "2024-11-30",
  },
  {
    id: 15,
    name: "Booth 15",
    endDate: "2024-12-31",
  },
  {
    id: 16,
    name: "Booth 16",
    endDate: "2024-11-30",
  },
];

export default function MoreBoothPage() {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<OrderType>("최신순");
  const [searchTerm, setSearchTerm] = useState("검색어");

  const fetchMoreBooths = () => {
    setLoading(true);
    const newBooths = dummyBooths.slice(sliceNumber * 6, (sliceNumber + 1) * 6);
    setBooths((prevBooths) => [...prevBooths, ...newBooths]);
    setHasMore(newBooths.length > 0);
    setSliceNumber((prevSliceNumber) => prevSliceNumber + 1);
    setLoading(false);
  };

  useEffect(() => {
    setBooths([]);
    setSliceNumber(0);
    setHasMore(true);
    setLoading(true);
    fetchMoreBooths();
  }, []);

  return (
    <div className="p-4 m-8">
      <div className="p-4 mt-4 border-b-2 border-r-2 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold">
            “{searchTerm}” 와 관련된 "부스" 검색 결과입니다
          </h2>
        </div>
        <div className="flex justify-end mb-4 mx-10">
          <RadioButtons
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        </div>
        {loading && booths.length === 0 ? (
          <h4 className="text-center my-4">로딩 중...</h4>
        ) : booths.length === 0 ? (
          <p className="text-center my-4">행사 정보가 없습니다</p>
        ) : (
          <InfiniteScroll
            dataLength={booths.length}
            next={fetchMoreBooths}
            hasMore={hasMore}
            loader={<h4 className="text-center my-4">로딩 중...</h4>}
            endMessage={
              <p className="text-center font-bold my-4">
                모든 행사를 불러왔습니다
              </p>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
              {booths.map((booth) => (
                <MoreCard
                  key={booth.id}
                  name={booth.name}
                  image={booth.image}
                  endDate={booth.endDate}
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
