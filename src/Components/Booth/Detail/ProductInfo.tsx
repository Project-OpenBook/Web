import noimage from "../../../images/noimage.png";

interface Props {
  productData: {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    images:
      | {
          id: string;
          url: string;
        }[]
      | [];
  };
}

export default function ProductInfoVertical(product: Props) {
  return (
    <div className="w-72 h-96 flex flex-col items-center rounded-lg shadow-lg p-5 bg-gradient-to-r from-white via-gray-100 to-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-sm mb-5"
        src={product.productData.images[0]?.url || noimage}
        alt="부스 이미지"
      />
      <h2 className="text-2xl font-semibold text-gray-900 mb-3 truncate">
        {product.productData.name}
      </h2>
      <p className="text-gray-600 leading-relaxed mb-3 text-center line-clamp-3">
        {product.productData.description}
      </p>
      <div className="text-gray-700 mb-3">
        <span className="font-medium">재고:</span> {product.productData.stock}개
      </div>
      <div className="text-gray-900 font-bold text-lg">
        {product.productData.price.toLocaleString()} 원
      </div>
    </div>
  );
}
