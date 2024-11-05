import { useNavigate } from "react-router-dom";
import Carousel from "../Util/Carousel";

interface Props {
  boothCount: number;
  layoutImageUrls: Array<string>;
  eventId: string | number;
}
export default function BoothInEventInfo({
  boothCount,
  layoutImageUrls,
  eventId,
}: Props) {
  const navi = useNavigate();

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between w-full items-center">
        <span>등록된 부스 : {boothCount}개</span>
        <button
          className="bg-blue-500 rounded-md p-2 text-white font-bold"
          onClick={() => {
            navi(`/BoothListPage?eventId=${eventId}`);
          }}
        >
          부스 목록
        </button>
      </div>
      <Carousel
        className="h-[300x]"
        list={layoutImageUrls.map((url) => (
          <img className="w-full h-96" src={url} alt="layout" />
        ))}
        dot={layoutImageUrls.length !== 1}
        button={layoutImageUrls.length !== 1}
      />
    </div>
  );
}
