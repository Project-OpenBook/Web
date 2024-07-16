import ServiceInfoCard from "./ServiceInfoCard";
import { Modal_State } from "../BoothRegistPage";

interface Props {
  setModalState: (state: string) => void;
}

export default function ServiceManagementPage({ setModalState }: Props) {
  const products = [
    {
      name: "A-Class",
      price: 35000,
      volume: "50ml",
      description:
        "조향사 체험 원데이클래스 - 시그니처 상품 - 선호도가 많고 인기가 있는 향료로 구성 상품내용 : A Class 는 기본적인 향료 30가지로 구성되어 있는 상품",
      rating: 4.97,
      reviews: 9377,
      imageUrl: "https://via.placeholder.com/96", // Placeholder image URL
    },
    {
      name: "A-Class",
      price: 45000,
      volume: "100ml",
      description:
        "조향사 체험 원데이클래스 - 시그니처 상품 - 선호도가 많고 인기가 있는 향료로 구성 상품내용 : A Class 는 기본적인 향료 30가지로 구성되어 있는 상품",
      rating: 4.67,
      reviews: 820,
      imageUrl: "https://via.placeholder.com/96", // Placeholder image URL
    },
    {
      name: "B-Class",
      price: 45000,
      volume: "50ml",
      description:
        "조향사 체험 원데이클래스 - 프리미엄 상품 - 다양한 향과 유니크한 향들로 구성(니치향/풍부한향) 상품내용 : B Class 는 기본적인 향료 36가지로 구성되어 있는 상품",
      rating: 4.96,
      reviews: 1864,
      imageUrl: "https://via.placeholder.com/96", // Placeholder image URL
    },
    {
      name: "B-Class",
      price: 55000,
      volume: "100ml",
      description:
        "조향사 체험 원데이클래스 - 프리미엄 상품 - 다양한 향과 유니크한 향들로 구성 상품내용 : B Class 는 기본적인 향료 36가지로 구성되어 있는 상품",
      rating: 4.95,
      reviews: 2500,
      imageUrl: "https://via.placeholder.com/96", // Placeholder image URL
    },
  ];

  const handleConfirm = () => {
    setModalState(Modal_State.none);
  };

  const handleCancel = () => {
    setModalState(Modal_State.none);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mx-auto">서비스 관리</h1>
        <button className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded">
          서비스 추가
        </button>
      </div>
      {products.map((product, index) => (
        <ServiceInfoCard
          key={index}
          name={product.name}
          price={product.price}
          volume={product.volume}
          description={product.description}
          imageUrl={product.imageUrl}
        />
      ))}
      <div className="flex justify-center gap-4 mt-4 w-full">
        <button
          onClick={handleConfirm}
          className="w-1/4 bg-blue-500 text-white py-2 rounded"
        >
          확인
        </button>
        <button
          onClick={handleCancel}
          className="w-1/4 bg-red-500 text-white py-2 rounded"
        >
          취소
        </button>
      </div>
    </div>
  );
}
