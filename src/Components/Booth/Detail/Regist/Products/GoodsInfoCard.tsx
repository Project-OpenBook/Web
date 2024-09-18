interface Props {
  product: {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    images: {
      id: string;
      url: string;
    }[];
  };
}

export default function GoodsInfoCard({ product }: Props) {
  return (
    <div className="flex h-80 flex-col p-3 pb-5 w-full gap-6 items-center rounded-md font-bold shadow-lg">
      <div className="flex bg-slate-100 rounded-lg justify-center">
        {product.images.length > 0 ? (
          <img
            alt={`${product.name} 이미지`}
            className="flex w-1/2"
            src={product.images[0].url} // 첫 번째 이미지를 표시
          />
        ) : (
          <img
            alt="기본 이미지"
            className="flex w-1/2"
            src="images/logos/logo_small.png" // 이미지가 없을 때 기본 이미지
          />
        )}
      </div>
      <div>
        {product.name} : {product.price.toLocaleString()}원
      </div>{" "}
      {/* 가격 표시 */}
      <div>재고 : {product.stock}개</div> {/* 재고 표시 */}
      <div>카테고리 : {product.description}</div> {/* 카테고리 설명 표시 */}
      <div className="flex justify-center gap-5 w-full text-white">
        <button className="bg-[rgb(96,165,250)] rounded-md w-full p-1">
          수정
        </button>
        <button className="bg-red-600 rounded-md w-full p-1">삭제</button>
      </div>
    </div>
  );
}
