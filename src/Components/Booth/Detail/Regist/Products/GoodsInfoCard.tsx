import { useDeleteProduct } from "../../../../../Hooks/Booth/Detail/useDeleteProduct";
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
  const { mutate } = useDeleteProduct(product.id);

  return (
    <div className="flex h-96 flex-col p-4 w-full gap-6 items-start rounded-lg font-semibold shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105">
      {/* 이미지 컨테이너 */}
      <div className="flex h-48 w-full bg-slate-100 rounded-lg justify-center items-center overflow-hidden relative">
        {product.images.length > 0 ? (
          <img
            alt={`${product.name} 이미지`}
            className="object-contain h-full w-full transition-opacity duration-500 hover:opacity-90"
            src={product.images[0].url}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <img
              alt="기본 이미지"
              className="object-contain h-20 w-20 mb-2"
              src="images/boothRegist/noimage.png"
            />
            <span className="text-sm">이미지가 없습니다</span>
          </div>
        )}
      </div>

      {/* 제품 정보 */}
      <div className="text-xl flex flex-col gap-2 w-full">
        <div className="text-gray-700">
          제품명 : <span className="text-black">{product.name}</span>
        </div>
        <div className="text-gray-700">
          설명 : <span className="text-black">{product.description}</span>
        </div>
        <div className="text-gray-700">
          가격 :{" "}
          <span className="text-black">
            {product.price.toLocaleString()} 원
          </span>
        </div>
        <div className="text-gray-700">
          재고 : <span className="font-semibol">{product.stock} 개</span>
        </div>
      </div>

      {/* 수정/삭제 버튼 */}
      <div className="flex justify-center gap-5 w-full text-white">
        <button className="bg-blue-500 rounded-md w-full p-2 transition-all transform hover:scale-105 hover:bg-blue-600 duration-300">
          수정
        </button>
        <button
          onClick={() => {
            mutate();
          }}
          className="bg-red-600 rounded-md w-full p-2 transition-all transform hover:scale-105 hover:bg-red-700 duration-300"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
