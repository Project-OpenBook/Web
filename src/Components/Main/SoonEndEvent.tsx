import { useQuery } from "@tanstack/react-query";
import ShowEventList from "./ShowEventList";
import { fetchEvents } from "../../Api/Util/EventService";

export default function SoonEndEvent() {
  const { data } = useQuery({
    queryKey: ["main", "soonEnd"],
    queryFn: () => fetchEvents(0, "오래된순", "ongoing"),
  });

  const eventList = data ? data?.content : [];

  return <ShowEventList title="종료 예정인 행사" eventList={eventList} />;
}
