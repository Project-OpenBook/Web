import { ReactNode, useEffect, useRef, useState } from "react";
import tempBanner from "../Main/Banner/main_banner1.png";
import tempBannerSmall from "../Main/Banner/main_banner_small.png";
import ShowEventList from "./ShowEventList";

interface Props {
  state: "main" | "list";
}

const buttonStyle =
  "w-32 p-1 bg-blue-400 rounded-full text-black font-bold text-center";

enum MainListTab {
  recent = "최근 열린 행사",
  soonend = "종료 예정인 행사",
  popular = "인기있는 부스",
  recruiting = "부스 모집 중",
}

const listTabs = {
  [MainListTab.popular]: <ShowEventList title="인기있는 부스" eventList={[]} />,
  [MainListTab.recent]: <ShowEventList title="최근 열린 행사" eventList={[]} />,
  [MainListTab.recruiting]: (
    <ShowEventList title="부스 모집 중" eventList={[]} />
  ),
  [MainListTab.soonend]: (
    <ShowEventList title="종료 예정인 행사" eventList={[]} />
  ),
};

export default function MainPage({ state = "main" }: Props) {
  const [listTab, setListTab] = useState<MainListTab>(MainListTab.popular);

  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    if (ref.current) {
      io.observe(ref.current);
    }
  }, []);

  return (
    <section>
      <img
        className="w-full h-[600px] bg-white object-contain brightness-95 hidden lg:block"
        src={tempBanner}
        alt="메인 배너 캐러솔"
      />
      <img
        className="w-full h-[600px] bg-white object-cover brightness-95 lg:hidden"
        src={tempBannerSmall}
        alt="메인 배너 캐러솔"
      />
      {/* 🎈⏱🌎🎨🥇🎲📢🔔🥇 */}
      <div className="py-32 px-2 bg-blue-400 overflow-x-hidden">
        <div
          className="flex flex-col items-center w-full gap-10 opacity-0"
          ref={ref}
        >
          <h2 className="text-4xl font-bold text-white">부스 & 행사</h2>
          <div className="flex gap-2">
            {Object.keys(listTabs).map((tab) => (
              <button
                key={tab}
                className={`rounded-md px-2 py-1 text-white font-bold ${
                  listTab === tab && "bg-blue-300"
                }`}
                onClick={() => setListTab(tab as MainListTab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {listTabs[listTab]}
        </div>
      </div>
    </section>
  );
}
