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
      console.log(option);
      const response = await axios.get("http://localhost:8080/auth/authenticated", option);
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          console.log(response.data);
          if (response.data) {
            setAuthState(true);
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
        console.log(response);
        const roles = response.data.authorities.split(",");
        if (roles.includes("ROLE_ADMIN")) {
          setAdminState(true);
        }
      },
      enabled: !!localStorage.getItem("accessToken"),
    }
  );
  // useEffect(() => {}, []);
  // console.log(authState);
  const authenticatedPaths = ["/mypage", "/user", "/product", "/cart"];
  const authPath = "/auth";
  const adminPath = "/admin";
  if (authenticated.isLoading && principal.isLoading) {
    return <></>;
  }

  if (principal.data !== undefined) {
    console.log("admin:" + adminState);
    if (path.startsWith(adminPath) && !adminState) {
      console.log("admin페이지 접속 제한");
      navigate("/");
    }
  }

  if (authState && path.startsWith(authPath)) {
    console.log("로그인 했을때");
    // navigate("/");
  }
  if (!authState && authenticatedPaths.filter((authenticatedPath) => path.startsWith(authenticatedPath)).length > 0) {
    console.log("....토큰이 없음");
    navigate("/auth/login");
  }

  return element;
};

export default AuthRoute;
