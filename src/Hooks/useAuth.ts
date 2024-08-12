import { useState, useEffect } from "react";
import { getAccessToken, removeAccessToken } from "../Api/Util/token";

interface AuthResponse {
  role: string;
  nickname: string;
}

export function useAuth() {
  const [role, setRole] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = getAccessToken();
        const response = await fetch(
          "http://52.79.91.214:8080/user/access_token_info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data: AuthResponse = await response.json();
          setRole(data.role);
          setNickname(data.nickname);
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

  return { role, nickname, loading };
}
