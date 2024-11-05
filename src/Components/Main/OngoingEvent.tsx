import { useQuery } from "@tanstack/react-query";
import ShowEventList from "./ShowEventList";
import { fetchEvents } from "../../Api/Util/EventService";

export default function OngoingEvent() {
  const { data } = useQuery({
    queryKey: ["main", "ongoin"],
    queryFn: () => fetchEvents(0, "최신순", "recruiting"),
  });

  const eventList = data ? data?.content : [];

  return <ShowEventList title="부스 모집 중" eventList={eventList} />;
}
