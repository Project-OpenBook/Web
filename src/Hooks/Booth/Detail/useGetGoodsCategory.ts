import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";

interface Image {
  id: string;
  url: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  images: Image[];
}

interface Products {
  hasNext: boolean;
  sliceNumber: string; // slicestring을 더 명확한 이름으로 변경
  content: Product[];
}

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface CategoryData {
  category: Category;
  products: Products;
}

// API 호출 함수
const fetchCategoryData = async ({
  pageParam,
  categoryId,
}: {
  pageParam: any;
  categoryId: string;
}): Promise<CategoryData> => {
  const token = getAccessToken();
  const response = await fetch(
    `http://52.79.91.214:8080/booths/products/category?category_id=2&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category data");
  }

  return response.json();
};

// useCategoryGoodsInfinite 훅
export function useCategoryGoodsInfinite(categoryId: string) {
  return useInfiniteQuery<CategoryData, Error>({
    queryKey: ["getCategoryGoods", categoryId], // queryKey 배열로 전달
    queryFn: ({ pageParam = 0 }) => {
      // pageParam과 categoryId를 fetch 함수에 전달
      return fetchCategoryData({ pageParam, categoryId });
    },
    getNextPageParam: (lastPage: CategoryData) => {
      if (!lastPage || !lastPage.products) {
        return undefined;
      }
      // next page 계산
      const nextPage = Number(lastPage.products.sliceNumber); // slicestring에서 sliceNumber로 명확한 이름 변경
      return lastPage.products.hasNext ? nextPage + 1 : undefined;
    },
    initialPageParam: 0, // 첫 페이지 번호 설정
  });
}
