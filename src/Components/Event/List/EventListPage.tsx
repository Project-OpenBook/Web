import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Tabs from "./Tabs";
import OngoingEvents from "./OngoingEvents";
import RecruitingEvents from "./RecruitingEvents";
import FinishedEvents from "./FinishedEvents";
import RadioButtons from "./RadioButtons";
import DateRangeFilter from "./DateRangeFilter";
import { Progress } from "./types";
import { OrderType } from "../../../Api/Util/EventService";
import { FcInfo } from "react-icons/fc";

export default function EventListPage() {
  const [selectedTab, setSelectedTab] = useState<Progress>("진행중");
  const [sortOrder, setSortOrder] = useState<OrderType>("최신순");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam &&
      (tabParam === "모집중" ||
        tabParam === "진행중" ||
        tabParam === "종료된 행사")
    ) {
      setSelectedTab(tabParam as Progress);
    }
  }, [searchParams]);

  const handleDateFilter = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleTabChange = (tab: Progress) => {
    setSelectedTab(tab);
    setSortOrder("최신순");
    setStartDate("");
    setEndDate("");
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "진행중":
        return (
          <OngoingEvents
            key={`${selectedTab}-${sortOrder}`}
            sortOrder={sortOrder}
          />
        );
      case "모집중":
        return (
          <RecruitingEvents
            key={`${selectedTab}-${sortOrder}`}
            sortOrder={sortOrder}
          />
        );
      case "종료된 행사":
        return (
          <FinishedEvents
            key={`${selectedTab}-${sortOrder}-${startDate}-${endDate}`}
            sortOrder={sortOrder}
            startDate={startDate}
            endDate={endDate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 m-2">
      <Tabs selectedTab={selectedTab} onTabChange={handleTabChange} />
      <div className="border-b-2 border-r-2 shadow-md">
        <div className="p-4">
          <form
            className="flex justify-between items-center mx-4 my-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {selectedTab === "종료된 행사" && (
              <div className="flex justify-between w-full">
                <DateRangeFilter onFilter={handleDateFilter} />
                <RadioButtons
                  sortOrder={sortOrder}
                  onSortOrderChange={setSortOrder}
                />
              </div>
            )}
            {selectedTab === "모집중" && (
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <FcInfo className="mr-2 text-xl" />
                  <p className="text-left font-bold underline decoration-wavy decoration-sky-500 underline-offset-4">
                    부스 등록은 행사 상세 페이지에서 가능합니다.
                  </p>
                </div>
                <RadioButtons
                  sortOrder={sortOrder}
                  onSortOrderChange={setSortOrder}
                />
              </div>
            )}
            {selectedTab === "진행중" && (
              <div className="flex justify-end w-full">
                <RadioButtons
                  sortOrder={sortOrder}
                  onSortOrderChange={setSortOrder}
                />
              </div>
            )}
          </form>
          <div className="mx-4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
