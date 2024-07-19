import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navi = useNavigate();
  return (
    <button
      onClick={() => {
        navi(-1);
      }}
      className="bg-red-600 rounded-md text-white py-1 px-2"
    >
      뒤로가기
    </button>
  );
}
