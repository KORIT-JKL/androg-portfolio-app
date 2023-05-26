import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { adminAuthenticationState, authenticationState } from "../../../atoms/Auth/AuthAtoms";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({ path, element }) => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const [adminState, setAdminState] = useRecoilState(adminAuthenticationState);
  const navigate = useNavigate();
  const authenticated = useQuery(
    ["authenticated"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };

      return await axios.get("http://localhost:8080/auth/authenticated", option);
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          if (response.data) {
            setAuthState(true);
          } else {
            setAuthState(false);
          }
        }
      },
    }
  );

  const principal = useQuery(
    ["principal"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://localhost:8080/auth/principal", option);
      return response;
    },
    {
      onSuccess: (response) => {
        const roles = response.data.authorities.split(",");
        if (roles.includes("ROLE_ADMIN")) {
          setAdminState(true);
        }
      },
      enabled: !!localStorage.getItem("accessToken"),
    }
  );

  const authenticatedPaths = ["/mypage", "/user", "/product", "/cart"];
  const authPath = "/auth";
  const adminPath = "/admin";
  if (authenticated.isLoading && principal.isLoading) {
    return <></>;
  }
  console.log(authState + "지금 상태");
  if (principal.data !== undefined) {
    if (path.startsWith(adminPath) && !adminState) {
      navigate("/");
      console.log("admin권한없음");
    }
  }

  if (authState && path.startsWith(authPath)) {
    navigate("/");
    console.log("로그인 했을때");
  }
  if (!authState && authenticatedPaths.filter((authenticatedPath) => path.startsWith(authenticatedPath)).length > 0) {
    console.log("인증받지 않은 유저 혹은 로그인을 안했을때");
    navigate("/auth/login");
  }

  return element;
};

export default AuthRoute;
