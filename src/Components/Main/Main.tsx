import { useCallback, useEffect, useRef, useState } from "react";
import tempBanner from "../Main/Banner/main_banner1.png";
import tempBannerSmall from "../Main/Banner/main_banner_small.png";
import ShowEventList from "./ShowEventList";
import RecentEvent from "./RecentEvent";
import OngoingEvent from "./OngoingEvent";
import SoonEndEvent from "./SoonEndEvent";
import MainBanner from "./Banner/MainBanner";

interface Props {
  state: "main" | "list";
}

const buttonStyle =
  "w-32 p-1 bg-blue-400 rounded-full text-black font-bold text-center";

enum MainListTab {
  recent = "최근 열린 행사",
  soonend = "종료 예정인 행사",
  recruiting = "부스 모집 중",
}

const listTabs = {
  [MainListTab.recent]: <RecentEvent />,
  [MainListTab.recruiting]: <OngoingEvent />,
  [MainListTab.soonend]: <SoonEndEvent />,
};

export default function MainPage({ state = "main" }: Props) {
  const [listTab, setListTab] = useState<MainListTab>(MainListTab.recruiting);
  const [bannerIndex, setBannerIndex] = useState(0);
  const ref = useRef(null);
  const bannerRef = useRef<any>(null);
  const bannerRef2 = useRef<any>(null);

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

  const resizeBanner = useCallback(() => {
    const h = window.innerHeight;
    const MIN_HEADER_HEIGHT = 100;

    if (bannerRef.current)
      bannerRef.current.style.height = h - MIN_HEADER_HEIGHT + "px";
    if (bannerRef2.current)
      bannerRef2.current.style.height = h - MIN_HEADER_HEIGHT + "px";
  }, []);

  useEffect(() => {
    resizeBanner();
    window.addEventListener("resize", resizeBanner);

    return () => {
      window.removeEventListener("resize", resizeBanner);
    };
  }, [resizeBanner]);

  const bannerBackgrounds: {
    [key: number] : string;
  } = {
    0: "bg-[#333bb0]",
    1: "bg-[#057e59]",
    2: "bg-[#95e1fd]"
  };

  return (
    <section className={`${bannerBackgrounds[bannerIndex] ?? "bg-blue-300"}`}>
      {/* <img
        className="w-full h-[600px] bg-white object-contain brightness-95 hidden lg:block"
        ref={bannerRef}
        src={tempBanner}
        alt="메인 배너 캐러솔"
      />
      <img
        className="w-full h-[600px] bg-white object-cover brightness-95 lg:hidden"
        ref={bannerRef2}
        src={tempBannerSmall}
        alt="메인 배너 캐러솔"
      /> */}
      <MainBanner bannerIndex={bannerIndex} setBannerIndex={setBannerIndex} />
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
          <div className="flex w-full">{listTabs[listTab]}</div>
        </div>
      </div>
    </section>
  );
}
