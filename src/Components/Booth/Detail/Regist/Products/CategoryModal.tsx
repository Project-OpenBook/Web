import { usePostCategory } from "../../../../../Hooks/Booth/Detail/usePostCategory";
import { useParams } from "react-router-dom";
import { useCategoryList } from "../../../../../Hooks/Booth/Detail/useGetCategory";
import { useEffect, useState } from "react";

interface CategoryModalProps {
  onClose: () => void;
}

export default function CategoryModal({ onClose }: CategoryModalProps) {
  const { boothId } = useParams();
  const {
    data: categoryList,
    isLoading,
    isError,
    refetch,
  } = useCategoryList(boothId ?? "");
  const { mutate, setName, setDescription, name, description } =
    usePostCategory(boothId ?? "");
  const [localCategoryList, setLocalCategoryList] = useState(
    categoryList ?? []
  );

  useEffect(() => {
    // categoryList가 업데이트될 때 localCategoryList에도 반영
    setLocalCategoryList(categoryList ?? []);
  }, [categoryList]); // categoryList가 변경될 때마다 실행

  const handleSubmit = () => {
    const newCategory = { id: Date.now().toString(), name, description };

    // 낙관적 업데이트: 로컬 상태에 먼저 추가
    setLocalCategoryList((prevList) => [...prevList, newCategory]);

    mutate(undefined, {
      onSuccess: () => {
        // 성공 시 서버에서 다시 데이터를 가져옴
        refetch(); // 서버로부터 최신 데이터를 다시 불러옴
        setName("");
        setDescription("");
      },
      onError: () => {
        // 실패 시 추가된 카테고리 롤백
        setLocalCategoryList((prevList) =>
          prevList.filter((category) => category.id !== newCategory.id)
        );
        alert("카테고리 등록에 실패했습니다.");
      },
    });
  };

  if (isError) {
    return <div>예기치 못한 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
        <div className="font-bold text-xl mb-4">카테고리 등록</div>

        {/* 기존 카테고리 리스트 */}
        <div className="mb-4">
          <h3 className="font-semibold">등록된 카테고리</h3>
          <ul className="list-disc ml-4">
            {localCategoryList.map((category, index) => (
              <li
                key={index}
              >{`${category.name} - ${category.description}`}</li>
            ))}
          </ul>
        </div>

        {/* 새로운 카테고리 입력창 */}
        <div className="flex flex-col mb-4">
          <label className="mb-2">새 카테고리 이름</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="border px-2 py-1 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2">카테고리 설명(선택)</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="border px-2 py-1 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            카테고리 추가
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
