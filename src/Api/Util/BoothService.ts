// import { getAccessToken } from "./token";

export interface Booth {
  id: number;
  name: string;
  eventName: string;
  openDate: string;
  closeDate: string;
  mainImageUrl: string;
  tags?: string[];
}

export interface BoothResponse {
  hasNext: boolean;
  sliceNumber: number;
  numberOfElements: number;
  content: Booth[];
}

export type OrderType = "최신순" | "오래된순";

export const fetchBooths = async (
  sliceNumber: number,
  sortOrder: OrderType,
  event?: number | string | null
): Promise<BoothResponse> => {
  let query = `http://52.79.91.214:8080/booths?page=${sliceNumber}&sort=openTime%2C${
    sortOrder === "최신순" ? "DESC" : "ASC"
  }&progress=ongoing`;
  if (event) {
    query += `&event=${event}`;
  }
  const response = await fetch(query, {
    method: "GET",
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
