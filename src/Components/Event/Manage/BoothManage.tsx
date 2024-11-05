import { useSearchParams } from "react-router-dom";
import BoothAproval from "./BoothAproval";
import ManageMenu from "./ManageMenu";

const MENU_CONTENT_MAP: {
  [key: string]: {
    title: string;
    content: React.ReactNode;
    index: number;
  };
} = {
  aprove: {
    title: "부스 신청 현황",
    content: <BoothAproval />,
    index: 0,
  },
  edit: {
    title: "행사 수정",
    content: <></>,
    index: 1,
  },
};

export default function BoothManage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") ?? "aprove";
  const content = MENU_CONTENT_MAP[type];

  return (
    <section
      className="flex min-h-screen justify-center my-10"
      onSubmit={() => {}}
    >
      <div className="w-full max-w-screen-lg border h-full p-10">
        <div className="flex items-center gap-20 border-b p-7">
          <h2 className="font-extrabold text-4xl">{content.title}</h2>
        </div>
        <div className="flex">{type === "edit" ? <></> : content.content}</div>
      </div>

      <ManageMenu clickedMenuIndex={content.index} />
    </section>
  );
}
