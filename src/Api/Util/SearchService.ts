import { getAccessToken } from "./token";

export interface SearchEvent {
  id: number;
  name: string;
  mainImageUrl: string;
  openDate: string;
  closeDate: string;
  recruitStartDate: string;
  recruitEndDate: string;
  tags?: string[];
}

export interface SearchBooth {
  id: number;
  name: string;
  eventName: string;
  openDate: string;
  closeDate: string;
  mainImageUrl: string;
  tags?: string[];
}

export interface SearchEventResponse {
  hasNext: boolean;
  sliceNumber: number;
  numberOfElements: number;
  content: SearchEvent[];
}

export interface SearchBoothResponse {
  hasNext: boolean;
  sliceNumber: number;
  numberOfElements: number;
  content: SearchBooth[];
}

export type OrderType = "최신순" | "오래된순";
export type EventSearchType = "eventName" | "tagName";
export type BoothSearchType = "boothName" | "tagName";

export const fetchSearchEvents = async (
  query: string,
  type: EventSearchType,
  sortOrder: OrderType,
  sliceNumber: number
): Promise<SearchEventResponse> => {
  const token = getAccessToken();
  const response = await fetch(
    `http://52.79.91.214:8080/events/search?page=${sliceNumber}&type=${type}&query=${encodeURIComponent(
      query
    )}&sort=${sortOrder === "최신순" ? "desc" : "asc"}`,
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

export const fetchSearchBooths = async (
  query: string,
  type: BoothSearchType,
  sliceNumber: number,
  sortOrder: OrderType
): Promise<SearchBoothResponse> => {
  const token = getAccessToken();
  const response = await fetch(
    `http://52.79.91.214:8080/booths/search?page=${sliceNumber}&type=${type}&query=${encodeURIComponent(
      query
    )}&sort=${sortOrder === "최신순" ? "desc" : "asc"}`,
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
