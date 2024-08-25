import ReactModal from "react-modal";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function AlarmModal({
  isOpen,
  onRequestClose,
  children,
}: Props) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-32 right-11 flex flex-col w-1/4 h-5/6 bg-white p-4 rounded border border-gray-300 outline-none -translate-x-3.5 -translate-y-4"
      overlayClassName="inset-0"
    >
      <div className="absolute top-0 right-2/3 transform translate-x-16 -translate-y-full h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-gray-300"></div>
      <div className="absolute top-px right-2/3 transform translate-x-16 -translate-y-full h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-white"></div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </ReactModal>
  );
}
