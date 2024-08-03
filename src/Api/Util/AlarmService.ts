import { getAccessToken } from "./token";

export interface Alarm {
  id: number;
  content_name: string;
  message: string;
  registeredAt: string;
}

export interface AlarmResponse {
  hasNext: boolean;
  sliceNumber: number;
  numberOfElements: number;
  content: Alarm[];
}

export const fetchAlarms = async (
  sliceNumber: number
): Promise<AlarmResponse> => {
  const token = getAccessToken();
  const response = await fetch(
    `http://52.79.91.214:8080/alarms?page=${sliceNumber}&sort=registeredAt%2CDESC`,
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

export const deleteAlarm = async (id: number): Promise<void> => {
  const token = getAccessToken();
  const response = await fetch(`http://52.79.91.214:8080/alarms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete alarm");
  }
};

export const deleteAllAlarms = async (): Promise<void> => {
  const token = getAccessToken();
  const response = await fetch(`http://52.79.91.214:8080/alarms`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete all alarms");
  }
};
