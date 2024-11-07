import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../../Api/Util/token";

interface GoodsData {
  category: Category;
  products: Products;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface Products {
  hasNext: boolean; // 대소문자 맞춤
  sliceNumber: number; // 숫자형으로 변경
  numberOfElements: number; // 숫자형으로 변경
  content: Content[];
}

interface Content {
  id: string;
  name: string;
  description: string;
  stock: number; // 숫자형으로 변경
  price: number; // 숫자형으로 변경
  images:
    | {
        id: string;
        url: string;
      }[]
    | [];
}

const fetchGoodsData = (boothId: string): Promise<GoodsData[]> => {
  const token = getAccessToken();
  const response = fetch(
    `http://52.79.91.214:8080/booths/${boothId}/products`,
    {
      method: "GET",
    }
  ).then((response) => {
    if (!response.ok) throw new Error("err");
    return response.json();
  });
  return response;
};

export function useGetGoodsList(boothId: string) {
  const { isLoading, isError, data, refetch } = useQuery<GoodsData[]>({
    queryKey: ["getGoodsList", boothId],
    queryFn: () => fetchGoodsData(boothId),
  });
  return { isLoading, isError, data, refetch };
}
