import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidBellRing } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import logo from "../NavBar/logo_white.png";
import { getAccessToken, removeAccessToken } from "../../Api/Util/token";
import AlarmModal from "../Alarm/AlarmModal";
import AlarmPage from "../Alarm/AlarmPage";
import { useAuth } from "../../Hooks/useAuth";

export default function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { role, nickname, loading } = useAuth();
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    removeAccessToken();
    navigate("/");
    window.location.reload();
  };

  const handleDropdownClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDropdown((prev) => !prev);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="px-2 bg-blue-400">
      <div className="bg-cover bg-center p-6">
        <nav>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex justify-center">
                <img src={logo} alt="로고" className="h-16" />
              </Link>
              <div className="relative" onMouseLeave={handleMouseLeave}>
                <div className="flex space-x-8">
                  <button
                    onClick={handleDropdownClick}
                    className="px-4 py-2 text-white text-2xl font-bold relative hover:underline decoration-4 underline-offset-8"
                  >
                    행사
                  </button>
                  <button
                    onClick={handleDropdownClick}
                    className="px-4 py-2 text-white text-2xl font-bold relative hover:underline decoration-4 underline-offset-8"
                  >
                    부스
                  </button>
                </div>
                {showDropdown && (
                  <div
                    className="absolute z-50 bg-blue-400 shadow-lg py-4 rounded-b-lg border border-transparent grid grid-cols-2 divide-x-[2px] divide-white w-80 -translate-x-[4.5rem] translate-y-[2rem]"
                    onMouseEnter={() => {
                      if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex flex-col space-y-2 px-4">
                      <Link
                        to="/EventListPage"
                        className="block py-2 text-white font-semibold text-center relative hover:underline decoration-2 underline-offset-8"
                      >
                        행사 둘러보기
                      </Link>
                      <Link
                        to="/addEvent"
                        className="block py-2 text-white font-semibold text-center relative hover:underline decoration-2 underline-offset-8"
                      >
                        행사 등록하기
                      </Link>
                    </div>
                    <div className="flex flex-col space-y-2 px-4">
                      <Link
                        to="/BoothListPage"
                        className="block py-2 text-white font-semibold text-center relative hover:underline decoration-2 underline-offset-8"
                      >
                        부스 둘러보기
                      </Link>
                      <Link
                        to="/EventListPage?tab=모집중"
                        className="block py-2 text-white font-semibold text-center relative hover:underline decoration-2 underline-offset-8"
                      >
                        부스 등록하기
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-5">
              {!loading && role === "ADMIN" ? (
                <Link
                  to="/admin/eventmanage"
                  className="flex items-center px-4 py-1 border-4 rounded-lg border-double border-blue-400 font-bold text-sm text-white bg-sky-600 hover:bg-sky-800"
                >
                  관리자
                </Link>
              ) : (
                !loading &&
                nickname && (
                  <span className="flex justify-center items-center px-4 py-1 border-2 rounded-lg bg-sky-500 font-bold text-sm">
                    <span className="mr-1">{nickname}</span>님
                  </span>
                )
              )}

              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center bg-white px-4 py-1 border-2 rounded-lg border-white font-bold text-sm"
                  >
                    로그아웃
                  </button>
                  <Link
                    to="/mypage"
                    className="flex justify-center items-center bg-blue-400 px-4 py-1 border-2 rounded-lg border-white font-bold text-white text-sm"
                  >
                    마이페이지
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex justify-center items-center bg-white px-4 py-1 border-2 rounded-lg border-white font-bold text-sm"
                  >
                    로그인
                  </Link>
                </>
              )}

              {!isLoggedIn && (
                <Link
                  to="/register"
                  className="flex justify-center items-center bg-blue-400 px-4 py-1 border-2 rounded-lg border-white font-bold text-white text-sm"
                >
                  회원가입
                </Link>
              )}

              {isLoggedIn && (
                <>
                  <button
                    className="flex justify-center items-center"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <BiSolidBellRing className="text-2xl text-white" />
                  </button>
                  <AlarmModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                  >
                    <AlarmPage onClose={() => setIsModalOpen(false)} />
                  </AlarmModal>
                </>
              )}

              <button
                className="flex justify-center items-center"
                onClick={() => navigate("/SearchResultPage?query=")}
              >
                <IoSearchSharp className="text-2xl text-white" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
