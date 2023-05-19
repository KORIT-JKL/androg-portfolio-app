/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import Cart from "../../pages/Cart/cart";
import CommonAdminHeader from "./CommonAdminHeader/CommonAdminHeader";
import CommonUserHeader from "./CommonUserHeader/CommonUserHeader";
import { loginState } from "../../atoms/Auth/AuthAtoms";
import { cartIsOpenState } from "../../atoms/Cart/CartAtoms";



const header = css`
  position: fixed;
  flex-direction: column;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
`;



const CommonHeader = () => {

  const [loginIsState, setLoginIsState] = useRecoilState(loginState);
  const [CartIsOpen, setCartIsOpen] = useRecoilState(cartIsOpenState);
  const authority = 0;
  
  useEffect(() => {
    if (!!localStorage.getItem("accessToken")) {
      setLoginIsState(true);
    }
  },[loginIsState])
  return (
    <>
      {CartIsOpen ? <Cart /> : ""}

      <div css={header}> 
      {/* authority가 1일땐 관리자 */}
        {authority == 1 ?
        <CommonAdminHeader /> : <CommonUserHeader />
        }
      </div>
    </>
  );
};

export default CommonHeader;
