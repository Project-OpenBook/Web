import tempBanner from "../../logo.svg";
import Carousel from "../Util/Carousel";

export type Booth = {
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
      <div className="p-10 max-w-[48rem]">
        <div className=" rounded-t-md h-14 font-semibold text-2xl text-black flex items-center justify-start">
          {title}
        </div>
        <Carousel
          className="h-72 bg-sky-50 rounded-lg"
          imgs={[
            "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/nZ7e2z99yxb9JzoE0AwQNDN1ft4.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfvISbILWTN9TaMBJPhWKe9rWc6CwtRJZlWw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__0S6K2gnU_PqcvLpFU8SGYGyb7x2ZtoisQ&s",
            "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/nZ7e2z99yxb9JzoE0AwQNDN1ft4.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfvISbILWTN9TaMBJPhWKe9rWc6CwtRJZlWw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__0S6K2gnU_PqcvLpFU8SGYGyb7x2ZtoisQ&s",
          ]}
        />
      </div>
    </div>
  );
}
