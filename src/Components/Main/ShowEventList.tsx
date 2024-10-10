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
  eventList: Array<Booth | Event>;
}

export default function ShowEventList({ eventList, title }: Props) {
  return (
    <div className="flex justify-center">
      <div>
        <Carousel
          className="h-72"
          list={[
            <EventCard
              endDate="123"
              id={1}
              image={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__0S6K2gnU_PqcvLpFU8SGYGyb7x2ZtoisQ&s"
              }
              name="행사"
            />,
            <EventCard
              endDate="123"
              id={1}
              image={
                "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/nZ7e2z99yxb9JzoE0AwQNDN1ft4.jpg"
              }
              name="행사"
            />,
            <EventCard
              endDate="123"
              id={1}
              image={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfvISbILWTN9TaMBJPhWKe9rWc6CwtRJZlWw&s"
              }
              name="행사"
            />,
            <EventCard
              endDate="123"
              id={1}
              image={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__0S6K2gnU_PqcvLpFU8SGYGyb7x2ZtoisQ&s"
              }
              name="행사"
            />,
            <EventCard
              endDate="123"
              id={1}
              image={
                "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/nZ7e2z99yxb9JzoE0AwQNDN1ft4.jpg"
              }
              name="행사"
            />,
            <EventCard
              endDate="123"
              id={1}
              image={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfvISbILWTN9TaMBJPhWKe9rWc6CwtRJZlWw&s"
              }
              name="행사"
            />,
          ]}
          dot={false}
          button={false}
        />
      </div>
    </div>
  );
}
