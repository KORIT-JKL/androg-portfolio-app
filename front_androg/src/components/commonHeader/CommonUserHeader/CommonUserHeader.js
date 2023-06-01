/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonUserSubHeader from "../CommonUserSubHeader/CommonUserSubHeader";
import { useRecoilState } from "recoil";
import impact from "../../../img/ANDROG 1.png";
import { useQuery } from "react-query";
import axios from "axios";
import {
  adminAuthenticationState,
  authenticationState,
  loginState,
} from "../../../atoms/Auth/AuthAtoms";
import { setRefresh, setsbheader } from "../../../atoms/Common/CommonAtoms";
import { cartIsOpenState } from "../../../atoms/Cart/CartAtoms";
import {
  SetSearchInput,
  setPage,
  setProducts,
  setSearchParams,
} from "../../../atoms/Product/ProductAtoms";
import { FaHome } from "react-icons/fa";
const header = css`
  position: fixed;
  flex-direction: column;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
`;

const mainHeader = css`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  background-color: white;
`;

const headerList = css`
  display: flex;
  align-items: center;
  width: 1400px;
  margin-left: 30px;
`;

const headerList2 = css`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 50px;
`;

const list = css`
  width: 80px;
  padding: 0px 10px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const listLogin = css`
  text-decoration-line: none;
`;

const img = css`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100px;
  height: 40px;
  padding-left: 50px;
  &:hover {
    font-weight: 600;
  }
`;

const CommonUserHeader = () => {
  const [inputIsOpen, setInputIsOpen] = useState(false);
  const [, thisSetSearchInput] = useRecoilState(SetSearchInput);
  const [loginIsState, setLoginIsState] = useRecoilState(loginState);
  const [, setAdminState] = useRecoilState(adminAuthenticationState);
  const [authState] = useRecoilState(authenticationState);
  const [sbheader, setThissbheader] = useRecoilState(setsbheader);
  const [, setThiRefresh] = useRecoilState(setRefresh);
  const [, setCartIsOpen] = useRecoilState(cartIsOpenState);
  const [, setThisProducts] = useRecoilState(setProducts);
  const [, setThisSearchParams] = useRecoilState(setSearchParams);
  const [userAuthority, setUserAuthority] = useState("");
  const [getauthority, Setgetauthority] = useState(true);

  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };
  const authority = useQuery(
    ["authority"],
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
        setUserAuthority(response.data.authorities);
        if (!!userAuthority) {
          Setgetauthority(false);
        }
      },
      enabled: getauthority && !!localStorage.getItem("accessToken"),
    }
  );

  const EnterKeyDown = (e) => {
    if (e.key === "Enter") {
      setThisSearchParams({
        setSearchPage: 1,
        setSearchInput: e.target.value,
      });
      setThisProducts([]);
      setThiRefresh(true);
      navigate("/auth/products/search");
    }
  };
  const searchClick = (inputIsOpen) => {
    thisSetSearchInput("");
    setInputIsOpen(!inputIsOpen);
  };
  const cartOpen = () => {
    setCartIsOpen(true);
    setThiRefresh(true);
  };

  const logoutClickHandle = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      setLoginIsState(false);
      setAdminState(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!!localStorage.getItem("accessToken")) {
      setLoginIsState(true);
    }
  }, [loginIsState]);

  if (authority.isLoading) {
    return <></>;
  }

  return (
    <>
      <div css={mainHeader}>
        {/* <img src={impact}  */}
        {/* <FaHome css={img}  */}

        <div css={img} onClick={() => onClickLogo()}>
          HOME
        </div>

        {authState ? (
          <>
            <ul css={headerList}>
              <li css={list} onMouseOver={() => setThissbheader(1)}>
                SHOP
              </li>
              <li css={list} onMouseOver={() => setThissbheader(0)}>
                SUPPORT
              </li>
            </ul>
            <ul css={headerList2}>
              {userAuthority === "ROLE_ADMIN" ? (
                <li css={list} onClick={() => navigate("/admin")}>
                  관리자
                </li>
              ) : (
                ""
              )}
              {inputIsOpen ? (
                <input
                  placeholder="대문자로 입력해주세요"
                  type="text"
                  id="searchInputText"
                  onKeyDown={EnterKeyDown}
                />
              ) : (
                ""
              )}
              <li css={list} onClick={() => searchClick(inputIsOpen)}>
                SEARCH
              </li>
              <li css={list} onClick={logoutClickHandle}>
                LOGOUT
              </li>
              <li css={list} onClick={() => navigate("/user/mypage")}>
                MYPAGE
              </li>
              <li css={list} onClick={cartOpen}>
                BAG
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul css={headerList}>
              <li css={list} onMouseOver={() => setThissbheader(1)}>
                SHOP
              </li>
              <li css={list} onMouseOver={() => setThissbheader(0)}>
                SUPPORT
              </li>
            </ul>
            <ul css={headerList2}>
              {inputIsOpen ? (
                <input
                  placeholder="대문자로 입력해주세요"
                  type="text"
                  id="searchInputText"
                  onKeyDown={EnterKeyDown}
                />
              ) : (
                ""
              )}
              <li css={list} onClick={() => searchClick(inputIsOpen)}>
                SEARCH
              </li>
              <li css={list}>
                <Link to="/auth/login" css={listLogin}>
                  LOGIN
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
      <CommonUserSubHeader sbheader={sbheader} />
    </>
  );
};

export default CommonUserHeader;
