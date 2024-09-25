import { useState } from "react";
import GoodsInfoCard from "./GoodsInfoCard";
import { Modal_State } from "../../../Regist/BoothRegistPage";
import { useGetGoodsList } from "../../../../../Hooks/Booth/Detail/useGetGoods";
import { useParams } from "react-router-dom";
import { useCategoryGoodsInfinite } from "../../../../../Hooks/Booth/Detail/useGetGoodsCategory";
import { useCategoryList } from "../../../../../Hooks/Booth/Detail/useGetCategory";
import CategoryModal from "./CategoryModal";
import { useEffect, useRef } from "react";
interface Props {
  setModalState: (state: string) => void;
  isManager: boolean;
}

// 무한 스크롤 및 categoryGoodsList 데이터를 사용하는 코드
export default function ManageProducts({ setModalState, isManager }: Props) {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false); // 카테고리 모달 상태 관리
  const [selectedOption, setSelectedOption] = useState<number>(0); // select 태그 상태 관리
  let { boothId } = useParams();
  const { isError, data, isLoading } = useGetGoodsList(boothId ?? "");
  const {
    data: categoryGoodsList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCategoryGoodsInfinite(selectedOption.toString());
  const { data: categoryList } = useCategoryList(boothId ?? "");

  // 무한 스크롤을 위한 Ref
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver를 사용하여 무한 스크롤 구현
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleConfirm = () => {
    setModalState(Modal_State.none);
  };

  const handleCategoryRegister = () => {
    setCategoryModalOpen(true);
  };

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
              <option value={0}>전체</option>
              {categoryList?.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </div>

          {/* 우측 상단에 물품 등록 버튼 */}
          {isManager && (
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
          )}

          {selectedOption === 0 ? (
            <div className="space-y-8">
              {/* 전체 상품 데이터 출력 */}
              {data.length > 0 ? (
                data.map((category, catIndex) => (
                  <div key={catIndex} className="space-y-4">
                    <div className="flex gap-2 items-center">
                      <h3 className="font-bold text-2xl text-left mb-4">
                        {category.category.name}
                      </h3>
                      {category.category.description && (
                        <h3 className="text-xl text-left mb-4">
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
          ) : (
            <div className="space-y-8">
              {/* 선택된 카테고리 상품 데이터 출력 */}
              {categoryGoodsList?.pages.map((page, pageIndex) => (
                <div key={pageIndex} className="space-y-4">
                  <div className="grid place-items-center grid-cols-5 gap-6">
                    {page.products.content.map((product, prodIndex) => (
                      <GoodsInfoCard key={prodIndex} product={product} />
                    ))}
                  </div>
                </div>
              ))}

              {/* 로딩 중이면 메시지 표시 */}
              {isFetchingNextPage && (
                <div className="text-center">더 불러오는 중...</div>
              )}

              {/* 더 불러오기 트리거 */}
              {hasNextPage && (
                <div ref={loadMoreRef} className="h-10 bg-transparent"></div>
              )}
            </div>
          )}

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
