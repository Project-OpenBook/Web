interface Props {
  product: {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    images: Image[];
  };
}

interface Image {
  id: string;
  url: string;
}
export default function GoodsInfoCard({ product }: Props) {
  return (
    <div className="flex h-80 flex-col px-3 pt-3 pb-5 w-full gap-6 items-center rounded-md font-bold shadow-lg transition-transform duration-300 hover:scale-105">
      {/* 이미지 컨테이너 */}
      <div className="flex h-20 w-full bg-slate-100 rounded-lg justify-center items-center overflow-hidden">
        {product.images.length > 0 ? (
          <img
            alt={`${product.name} 이미지`}
            className="object-contain h-full w-full"
            src={product.images[0].url}
          />
        ) : (
          <img
            alt="기본 이미지"
            className="object-contain h-full w-full"
            src="images/boothRegist/noimage.png"
          />
        )}
      </div>
      <div className="flex flex-col items-start text-left gap-2">
        <div>제품명 : {product.name}</div>
        <div>카테고리 : {product.description}</div>
        <div>가격 : {product.price.toLocaleString()} 원</div>
        <div>재고 : {product.stock} 개</div>
      </div>
      {/* 수정/삭제 버튼 */}
      <div className="flex justify-center gap-5 w-full text-white">
        <button className="bg-[rgb(96,165,250)] rounded-md w-full p-1 transition-transform transform hover:scale-105 hover:bg-blue-500 duration-300">
          수정
        </button>
        <button className="bg-red-600 rounded-md w-full p-1 transition-transform transform hover:scale-105 hover:bg-red-500 duration-300">
          삭제
        </button>
      </div>
    </div>
  );
}
