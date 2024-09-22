import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";

interface Image {
  id: string;
  url: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  stock: string;
  price: string;
  images: Image[];
}

interface Products {
  hasNext: boolean;
  slicestring: string;
  stringOfElements: string;
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

const fetchCategoryData = async (
  categoryId: string
): Promise<CategoryData[]> => {
  const token = getAccessToken();

  const response = await fetch(
    `http://52.79.91.214:8080/booths/products/category?category_id=2&page=0`, // GET 요청에 query params 사용
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

export function useCategoryGoods(categoryId: string) {
  const { isLoading, isError, data, refetch } = useQuery<CategoryData[]>({
    queryKey: ["getCategoryGoods", categoryId],
    queryFn: () => fetchCategoryData(categoryId),
  });
  return { isLoading, isError, data, refetch };
}
