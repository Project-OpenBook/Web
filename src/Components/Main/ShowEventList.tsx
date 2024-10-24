import { Event } from "../../Api/Util/EventService";
import tempBanner from "../../logo.svg";
import EventCard from "../Event/List/EventCard";
import Carousel from "../Util/Carousel";

type Booth = {
  images: string[];
  title: string;
  id: string;
};

export type event = {};

interface Props {
  title: string;
  eventList: Event[];
}

export default function ShowEventList({ eventList, title }: Props) {
  const elementList = eventList.map((event) => (
    <EventCard
      endDate={event.recruitEndDate}
      id={event.id}
      image={event.mainImageUrl}
      name={event.name}
      key={event.id}
    />
  ));
  return (
    <div className="flex justify-center">
      <div>
        <Carousel
          className="h-72"
          list={[...elementList]}
          dot={false}
          button={false}
        />
      </div>
    </div>
  );
}
