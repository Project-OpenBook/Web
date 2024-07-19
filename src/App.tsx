import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import RegisterPage from "./Components/Register/RegisterPage";
import MainPage from "./Components/Main/Main";
import EventDetailPage from "./Components/Event/EventDetail";
import AddEventPage from "./Components/Event/AddEvent";
import BoothRegistPage from "./Components/Booth/Regist/BoothRegistPage";
import BoothDetailPage from "./Components/Booth/Detail/BoothDetailPage";
import GoodsManagementPage from "./Components/Booth/Regist/Goods/GoodsMangementPage";
import GoodsInfoInputPage from "./Components/Booth/Regist/Goods/GoodsInfoInputPage";
import ServiceInfoInputPage from "./Components/Booth/Regist/Service/ServiceInfoInputPage";
import ServiceManagementPage from "./Components/Booth/Regist/Service/ServiceManagementPage";
import EventListPage from "./Components/Event/List/EventListPage";
import BoothListPage from "./Components/Booth/List/BoothListPage";
import SearchResultPage from "./Components/Search/SearchResultPage";
import RequestLayout from "./Components/Layout/RequestLayout";
import BoothAproval from "./Components/Event/Manage/BoothAproval";
import EventAproval from "./Components/Admin/EventAproval";
import ServiceTimeAdd from "./Components/Booth/Regist/Service/ServiceTimeAdd";
import NavBar from "./Components/NavBar/NavBar";
import MyPage from "./Components/MyPage/MyPage";

function App() {
  //TODO: 임시 데이터. 나중에 모달 연결하면 지울 것
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthPage && <NavBar />}
      <Routes>
        <Route path="/" element={<MainPage state="main" />} />
        <Route path="/EventListPage" element={<EventListPage />} />
        <Route path="/addEvent" element={<AddEventPage />} />
        <Route path="/BoothListPage" element={<BoothListPage />} />
        <Route path="/SearchResultPage" element={<SearchResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path="/event/:id/manage"
          element={
            <RequestLayout header="부스 신청" side="부스 신청 현황">
              <BoothAproval />
            </RequestLayout>
          }
        />
        <Route
          path="/admin/eventmanage"
          element={
            <RequestLayout header="행사 신청" side="행사 신청 현황">
              <EventAproval />
            </RequestLayout>
          }
        />
        <Route path="/boothRegist" element={<BoothRegistPage />} />
        <Route path="/booth/:id" element={<BoothDetailPage />} />
        {/* 추후 Modal로 변경 페이지*/}
        <Route path="/boothGoodsTest" element={<GoodsManagementPage />} />
        <Route
          path="/ServiceManagementPage"
          element={<ServiceManagementPage />}
        />
        <Route path="/GoodsInfoPage" element={<GoodsInfoInputPage />} />
        <Route path="/ServiceInfoPage" element={<ServiceInfoInputPage />} />
        <Route
          path="/ServiceTimeAdd"
          element={
            <ServiceTimeAdd
              startDate={new Date(2024, 5, 23)}
              endDate={new Date(2024, 5, 30)}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
