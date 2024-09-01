import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import RegisterPage from "./Components/Register/RegisterPage";
import MainPage from "./Components/Main/Main";
import EventDetailPage from "./Components/Event/EventDetail";
import AddEventPage from "./Components/Event/AddEvent";
import BoothRegistPage from "./Components/Booth/Regist/BoothRegistPage";
import BoothDetailPage from "./Components/Booth/Detail/BoothDetailPage";
import ManageProducts from "./Components/Booth/Detail/Regist/Products/ManageProducts";
import GoodsInfoInputPage from "./Components/Booth/Detail/Regist/Products/GoodsInfoInputPage";
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
import MoreEventPage from "./Components/Search/MorePage/MoreEventPage";
import MoreBoothPage from "./Components/Search/MorePage/MoreBoothPage";
import MoreEventHashtagPage from "./Components/Search/MorePage/MoreEventHashtagPage";
import MoreBoothHashtagPage from "./Components/Search/MorePage/MoreBoothHashtagPage";
import MyPage from "./Components/MyPage/MyPage";
import EventNoticeList from "./Components/Event/EventNoticeList";
import logo from "./Components/NavBar/logo_wide.png";

function App() {
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
        <Route path="/MoreEventPage" element={<MoreEventPage />} />
        <Route path="/MoreBoothPage" element={<MoreBoothPage />} />
        <Route
          path="/MoreEventHashtagPage"
          element={<MoreEventHashtagPage />}
        />
        <Route
          path="/MoreBoothHashtagPage"
          element={<MoreBoothHashtagPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/event/:id/notice" element={<EventNoticeList />} />
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
      </Routes>
      <footer className="flex items-center w-full h-44 bg-blue-300 text-white">
        <img src={logo} className="w-44 object-contain" alt="footerlogo" />
        <div className="flex items-center justify-around w-full gap-2 font-bold">
          <div className="footer-section">
            <h4>Contact Information</h4>
            <p>Email: contact@yourcompany.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 1234 Main Street, Anytown, USA</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
