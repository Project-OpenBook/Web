import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  clickedMenuIndex: number;
}

export default function ManageMenu({ clickedMenuIndex }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const MENUS = [
    {
      label: "신청 관리",
      onClick: () => {
        searchParams.set("type", "aprove");
        setSearchParams(searchParams);
      },
    },
    {
      label: "수정",
      onClick: () => {
        searchParams.set("type", "edit");
        setSearchParams(searchParams);
      },
    },
  ];

  return (
    <div className="fixed top-[20%] left-0">
      <div
        className={`flex flex-col gap-4 border bg-white p-2 text-center w-32 transform transition-transform duration-300 ${
          !isOpen && "-translate-x-32"
        }`}
      >
        <span className="border-b-2 pb-1">관리자 메뉴</span>
        {MENUS.map((menu, index) => (
          <button
            key={menu.label}
            onClick={menu.onClick}
            className={`${clickedMenuIndex === index && "font-bold"}`}
          >
            {menu.label}
          </button>
        ))}
      </div>
      <div
        className={`absolute top-2 -right-3 border rounded-full w-6 h-6 text-xs flex items-center justify-center bg-white cursor-pointer transform transition-transform duration-300 ${
          !isOpen && "-translate-x-[7.8rem]"
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "<" : ">"}
      </div>
    </div>
  );
}
