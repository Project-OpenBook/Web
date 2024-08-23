import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidBellRing } from "react-icons/bi";
import { MdFestival, MdOutlineFestival } from "react-icons/md";
import { BsClipboard2PlusFill } from "react-icons/bs";
import { FcSearch, FcReadingEbook } from "react-icons/fc";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import logo from "../NavBar/logo_wide.png";
import { getAccessToken, removeAccessToken } from "../../Api/Util/token";
import AlarmModal from "../Alarm/AlarmModal";
import AlarmPage from "../Alarm/AlarmPage";
import { useAuth } from "../../Hooks/useAuth";
import { MAIN_BLUE } from "../../Constants/Color";

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [showBoothDropdown, setShowBoothDropdown] = useState(false);
  const { role, nickname, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    removeAccessToken();
    window.location.reload();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(
        `/SearchResultPage?query=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  const NavlinkClass =
    "hover:border-b-4 hover:border-blue-300 cursor-pointer mt-10 px-20 py-2 border-2 rounded-full border-white bg-white";

  const DropdownClass =
    "absolute z-50 bg-white shadow-lg py-4 rounded-lg border border-gray-200 w-96 grid grid-cols-2 gap-0 text-sm transform translate-x-[-20%] translate-y-32";

  const DropdownItemClass =
    "flex flex-col items-center cursor-pointer p-4 hover:bg-gray-100 h-full";

  const LastDropdownItemClass =
    "flex flex-col items-center cursor-pointer p-4 hover:bg-gray-100 h-full";

  const DividerClass = "border-r border-gray-300 h-full";

  const toggleEventDropdown = () => {
    setShowEventDropdown(!showEventDropdown);
    if (showBoothDropdown) {
      setShowBoothDropdown(false);
    }
  };

  const toggleBoothDropdown = () => {
    setShowBoothDropdown(!showBoothDropdown);
    if (showEventDropdown) {
      setShowEventDropdown(false);
    }
  };

  const closeDropdown = () => {
    setShowEventDropdown(false);
    setShowBoothDropdown(false);
  };

  return (
    <div className="px-2 mb-2 bg-gradient-to-b from-sky-300 to-cyan-100">
      <div className="bg-cover bg-center p-8">
        <nav>
          <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
            <div className="flex justify-start items-center">
              <Link to="/" className="flex justify-center w-full md:w-fit">
                <img src={logo} alt="로고" className="h-16" />
              </Link>
            </div>
            <div className="flex justify-center items-center mt-3">
              <form
                className="mb-4 w-full max-w-4xl relative"
                onSubmit={handleSearchSubmit}
              >
                <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="검색어를 입력해주세요."
                  className="w-full p-2 pl-10 border border-gray-300 rounded-full"
                />
              </form>
            </div>
            <div className="flex flex-col justify-end items-end space-y-2">
              {!loading && role === "ADMIN" ? (
                <Link
                  to="/admin/eventmanage"
                  className="flex items-center px-4 py-1 border-2 rounded-full border-white font-bold text-sm bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
                >
                  <FcReadingEbook className="mr-2" />
                  관리자
                </Link>
              ) : (
                !loading &&
                nickname && (
                  <span className="flex justify-center items-center px-4 py-1 border-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 font-bold text-sm">
                    <span className="border-b-2 border-black mr-1">
                      {nickname}
                    </span>
                    님
                  </span>
                )
              )}

              <div className="flex justify-end items-center space-x-3">
                {isLoggedIn && (
                  <>
                    <button
                      className="flex justify-center items-center"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <BiSolidBellRing className="text-2xl" color={MAIN_BLUE} />
                    </button>
                    <AlarmModal
                      isOpen={isModalOpen}
                      onRequestClose={() => setIsModalOpen(false)}
                    >
                      <AlarmPage onClose={() => setIsModalOpen(false)} />
                    </AlarmModal>
                  </>
                )}

                {isLoggedIn ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="flex justify-center items-center bg-white px-4 py-1 border-2 rounded-full border-white font-bold text-sm"
                    >
                      로그아웃
                    </button>
                    <Link
                      to="/mypage"
                      className="flex justify-center items-center bg-[#0064FF] px-4 py-1 border-2 rounded-full border-transparent font-bold text-white text-sm"
                    >
                      마이페이지
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex justify-center items-center bg-white px-4 py-1 border-2 rounded-full border-white font-bold text-sm"
                    >
                      로그인
                    </Link>
                  </>
                )}

                {!isLoggedIn && (
                  <Link
                    to="/register"
                    className="flex justify-center items-center bg-[#0064FF] px-4 py-1 border-2 rounded-full border-transparent font-bold text-white text-sm"
                  >
                    회원가입
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className="text-black text-2xl font-nanumEB flex justify-around items-center py-8 h-10 relative">
          <div className="relative flex items-center">
            <button onClick={toggleEventDropdown} className={NavlinkClass}>
              행사{" "}
              {showEventDropdown ? (
                <FaTimes className="inline" />
              ) : (
                <FaAngleDown className="inline" />
              )}
            </button>
            {showEventDropdown && (
              <div className={DropdownClass} onMouseLeave={closeDropdown}>
                <Link
                  to="/EventListPage"
                  className={`${DropdownItemClass} ${DividerClass}`}
                >
                  <MdFestival className="text-4xl mb-4" color={MAIN_BLUE} />
                  <span className="text-blue-400">행사 둘러보기</span>
                </Link>
                <Link to="/addEvent" className={LastDropdownItemClass}>
                  <BsClipboard2PlusFill
                    className="text-4xl mb-4"
                    color={MAIN_BLUE}
                  />
                  <span className="text-blue-400">행사 등록하기</span>
                </Link>
              </div>
            )}
          </div>
          <div className="relative flex items-center">
            <button onClick={toggleBoothDropdown} className={NavlinkClass}>
              부스{" "}
              {showBoothDropdown ? (
                <FaTimes className="inline" />
              ) : (
                <FaAngleDown className="inline" />
              )}
            </button>
            {showBoothDropdown && (
              <div className={DropdownClass} onMouseLeave={closeDropdown}>
                <Link
                  to="/BoothListPage"
                  className={`${DropdownItemClass} ${DividerClass}`}
                >
                  <MdOutlineFestival
                    className="text-4xl mb-4"
                    color={MAIN_BLUE}
                  />
                  <span className="text-blue-400">부스 둘러보기</span>
                </Link>
                <Link to="/addBooth" className={LastDropdownItemClass}>
                  <BsClipboard2PlusFill
                    className="text-4xl mb-4"
                    color={MAIN_BLUE}
                  />
                  <span className="text-blue-400">부스 등록하기</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
