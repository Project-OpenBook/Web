import { useSearchParams } from "react-router-dom";
import Profile from "./Profile";
import Bookmark from "./Bookmark";
import PurchaseDetails from "./PurchaseDetails";
import MyEvent from "./MyEvent";
import MyBooth from "./MyBooth";

interface MENU {
  [key: string]: {
    menu: string;
    view: React.ReactElement;
  };
}

const MENUS: MENU = {
  profile: {
    menu: "프로필",
    view: <Profile />,
  },
  bookmark: {
    menu: "북마크",
    view: <Bookmark />,
  },
  purchase: {
    menu: "구매 내역 확인",
    view: <PurchaseDetails />,
  },
  myevent: {
    menu: "내 행사 리스트",
    view: <MyEvent />,
  },
  mybooth: {
    menu: "내 부스 리스트",
    view: <MyBooth />,
  },
};

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSideMenu = searchParams.get("side") ?? Object.keys(MENUS)[0];

  const onClickSideBar = (sidebar: string) => {
    searchParams.set("side", sidebar);
    setSearchParams(searchParams);
  };

  return (
    <section className="flex flex-col w-full h-full p-2">
      <h2 className="border-b text-2xl font-bold p-2">마이페이지</h2>
      <div className="flex">
        <div className="flex flex-col gap-2 w-60 border-r">
          {Object.keys(MENUS).map((sidebar) => (
            <button onClick={() => onClickSideBar(sidebar)}>
              {MENUS[sidebar].menu}
            </button>
          ))}
        </div>
        <div className="p-8">{MENUS[currentSideMenu].view}</div>
      </div>
    </section>
  );
}
