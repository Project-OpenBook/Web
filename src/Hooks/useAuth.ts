import { useState, useEffect } from "react";
import { getAccessToken, removeAccessToken } from "../Api/Util/token";

interface AuthResponse {
  role: string;
  nickname: string;
  id: number;
}

export function useAuth() {
  const [role, setRole] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = getAccessToken();
        const response = await fetch(
          "http://52.79.91.214:8080/user/access_token_info",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data: AuthResponse = await response.json();
          // 여기서 상태 업데이트 전 변수에 값을 저장
          const userId = data.id;
          const userRole = data.role;
          const userNickname = data.nickname;

          // 나중에 상태 업데이트
          setId(userId);
          setRole(userRole);
          setNickname(userNickname);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error("Failed to fetch role:", error);
        setRole(null);
        setNickname(null);
        removeAccessToken();
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, nickname, id, loading };
}
