import ReactModal from "react-modal";
interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  width: string;
}

export default function Modal({ isOpen, children, width }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <ReactModal
        shouldCloseOnOverlayClick={false}
        isOpen={isOpen}
        onRequestClose={() => {}}
        className={`flex flex-col ${width} bg-white px-4 items-center justify-center`}
        overlayClassName="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center"
      >
        {children}
        <div className="flex justify-center gap-4 mt-4 w-full"></div>
      </ReactModal>
    </div>
  );
}
