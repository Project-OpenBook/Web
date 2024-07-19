import React, { FormEvent } from "react";
import SearchSection from "./SearchSection";

export default function SearchResultPage() {
  const searchQuery = "검색어";
  const events = [
    { title: "행사명1", endDate: "2024.09.01" },
    { title: "행사명2", endDate: "2024.09.02" },
    { title: "행사명3", endDate: "2024.09.03" },
    { title: "행사명4", endDate: "2024.09.04" },
  ];
  const booths = [
    { title: "부스명1", endDate: "2024.10.01" },
    { title: "부스명2", endDate: "2024.10.02" },
    { title: "부스명3", endDate: "2024.10.03" },
    { title: "부스명4", endDate: "2024.10.04" },
  ];
  const eventhashtags = [
    { title: "행사명1", endDate: "2024.11.01" },
    { title: "행사명2", endDate: "2024.11.02" },
    { title: "행사명3", endDate: "2024.11.03" },
    { title: "행사명4", endDate: "2024.11.04" },
  ];
  const boothhashtags = [
    { title: "부스명1", endDate: "2024.12.01" },
    { title: "부스명2", endDate: "2024.12.02" },
    { title: "부스명3", endDate: "2024.12.03" },
    { title: "부스명4", endDate: "2024.12.04" },
  ];

  return (
    <div className="p-4 border-b-2 border-r-2 shadow-md m-10">
      <header className="mb-6 text-center">
        <h1 className="text-xl font-bold">
          "{searchQuery}"에 대한 검색 결과입니다.
        </h1>
      </header>
      <div className="flex flex-col items-center gap-8 w-full">
        <SearchSection title="행사" items={events} buttonText="행사 더보기" />
        <SearchSection title="부스" items={booths} buttonText="부스 더보기" />
        <SearchSection
          title={`#${searchQuery}_행사`}
          items={eventhashtags}
          buttonText="행사 더보기"
        />
        <SearchSection
          title={`#${searchQuery}_부스`}
          items={boothhashtags}
          buttonText="부스 더보기"
        />
      </div>
    </div>
  );
}
