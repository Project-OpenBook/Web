import { getAccessToken } from "./token";

export interface Booth {
  id: number;
  name: string;
  eventName: string;
  openDate: string;
  closeDate: string;
  mainImageUrl: string;
}

export interface BoothResponse {
  hasNext: boolean;
  sliceNumber: number;
  numberOfElements: number;
  content: Booth[];
}

export const fetchBooths = async (
  sliceNumber: number,
  sortOrder: string
): Promise<BoothResponse> => {
  const token = getAccessToken();
  const response = await fetch(
    `http://52.79.91.214:8080/booths?page=${sliceNumber}&sort=openTime%2C${
      sortOrder === "최신순" ? "DESC" : "ASC"
    }&progress=ongoing`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
