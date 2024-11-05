import { useSearchParams } from "react-router-dom";
import Profile from "./Profile";
import Bookmark from "./Bookmark";
import PurchaseDetails from "./PurchaseDetails";
import MyEvent from "./MyEvent";
import MyBooth from "./MyBooth";
import RequestLayout from "../Layout/RequestLayout";

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
    <RequestLayout header="마이페이지">
      <section className="flex flex-col w-full h-full p-2">
        <div className="flex">
          <div className="flex flex-col w-32 border-r">
            {Object.keys(MENUS).map((sidebar) => (
              <button
                onClick={() => onClickSideBar(sidebar)}
                className={`${
                  currentSideMenu === sidebar ? "font-bold" : ""
                } border-b py-6 hover:shadow-sm hover:bg-blue-50/20`}
              >
                {MENUS[sidebar].menu}
              </button>
            ))}
          </div>
          <div className="flex-1 p-8">{MENUS[currentSideMenu].view}</div>
        </div>
      </section>
    </RequestLayout>
  );
}
