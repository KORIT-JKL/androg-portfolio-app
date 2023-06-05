/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { authenticationState } from "../../atoms/Auth/AuthAtoms";

const box = css`
  margin: 0px 10px 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  font-weight: 600;
  text-decoration: underline;
`;

const TokenExpiration = ({ token }) => {
  const [expiration, setExpiration] = useState("");
  const [authState] = useRecoilState(authenticationState);
  const queryClient = useQueryClient();
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
              const hours = Math.floor(timeDiff / (1000 * 60 * 60));
              const minutes = Math.floor(timeDiff / (1000 * 60));
              const seconds = Math.floor((timeDiff / 1000) % 60);

              setExpiration(`${hours}시 ${minutes}분 ${seconds}초`);
            } else {
              setExpiration("Token Expired");
              localStorage.removeItem("accessToken");
              queryClient.fetchQuery("tokenAuthenticated");
              queryClient.fetchQuery("authenticated");
              console.log("멈춤");
              clearInterval(interval);
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
  return <div css={box}>{authState === true ? `만료시간: ${expiration}` : ""}</div>;
};

export default TokenExpiration;
