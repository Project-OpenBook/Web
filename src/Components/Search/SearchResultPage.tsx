import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EventSearchSection from "./EventSearchSection";
import BoothSearchSection from "./BoothSearchSection";
import {
  fetchSearchEvents,
  fetchSearchBooths,
} from "../../Api/Util/SearchService";

export default function SearchResultPage() {
  const location = useLocation();
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
      image: string;
      endDate: string;
      tags?: string[];
    }[]
  >([]);

  useEffect(() => {
    if (searchQuery) {
      const loadSearchResults = async () => {
        try {
          const eventResults = await fetchSearchEvents(
            searchQuery,
            "eventName",
            "최신순",
            0
          );
          const boothResults = await fetchSearchBooths(
            searchQuery,
            "boothName",
            0,
            "최신순"
          );
          const eventTagResults = await fetchSearchEvents(
            searchQuery,
            "tagName",
            "최신순",
            0
          );
          const boothTagResults = await fetchSearchBooths(
            searchQuery,
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
              image: booth.mainImageUrl,
              endDate: booth.closeDate,
              tags: booth.tags,
            }))
          );
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      loadSearchResults();
    }
  }, [searchQuery]);

  return (
    <div className="p-4 border-b-2 border-r-2 shadow-md m-10">
      <header className="my-7 text-center">
        <h1 className="text-xl font-bold">
          "{searchQuery}"에 대한 검색 결과입니다.
        </h1>
      </header>
      <div className="flex flex-col items-center gap-8 w-full">
        <EventSearchSection
          title="행사"
          items={eventItems}
          buttonText="행사 더보기"
        />
        <BoothSearchSection
          title="부스"
          items={boothItems}
          buttonText="부스 더보기"
        />
        <EventSearchSection
          title={`#${searchQuery}_행사`}
          items={eventTagItems}
          buttonText="행사 더보기"
        />
        <BoothSearchSection
          title={`#${searchQuery}_부스`}
          items={boothTagItems}
          buttonText="부스 더보기"
        />
      </div>
    </div>
  );
}
