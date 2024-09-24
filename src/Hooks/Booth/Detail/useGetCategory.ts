import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";

export interface CategoryData {
  id: string;
  name: string;
  description: string;
}

const fetchCategoryData = (boothId: string): Promise<CategoryData[]> => {
  const token = getAccessToken();

  const response = fetch(
    `http://52.79.91.214:8080/booths/${boothId}/product-category`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });
  return response;
};

export function useCategoryList(boothId: string) {
  const { isLoading, isError, data, refetch } = useQuery<CategoryData[]>({
    queryKey: ["getCategoryList", boothId],
    queryFn: () => fetchCategoryData(boothId),
  });
  return { isLoading, isError, data, refetch };
}
