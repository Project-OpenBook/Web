import { FormEvent } from "react";
import EventInfo from "./EventInfo";
import BoothInEventInfo from "./BoothsInEventInfo";
import ReviewList from "./EventReviewList";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getAccessToken } from "../../Api/Util/token";
import { IoIosSettings } from "react-icons/io";
import KakaoMap from "./KakaoMap";
import EventNotice from "./EventNotice";
import { useAuth } from "../../Hooks/useAuth";
import BookmarkIcon from "../Bookmark/BookmarkIcon";

export interface Event {
  id: number;
  name: string;
  mainImageUrl: string;
  location: string;
  description: string;
  openDate: string;
  closeDate: string;
  layoutImageUrls: Array<string>;
  boothCount: number;
  // isUserManager: boolean;
  eventManager: {
    id: number;
    nickname: string;
    role: string;
  };
  tags?: string[];
}

export const eventFetcher = (id: string | undefined) => {
  if (!id) return Promise.reject();
  return fetch(`http://52.79.91.214:8080/events/${id}`, {
    method: "GET",
  }).then((response) => {
    if (response.ok) return response.json();
    else throw new Error();
  });
};

export default function EventDetailPage() {
  const { id } = useParams();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const { data, isError, isLoading } = useQuery<Event>({
    queryKey: ["event", id],
    enabled: !!id,
    queryFn: () => eventFetcher(id),
    retry: 1,
  });

  const { id: userId } = useAuth();

  if (isError) {
    alert("존재하지 않는 행사입니다.");
    window.history.back();
    return <></>;
  }

  if (!data) {
    return <></>;
  }

  const {
    boothCount,
    closeDate,
    description,
    id: eventId,
    eventManager,
    layoutImageUrls,
    location,
    mainImageUrl,
    name,
    openDate,
  } = data;

  const isRecruiting = new Date() < new Date(data.openDate);

  return (
    <div className="flex min-h-screen justify-center my-10" onSubmit={onSubmit}>
      <div className="w-full max-w-screen-lg shadow-md h-full p-2">
        <BookmarkIcon id={eventId} type="EVENT" className="flex justify-end" />
        <h2 className="text-2xl font-extrabold text-center pt-10">{name}</h2>
        <div className="flex flex-col mt-5">
          <div className="w-full px-10 py-4 flex flex-col gap-5">
            {isRecruiting && userId && (
              <Link
                to={"/boothRegist"}
                className="flex gap-2 items-center ml-auto p-2 rounded-md bg-green-500 text-white"
                state={{ name, eventId }}
              >
                부스 신청
              </Link>
            )}

            {eventManager.id === userId && (
              <Link
                to={"manage"}
                className="flex gap-2 items-center ml-auto p-2 rounded-md bg-orange-500 text-white"
              >
                <IoIosSettings size={20} />
                행사 관리
              </Link>
            )}

            <EventInfo
              mainImageUrl={mainImageUrl}
              closeDate={closeDate}
              openDate={openDate}
              description={description}
              location={location}
            />

            <EventNotice eventId={eventId} />

            <BoothInEventInfo
              boothCount={boothCount}
              layoutImageUrls={layoutImageUrls}
            />

            <KakaoMap location={location} />

            <ReviewList id={eventId} type="events" />
          </div>
        </div>
      </div>
    </div>
  );
}
