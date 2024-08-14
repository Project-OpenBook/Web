import React, { useState } from "react";
import Tabs from "./Tabs";
import OngoingEvents from "./OngoingEvents";
import RecruitingEvents from "./RecruitingEvents";
import FinishedEvents from "./FinishedEvents";
import RadioButtons from "./RadioButtons";
import DateRangeFilter from "./DateRangeFilter";
import { Progress } from "./types";
import { OrderType } from "../../../Api/Util/EventService";

export default function EventListPage() {
  const [selectedTab, setSelectedTab] = useState<Progress>("진행중");
  const [sortOrder, setSortOrder] = useState<OrderType>("최신순");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleDateFilter = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleTabChange = (tab: Progress) => {
    setSelectedTab(tab);
    setSortOrder("최신순");
    setStartDate(null);
    setEndDate(null);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "진행중":
        return <OngoingEvents sortOrder={sortOrder} />;
      case "모집중":
        return <RecruitingEvents sortOrder={sortOrder} />;
      case "종료된 행사":
        return (
          <FinishedEvents
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
            {selectedTab !== "종료된 행사" && (
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
