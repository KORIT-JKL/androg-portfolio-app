import React from "react";
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
      const response = await axios.get("http://localhost:8080/auth/authenticated", option);
      return response;
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
        } else {
          setAdminState(false);
        }
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: !!localStorage.getItem("accessToken"),
    }
  );

  const authenticatedPaths = ["/mypage", "/user", "/product", "/cart"];
  const authPath = "/auth";
  const adminPath = "/admin";
  console.log(adminState);
  if (authenticated.isLoading && principal.isLoading) {
    return <></>;
  }

  if (path.startsWith(adminPath) && !adminState) {
    navigate("/");
  }

  if (authState && path.startsWith(authPath)) {
    if (path === "/auth/login") {
      navigate("/");
    }
    return element;
  }
  if (
    !authState &&
    authenticatedPaths.filter((authenticatedPath) => path.startsWith(authenticatedPath)).length > 0
  ) {
    navigate("/auth/login");
  }

  return element;
};

export default AuthRoute;
