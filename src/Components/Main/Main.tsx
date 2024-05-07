import { Link } from "react-router-dom";
import tempBanner from "../../logo.svg";
import ListPage from "./List";
import ShowEventList from "./ShowEventList";

interface Props {
  state: "main" | "list";
}

const buttonStyle =
  "w-32 p-1 bg-blue-400 rounded-full text-black font-bold text-center";

export default function MainPage({ state = "main" }: Props) {
  return (
    <section>
      <img
        className="w-full h-80 bg-slate-600"
        src={tempBanner}
        alt="메인 배너 캐러솔"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-10">
        <ShowEventList title="최근 열린 행사" eventList={[]} />
        <ShowEventList title="종료 예정인 행사" eventList={[]} />
        <ShowEventList title="인기있는 부스" eventList={[]} />
        <ShowEventList title="부스 모집 중" eventList={[]} />
      </div>

      {/* <div>
        
        <div className="flex w-full justify-center p-20">
          <div className="flex w-full max-w-screen-md justify-between">
            <Link to={"/list"} className={buttonStyle}>
              부스 목록
            </Link>
            <Link to={"/"} className={buttonStyle}>
              부스 등록
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {state === "list" && <ListPage />}
      </div> */}
    </section>
  );
}
