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
      className="absolute top-28 right-6 flex flex-col w-1/4 h-5/6 bg-white p-4 rounded border border-gray-300 outline-none -translate-x-3.5 -translate-y-4"
      overlayClassName="inset-0"
    >
      <div className="flex-1 overflow-y-auto">{children}</div>
    </ReactModal>
  );
}
