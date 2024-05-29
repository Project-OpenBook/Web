import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import ServiceManagementPage from "./Components/Booth/Regist/Service/ServiceManagementPage ";
import ServiceTimeAdd from "./Components/Booth/Regist/Service/ServiceTimeAdd";
import RegistLocationPage from "./Components/Booth/Regist/Location/RegistLocationPage";

function App() {
  //TODO: 임시 데이터. 나중에 모달 연결하면 지울 것
  const rows = ["A", "B", "C"];
  const seatsPerRow = [3, 2, 4];
  const bookingStatus = {
    confirmed: ["A1", "A2", "A3"],
    reserved: ["B1", "C1"],
    available: ["B2", "C2"],
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage state="main" />} />
        <Route path="/list" element={<MainPage state="list" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/addEvent" element={<AddEventPage />} />
        <Route path="/boothRegist" element={<BoothRegistPage />} />
        <Route path="/boothDetail" element={<BoothDetailPage />} />
        {/* 추후 Modal로 변경 페이지*/}
        <Route path="/boothGoodsTest" element={<GoodsManagementPage />} />
        <Route
          path="/ServiceManagementPage"
          element={<ServiceManagementPage />}
        />
        <Route path="/GoodsInfoPage" element={<GoodsInfoInputPage />} />
        <Route path="/ServiceInfoPage" element={<ServiceInfoInputPage />} />
        <Route
          path="/RegistLocation"
          element={
            <RegistLocationPage
              imageSrc="https://www.gyeongju.go.kr/design/sillafestival/img/content/art_market211013.jpg"
              rows={rows}
              seatsPerRow={seatsPerRow}
              bookingStatus={bookingStatus}
            />
          }
        />
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
