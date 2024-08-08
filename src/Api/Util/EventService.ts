import { getAccessToken } from "./token";

export interface Event {
  id: number;
  name: string;
  mainImageUrl: string;
  openDate: string;
  closeDate: string;
  recruitStartDate: string;
  recruitEndDate: string;
  tags: string[];
}

export interface EventResponse {
  hasNext: boolean;
  sliceNumber: number;
  numberOfElements: number;
  content: Event[];
}

export type OrderType = "최신순" | "오래된순";

export const fetchEvents = async (
  sliceNumber: number,
  sortOrder: OrderType,
  progress: string
): Promise<EventResponse> => {
  const token = getAccessToken();
  const response = await fetch(
    `http://52.79.91.214:8080/events?page=${sliceNumber}&sort=openDate%2C${
      sortOrder === "최신순" ? "DESC" : "ASC"
    }&progress=${progress}`,
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
