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
import logo from "./Components/NavBar/logo_white.png";
import BoothNoticeList from "./Components/Booth/List/BoothNoticeList";
import ItemList from "./test";
import ScrollToTop from "./Components/Util/ScrollToTop";
import BoothPatchPage from "./Components/Booth/Regist/BoothPatchPage";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      <ScrollToTop />
      {!isAuthPage && <NavBar />}
      <div className="min-h-screen">
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
              <RequestLayout header="부스 신청 현황">
                <BoothAproval />
              </RequestLayout>
            }
          />
          <Route
            path="/admin/eventmanage"
            element={
              <RequestLayout header="행사 신청 현황">
                <EventAproval />
              </RequestLayout>
            }
          />
          <Route path="/boothRegist" element={<BoothRegistPage />} />
          <Route path="/booth/:boothId" element={<BoothDetailPage />} />
          <Route path="/booth/patch/:boothId" element={<BoothPatchPage />} />
          <Route path="/booth/:id/notice" element={<BoothNoticeList />} />
          <Route path="/test" element={<ItemList></ItemList>} />
        </Routes>
      </div>
      <footer className="flex justify-center items-center w-full h-44 bg-blue-300 text-white px-12">
        <div className="flex justify-between items-center w-full max-w-6xl gap-8 font-bold">
          <div className="footer-section flex items-center">
            <img src={logo} className="w-56 object-contain" alt="footerlogo" />
          </div>
          <div className="footer-section text-left flex items-center">
            <div>
              <h4>Contact Information</h4>
              <p>Email: contact@yourcompany.com</p>
              <p>Phone: +1 234 567 890</p>
              <p>Address: 1234 Main Street, Anytown, USA</p>
            </div>
          </div>
          <div className="footer-section text-left flex items-center">
            <div>
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
        </div>
      </footer>
    </div>
  );
}

export default App;
