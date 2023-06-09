/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Cart from "../../pages/Cart/cart";
import CommonAdminHeader from "./CommonAdminHeader/CommonAdminHeader";
import CommonUserHeader from "./CommonUserHeader/CommonUserHeader";
import { adminAuthenticationState, loginState } from "../../atoms/Auth/AuthAtoms";
import { cartIsOpenState } from "../../atoms/Cart/CartAtoms";
import { popUpState } from "../../atoms/Common/CommonAtoms";
import { AdminPopUp } from "../../atoms/Admin/AdminAtoms";
import { useQuery } from "react-query";
import axios from "axios";
import TokenExpiration from "../Token/TokenExpiration";

const header = css`
  position: sticky;
  top: 0; /* Adjust the top value as needed */
  flex-direction: column;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  z-index: 999;
`;
const popup = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: black;
  font-size: 15px;
  transition: transform 0.3s, opacity 0.3s;
  transform: translateY(0);
  opacity: 1;
`;
const popupContent = css`
  margin: 0px 10px 0px 10px;
  color: white;
`;
const popupButton = css`
  margin: 0px 10px 0px 10px;
  border: none;
  cursor: pointer;
  background-color: black;
  color: white;
  &:hover {
    font-weight: 600;
    text-decoration: underline;
  }
`;
const hiddenStyles = css`
  transition: 0.5s;
  transform: translateY(-30px);
`;

const CommonHeader = () => {
  const [loginIsState, setLoginIsState] = useRecoilState(loginState);
  const [adminState, setAdminState] = useRecoilState(adminAuthenticationState);
  const [CartIsOpen, setCartIsOpen] = useRecoilState(cartIsOpenState);
  const [isVisible, setIsVisible] = useRecoilState(popUpState);
  const [popUpList, setPopUpList] = useRecoilState(AdminPopUp);
  useEffect(() => {
    const storedValue = sessionStorage.getItem("isVisible");
    setIsVisible(storedValue ? JSON.parse(storedValue) : true); // Set to true if no stored value
  }, []);

  const authority = 0;
  const getPopUp = useQuery(
    ["userPopUpList"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://52.79.158.206/auth/pop-up", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setPopUpList(response.data);
      },
      enabled: isVisible,
    }
  );
  useEffect(() => {
    if (!!localStorage.getItem("accessToken")) {
      setLoginIsState(true);
    }
  }, [loginIsState]);
  const onClickPopCloseHandle = () => {
    setIsVisible((prevVisible) => {
      const newValue = !prevVisible;
      sessionStorage.setItem("isVisible", JSON.stringify(newValue));
      return newValue;
    });
  };
  if (getPopUp.isLoading) {
    return <></>;
  }
  return (
    <>
      {CartIsOpen ? <Cart /> : ""}

      <div css={[header, isVisible ? null : hiddenStyles]}>
        {popUpList.content !== undefined ? (
          <div css={[popup, isVisible ? null : hiddenStyles]}>
            <h2 css={popupContent}>{popUpList.content}</h2>
            <button css={popupButton} onClick={onClickPopCloseHandle}>
              닫기
            </button>
          </div>
        ) : (
          ""
        )}

        <CommonUserHeader />
      </div>
    </>
  );
};

export default CommonHeader;
