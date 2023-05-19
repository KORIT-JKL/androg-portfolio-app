import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authenticationState } from "../../../atoms/Auth/AuthAtoms";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({ path, element }) => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const navigate = useNavigate();
  const authenticated = useQuery(
    ["authenticated"],
    async () => {
      return await axios.get("http://localhost:8080/auth/authenticated", {
        params: { Authorization: localStorage.getItem("accessToken") },
      });
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
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
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.get("http://localhost:8080/auth/principal", option);
      return response;
    },
    {
      onSuccess: (response) => {
        console.log(response);
      },
      enabled: !!localStorage.getItem("accessToken"),
    }
  );
  // useEffect(() => {}, []);
  console.log(authState);
  const authenticatedPaths = ["/mypage", "/user", "/product", "/cart"];
  const authPath = "/auth";
  const adminPath = "/admin";
  // console.log(authState);
  if (authenticated.isLoading && principal.isLoading) {
    return <></>;
  }

  if (principal.data !== undefined) {
    const roles = principal.data.data.authorities.split(",");
    console.log(roles);
    if (path.startsWith(adminPath) && !roles.includes("ROLE_ADMIN")) {
      navigate("/");
    }
  }

  if (authState && path.startsWith(authPath)) {
    navigate("/");
  }
  if (!authState && authenticatedPaths.filter((authenticatedPath) => path.startsWith(authenticatedPath)).length > 0) {
    navigate("/auth/login");
  }

  return element;
};

export default AuthRoute;
