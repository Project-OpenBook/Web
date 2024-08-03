import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { VscBell } from "react-icons/vsc";
import { FcSearch, FcReadingEbook } from "react-icons/fc";
import logo from "../NavBar/logo_wide.png";
import { getAccessToken, removeAccessToken } from "../../Api/Util/token";
import AlarmModal from "../Alarm/AlarmModal";
import AlarmPage from "../Alarm/AlarmPage";
import { useAuth } from "../../Api/Util/useAuth";

export default function NavBar() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { role, nickname, loading } = useAuth();

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    removeAccessToken();
    window.location.reload();
  };

  const NAV_LINK_CLASS = "hover:border-b-4 hover:border-blue-400";

  return (
    <div className="px-2 mb-2">
      <nav className="bg-white p-8">
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
          <div className="flex justify-start items-center">
            <Link to="/" className="flex justify-center w-full md:w-fit">
              <img src={logo} alt="로고" className="h-14" />
            </Link>
          </div>
          <div className="flex justify-center items-center mt-3">
            <form
              className="mb-4 w-full max-w-4xl relative"
              onSubmit={(e) => {
                e.preventDefault();
                // 검색 동작을 수행하는 로직 추가 예정
              }}
            >
              <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl" />
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                className="w-full p-2 pl-10 border border-gray-300 rounded"
              />
            </form>
          </div>
          <div className="flex flex-col justify-center items-end space-y-2">
            {!loading && role === "ADMIN" ? (
              <Link
                to="/admin/eventmanage"
                className="flex items-center px-4 py-1 border-2 rounded-lg translate-x-px"
              >
                <FcReadingEbook className="mr-2" />
                관리자
              </Link>
            ) : (
              !loading &&
              nickname && (
                <span className="flex justify-center items-center font-bold">
                  <span className="border-b-2 border-black mr-1">
                    {nickname}
                  </span>
                  님
                </span>
              )
            )}
            <div className="flex space-x-2">
              {isLoggedIn && (
                <>
                  <button
                    className="flex justify-center items-center"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <VscBell className="text-2xl" />
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
                    className="flex justify-center items-center"
                  >
                    로그아웃
                  </button>
                  <Link
                    to="/mypage"
                    className="flex justify-center items-center"
                  >
                    마이페이지
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex justify-center items-center"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/register"
                    className="flex justify-center items-center"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-white text-black text-2xl font-nanumEB flex justify-around items-center py-8 h-10">
        <Link to="/EventListPage" className={NAV_LINK_CLASS}>
          행사 둘러보기
        </Link>
        <Link to="/addEvent" className={NAV_LINK_CLASS}>
          행사 등록하기
        </Link>
        <Link to="/BoothListPage" className={NAV_LINK_CLASS}>
          부스 둘러보기
        </Link>
      </div>
    </div>
  );
}
