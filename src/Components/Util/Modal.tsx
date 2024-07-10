import ReactModal from "react-modal";
import ModalButton from "../Booth/Regist/Location/ModalButton";
interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
}

export default function Modal({ isOpen, children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <ReactModal
        shouldCloseOnOverlayClick={false}
        isOpen={isOpen}
        onRequestClose={() => {}}
        className="flex flex-col w-3/4 bg-white p-4 items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center"
      >
        {children}
        <div className="flex justify-center gap-4 mt-4 w-full"></div>
      </ReactModal>
    </div>
  );
}
