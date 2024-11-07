import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcSearch, FcAbout } from "react-icons/fc";
import EventSearchSection from "./EventSearchSection";
import BoothSearchSection from "./BoothSearchSection";
import {
  fetchSearchEvents,
  fetchSearchBooths,
} from "../../Api/Util/SearchService";

export default function SearchResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  const [eventItems, setEventItems] = useState<
    {
      id: number;
      name: string;
      image: string;
      endDate: string;
      tags?: string[];
    }[]
  >([]);
  const [boothItems, setBoothItems] = useState<
    {
      id: number;
      name: string;
      eventName: string;
      image: string;
      endDate: string;
      tags?: string[];
    }[]
  >([]);
  const [eventTagItems, setEventTagItems] = useState<
    {
      id: number;
      name: string;
      image: string;
      endDate: string;
      tags?: string[];
    }[]
  >([]);
  const [boothTagItems, setBoothTagItems] = useState<
    {
      id: number;
      name: string;
      eventName: string;
      image: string;
      endDate: string;
      tags?: string[];
    }[]
  >([]);

  const [eventSliceNumber, setEventSliceNumber] = useState(0);
  const [eventNumberOfElements, setEventNumberOfElements] = useState(0);
  const [boothSliceNumber, setBoothSliceNumber] = useState(0);
  const [boothNumberOfElements, setBoothNumberOfElements] = useState(0);
  const [eventTagSliceNumber, setEventTagSliceNumber] = useState(0);
  const [eventTagNumberOfElements, setEventTagNumberOfElements] = useState(0);
  const [boothTagSliceNumber, setBoothTagSliceNumber] = useState(0);
  const [boothTagNumberOfElements, setBoothTagNumberOfElements] = useState(0);

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    const loadSearchResults = async () => {
      try {
        const queryToSend = searchQuery.trim() === "" ? "" : searchQuery;
        const eventResults = await fetchSearchEvents(
          queryToSend,
          "eventName",
          "최신순",
          0
        );
        const boothResults = await fetchSearchBooths(
          queryToSend,
          "boothName",
          0,
          "최신순"
        );
        const eventTagResults = await fetchSearchEvents(
          queryToSend,
          "tagName",
          "최신순",
          0
        );
        const boothTagResults = await fetchSearchBooths(
          queryToSend,
          "tagName",
          0,
          "최신순"
        );

        setEventItems(
          eventResults.content.slice(0, 4).map((event) => ({
            id: event.id,
            name: event.name,
            image: event.mainImageUrl,
            endDate: event.closeDate,
            tags: event.tags,
          }))
        );

        setBoothItems(
          boothResults.content.slice(0, 4).map((booth) => ({
            id: booth.id,
            name: booth.name,
            eventName: booth.eventName,
            image: booth.mainImageUrl,
            endDate: booth.closeDate,
            tags: booth.tags,
          }))
        );

        setEventTagItems(
          eventTagResults.content.slice(0, 4).map((event) => ({
            id: event.id,
            name: event.name,
            image: event.mainImageUrl,
            endDate: event.closeDate,
            tags: event.tags,
          }))
        );

        setBoothTagItems(
          boothTagResults.content.slice(0, 4).map((booth) => ({
            id: booth.id,
            name: booth.name,
            eventName: booth.eventName,
            image: booth.mainImageUrl,
            endDate: booth.closeDate,
            tags: booth.tags,
          }))
        );

        setEventSliceNumber(eventResults.sliceNumber);
        setEventNumberOfElements(eventResults.numberOfElements);
        setBoothSliceNumber(boothResults.sliceNumber);
        setBoothNumberOfElements(boothResults.numberOfElements);
        setEventTagSliceNumber(eventTagResults.sliceNumber);
        setEventTagNumberOfElements(eventTagResults.numberOfElements);
        setBoothTagSliceNumber(boothTagResults.sliceNumber);
        setBoothTagNumberOfElements(boothTagResults.numberOfElements);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    loadSearchResults();
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(
        `/SearchResultPage?query=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  const handleMoreEventClick = () => {
    navigate(`/MoreEventPage?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleMoreBoothClick = () => {
    navigate(`/MoreBoothPage?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleMoreEventHashtagClick = () => {
    navigate(`/MoreEventHashtagPage?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleMoreBoothHashtagClick = () => {
    navigate(`/MoreBoothHashtagPage?query=${encodeURIComponent(searchQuery)}`);
  };

  const isAllSectionsEmpty =
    eventNumberOfElements === 0 &&
    boothNumberOfElements === 0 &&
    eventTagNumberOfElements === 0 &&
    boothTagNumberOfElements === 0;

  return (
    <div className="p-4 border-b-2 border-r-2 shadow-md m-10">
      <header className="my-7 text-center">
        <form
          className="mb-4 w-full max-w-4xl mx-auto relative"
          onSubmit={handleSearchSubmit}
        >
          <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색어를 입력해주세요."
            className="w-full p-2 pl-10 border border-gray-300 rounded-full"
          />
        </form>
        <h1 className="text-xl font-bold">
          "{searchQuery || "전체"}"에 대한 검색 결과입니다.
        </h1>
      </header>

      {isAllSectionsEmpty ? (
        <div className="flex flex-col items-center justify-center h-80">
          <FcAbout className="text-4xl mb-2" />
          <p className="text-gray-500 text-lg font-bold">
            해당하는 데이터가 없습니다.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-screen-xl mx-auto">
          <div className={`flex flex-col items-start gap-8 w-full mb-10`}>
            <EventSearchSection
              title="행사"
              items={eventItems}
              buttonText="more +"
              sliceNumber={eventSliceNumber}
              numberOfElements={eventNumberOfElements}
              onMoreClick={handleMoreEventClick}
            />
            <hr className="w-full border-t-2 border-gray-400" />
            <BoothSearchSection
              title="부스"
              items={boothItems}
              buttonText="more +"
              sliceNumber={boothSliceNumber}
              numberOfElements={boothNumberOfElements}
              onMoreClick={handleMoreBoothClick}
            />
            <hr className="w-full border-t-2 border-gray-400" />
            <EventSearchSection
              title={`#${searchQuery}_행사`}
              items={eventTagItems}
              buttonText="more +"
              sliceNumber={eventTagSliceNumber}
              numberOfElements={eventTagNumberOfElements}
              onMoreClick={handleMoreEventHashtagClick}
            />
            <hr className="w-full border-t-2 border-gray-400" />
            <BoothSearchSection
              title={`#${searchQuery}_부스`}
              items={boothTagItems}
              buttonText="more +"
              sliceNumber={boothTagSliceNumber}
              numberOfElements={boothTagNumberOfElements}
              onMoreClick={handleMoreBoothHashtagClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
