import { useQuery } from "@tanstack/react-query";
import ShowEventList from "./ShowEventList";
import { fetchEvents } from "../../Api/Util/EventService";

export default function RecentEvent() {
  const { data } = useQuery({
    queryKey: ["main", "recentevent"],
    queryFn: () => fetchEvents(0, "최신순", "ongoing"),
  });

  const eventList = data ? data?.content : [];

  return <ShowEventList title="인기있는 부스" eventList={eventList} />;
}
