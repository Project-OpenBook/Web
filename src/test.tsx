import React, { useState } from "react";

interface Item {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
  imageUrl: string;
  description: string;
}

const itemsData: Item[] = [
  {
    id: 1,
    name: "상품 1",
    price: "123원",
    stock: 123,
    category: "기본",
    imageUrl: "/path-to-image1",
    description: "상품 1의 자세한 설명입니다.",
  },
  {
    id: 2,
    name: "상품 2",
    price: "1,234원",
    stock: 500,
    category: "기본",
    imageUrl: "/path-to-image2",
    description: "상품 2의 자세한 설명입니다.",
  },
  // 다른 상품들...
];

const ItemCard: React.FC<{
  item: Item;
  onClick: () => void;
  isSelected: boolean;
}> = ({ item, onClick, isSelected }) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        isSelected ? "flex-grow-1 scale-105 z-10" : "flex-grow-0 scale-100"
      } relative p-4 border rounded-lg shadow-lg cursor-pointer bg-white overflow-hidden`}
      onClick={onClick}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="mt-4 text-lg font-bold">
        {item.name} : {item.price}
      </h2>
      <p>재고: {item.stock}개</p>
      <p>카테고리: {item.category}</p>

      {isSelected && (
        <div className="mt-4">
          <p className="text-gray-600">{item.description}</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

const ItemList: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedItemId(id === selectedItemId ? null : id);
  };

  return (
    <div
      className="flex gap-2 transition-all duration-500 ease-in-out overflow-hidden"
      style={{ height: "600px" }}
    >
      {itemsData.map((item) => (
        <div
          key={item.id}
          className={`transition-all duration-500 ease-in-out ${
            selectedItemId === null
              ? "w-1/4"
              : item.id === selectedItemId
              ? "flex-grow-1 w-3/4"
              : "flex-grow-0 w-1/6"
          }`}
        >
          <ItemCard
            item={item}
            isSelected={item.id === selectedItemId}
            onClick={() => handleClick(item.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
