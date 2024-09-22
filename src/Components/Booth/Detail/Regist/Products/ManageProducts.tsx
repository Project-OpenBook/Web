import { useState } from "react";
import GoodsInfoCard from "./GoodsInfoCard";
import { Modal_State } from "../../../Regist/BoothRegistPage";
import { useGetGoodsList } from "../../../../../Hooks/Booth/Detail/useGetGoods";
import { useParams } from "react-router-dom";
import { useCategoryGoods } from "../../../../../Hooks/Booth/Detail/useGetGoodsCategory";
import { useCategoryList } from "../../../../../Hooks/Booth/Detail/useGetCategory";
import CategoryModal from "./CategoryModal";

// 임시로 생성한 커스텀 훅 (데이터를 불러오는 역할)
const useTempCustomHook = (value: number) => {
  return { data: `${value} 카테고리의 상품 리스트입니다` };
};

interface Props {
  setModalState: (state: string) => void;
}

export default function ManageProducts({ setModalState }: Props) {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false); // 카테고리 모달 상태 관리
  const [selectedOption, setSelectedOption] = useState(1); // select 태그 상태 관리
  let { boothId } = useParams();
  const { isError, data, isLoading } = useGetGoodsList(boothId ?? "");
  const { data: categoryGoodsList } = useCategoryGoods(
    selectedOption.toString()
  );
  const { data: categoryList } = useCategoryList(boothId ?? "");
  // 임시 커스텀 훅 호출 (select에서 선택한 값으로 데이터 로드)

  const handleConfirm = () => {
    setModalState(Modal_State.none);
  };

  const handleCategoryRegister = () => {
    setCategoryModalOpen(true);
  };

  // select 태그의 onChange 핸들러
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

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

          {/* 좌측 상단에 select 태그 추가 */}
          <div className="absolute top-4 left-8">
            <label htmlFor="categorySelect" className="mr-2 font-bold">
              카테고리 :
            </label>
            <select
              id="categorySelect"
              value={selectedOption}
              onChange={handleSelectChange}
              className="border border-gray-300 rounded-md p-2"
            >
              {categoryList?.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </div>

          {/* 우측 상단에 물품 등록 버튼 */}
          <div className="absolute top-4 right-8 flex gap-4">
            <button
              onClick={handleCategoryRegister}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              카테고리 등록
            </button>
            <button
              onClick={() => setModalState(Modal_State.goodsInput)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              물품 등록
            </button>
          </div>

          {/* 선택한 카테고리 데이터 (임시 커스텀 훅 결과 출력) */}
          {/* <div className="mt-6 mb-6">
            <p className="text-center text-xl">
              {`선택된 옵션: ${selectedOption} - ${tempData}`}
            </p>
          </div> */}

          <div className="space-y-8">
            {data.length > 0 ? (
              data.map((category, catIndex) => (
                <div key={catIndex} className="space-y-4">
                  {/* 카테고리 제목 */}
                  <div className="flex gap-2 items-center">
                    <h3 className="font-bold text-2xl text-left mb-4">
                      {category.category.name}
                    </h3>
                    {category.category.description && (
                      <h3 className=" text-xl text-left mb-4">
                        {`- ${category.category.description}`}
                      </h3>
                    )}
                  </div>

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

      {/* 카테고리 등록 모달 */}
      {isCategoryModalOpen && (
        <CategoryModal onClose={() => setCategoryModalOpen(false)} />
      )}
    </>
  );
}
