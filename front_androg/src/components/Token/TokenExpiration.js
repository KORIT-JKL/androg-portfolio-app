import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const TokenExpiration = ({ token }) => {
  const [expiration, setExpiration] = useState("");
  const tokenAuthenticated = useQuery(
    ["tokenAuthenticated"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://localhost:8080/token/authenticated", option);
      return response;
    },
    {
      onError: () => {
        if (window.confirm()) {
          localStorage.removeItem("accessToken");
          window.location.href = "http://localhost:3000";
        }
      },
      enabled: expiration === "Token Expired" && !!localStorage.getItem("accessToken"),
    }
  );
  useEffect(() => {
    if (token !== undefined) {
      const extractExpiration = () => {
        if (token) {
          try {
            const tokenParts = token.split(".");
            const payload = JSON.parse(atob(tokenParts[1]));
            const expirationTime = new Date(payload.exp * 1000);
            const now = new Date();
            const timeDiff = expirationTime.getTime() - now.getTime();

            if (timeDiff > 0) {
              const minutes = Math.floor(timeDiff / (1000 * 60));
              const seconds = Math.floor((timeDiff / 1000) % 60);

              setExpiration(`${minutes}분 ${seconds}초`);
            } else {
              setExpiration("Token Expired");
            }
          } catch (error) {
            console.error("Error decoding token:", error);
            setExpiration("Invalid Token");
          }
        }
      };

      const interval = setInterval(() => {
        extractExpiration();
      }, 1000);

      extractExpiration();

      return () => {
        clearInterval(interval);
      };
    }
  }, [token]);
  if (tokenAuthenticated.isLoading) {
    return <></>;
  }
  return <div>{!!localStorage.getItem("accessToken") ? `만료시간: ${expiration}` : ""}</div>;
};

export default TokenExpiration;
