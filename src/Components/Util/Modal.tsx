import ReactModal from "react-modal";
import ModalButton from "../Booth/Regist/Location/ModalButton";
import { ModalState } from "./BoothRegistPage";
import GoodsManagementPage from "../Booth/Regist/Goods/GoodsMangementPage";
import ServiceManagementPage from "../Booth/Regist/Service/ServiceManagementPage";
import GoodsInfoInputPage from "../Booth/Regist/Goods/GoodsInfoInputPage";
import ServiceInfoInputPage from "../Booth/Regist/Service/ServiceInfoInputPage";
import ServiceTimeAdd from "../Booth/Regist/Service/ServiceTimeAdd";
import RegistLocationPage from "../Booth/Regist/Location/RegistLocationPage";
interface Props {
  children?: React.ReactNode;
  switchModal: () => void;
  isOpen: boolean;
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
}

export default function Modal({
  switchModal,
  isOpen,
  modalState,
  setModalState,
}: Props) {
  const renderContent = () => {
    switch (modalState) {
      case "goodsManage":
        return <GoodsManagementPage />;
      case "serviceManage":
        return <ServiceManagementPage />;
      case "goodsInput":
        return <GoodsInfoInputPage />;
      case "serviceInput":
        return <ServiceInfoInputPage />;
      case "serviceTime":
        return (
          <ServiceTimeAdd
            startDate={new Date(2024, 5, 23)}
            endDate={new Date(2024, 5, 30)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ReactModal
        shouldCloseOnOverlayClick={false}
        isOpen={isOpen}
        onRequestClose={() => {}}
        className="flex flex-col w-3/4 bg-white p-4 items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center"
      >
        {renderContent()}
        <div className="flex justify-center gap-4 mt-4 w-full">
          <ModalButton
            action={() => {
              switchModal();
              setModalState("none"); 
            }}
            color="blue-500"
            text="확인"
          />
          <ModalButton
            action={() => {
              switchModal();
              setModalState("none"); /
            }}
            color="red-500"
            text="취소"
          />
        </div>
      </ReactModal>
    </div>
  );
}
