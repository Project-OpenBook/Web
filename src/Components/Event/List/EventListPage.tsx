import React, { useState } from "react";
import Tabs from "./Tabs";
import OngoingEvents from "./OngoingEvents";
import RecruitingEvents from "./RecruitingEvents";
import FinishedEvents from "./FinishedEvents";
import RadioButtons from "./RadioButtons";
import { Progress } from "./types";
import { getAccessToken } from "../../../Api/Util/token";
import { FaRegCalendarCheck } from "react-icons/fa6";

export default function EventListPage() {
  const [selectedTab, setSelectedTab] = useState<Progress>("진행중");
  const [sortOrder, setSortOrder] = useState("최신순");

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
            key={`${selectedTab}-${sortOrder}`}
            sortOrder={sortOrder}
          />
        );
      default:
        return null;
    }
  };

  if (!getAccessToken()) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>로그인 후 이용해주세요.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 m-2">
      <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <div className="border-b-2 border-r-2 shadow-md">
        <div className="p-4">
          <form
            className="flex justify-between items-center mx-4 my-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {selectedTab === "종료된 행사" && (
              <div className="flex justify-between w-full">
                <label htmlFor="search" className="sr-only">
                  특정 기간 내 행사 찾기
                </label>
                <div className="flex items-center w-5/6">
                  <FaRegCalendarCheck className="mr-2 w-6 h-6" />
                  <input
                    type="text"
                    id="search"
                    placeholder="특정 기간 내 행사 찾기"
                    className="border p-2 rounded w-full"
                  />
                </div>
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
