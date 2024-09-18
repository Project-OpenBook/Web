import GoodsInfoCard from "./GoodsInfoCard";
import { Modal_State } from "../../../Regist/BoothRegistPage";
import { useGetGoodsList } from "../../../../../Hooks/Booth/Detail/useGetGoods";
import { useParams } from "react-router-dom";

interface Props {
  setModalState: (state: string) => void;
}

export default function ManageProducts({ setModalState }: Props) {
  const handleConfirm = () => {
    setModalState(Modal_State.none);
  };

  let { boothId } = useParams();
  const { isError, data, isLoading } = useGetGoodsList(boothId ?? "");

  if (isLoading) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  if (!data) return <div>로딩중입니다...</div>;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-3/4 max-h-[80vh] overflow-y-auto rounded-lg p-8 relative">
          <div className="font-bold text-3xl mb-5 text-center">
            부스 물품 관리
          </div>

          {/* 우측 상단에 물품 등록 버튼 */}
          <div className="absolute top-4 right-8">
            <button
              onClick={() => setModalState(Modal_State.goodsInput)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              물품 등록
            </button>
          </div>

          <div className="space-y-8">
            {data.length > 0 ? (
              data.map((category, catIndex) => (
                <div key={catIndex} className="space-y-4">
                  {/* 카테고리 제목 */}
                  <h3 className="font-bold text-2xl text-left mb-4">
                    {category.category.name}
                  </h3>

                  {/* 제품 그리드 */}
                  <div className="grid place-items-center grid-cols-5 gap-6">
                    {category.products.content.length > 0 ? (
                      category.products.content.map((product, prodIndex) => (
                        <GoodsInfoCard key={prodIndex} product={product} />
                      ))
                    ) : (
                      <div className="col-span-5 text-center">
                        등록된 물품이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                등록된 카테고리 및 물품이 없습니다.
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-4 w-full">
            <button
              onClick={handleConfirm}
              className="w-1/4 bg-blue-500 text-white py-2 rounded"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
