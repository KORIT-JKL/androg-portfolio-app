/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartIsOpenState, setRefresh, setSearchInput } from "../../atoms/authAtoms";
import { loginState, setPage, setProducts, setSearchParams } from "../../atoms/Auth/AuthAtoms";
import Cart from "../../pages/Cart/cart";
import CommonAdminHeader from "./CommonAdminHeader/CommonAdminHeader";
import CommonUserHeader from "./CommonUserHeader/CommonUserHeader";



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
