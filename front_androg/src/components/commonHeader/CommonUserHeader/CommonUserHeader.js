/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonUserSubHeader from '../CommonUserSubHeader/CommonUserSubHeader';
import { useRecoilState } from "recoil";
import { cartIsOpenState, setRefresh, setSearchInput } from "../../../atoms/authAtoms";
import { loginState, setPage, setProducts, setSearchParams } from "../../../atoms/Auth/AuthAtoms";
import impact from "../../../img/impact (1).png";
import { useQuery } from "react-query";
import axios from "axios";
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
  padding: 0px 10px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const img = css`
  cursor: pointer;
  width: 70px;
  height: 50px;
`;


const CommonUserHeader = () => {
    const [inputIsOpen, setInputIsOpen] = useState(false);
    const [searchInput, thisSetSearchInput] = useRecoilState(setSearchInput);
    const [loginIsState, setLoginIsState] = useRecoilState(loginState);
    const [sbheader, setsbheader] = useState(0);
    const [refresh, setThiRefresh] = useRecoilState(setRefresh);
    const [CartIsOpen, setCartIsOpen] = useRecoilState(cartIsOpenState);
    const [products, setThisProducts] = useRecoilState(setProducts);
    const [page, setThisPage] = useRecoilState(setPage);
    const [searchParams, setThisSearchParams] = useRecoilState(setSearchParams);
    const [ userAuthority , setUserAuthority] = useState()
    const navigate = useNavigate();
    const onClickLogo = () => {
        navigate("/");
      };
      const accessToken = localStorage.getItem("accessToken");
      const authority = useQuery(["authority"], async () => {
        
        const response = await axios.get("http://localhost:8080/auth/principal", {
        params: { accessToken }})
        return response ;

      },{
          enabled : !!accessToken,
          onSuccess : (response) => {
            console.log(response.data)
              setUserAuthority(response.authorities)
              console.log(userAuthority)

            
          }
      }
      )
   
      
      
      
      const EnterKeyDown = (e) => {
        if (e.key === "Enter") {
          setThisSearchParams({ setSearchPage: 1, setSearchInput: document.getElementById("searchInputText").value });
          console.log(searchParams);
          navigate("/products/search");
          setThisProducts([]);
          setThiRefresh(true);
        }
      };
      const searchClick = (inputIsOpen) => {
        thisSetSearchInput("");
        setInputIsOpen(!inputIsOpen);
      };
      const cartOpen = () => {
        setCartIsOpen(true);
        setThiRefresh(true);
      }
     
      const logoutClickHandle = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
          localStorage.removeItem("accessToken");
          setLoginIsState(false);
          navigate("/");
        }
      };
    
      useEffect(() => {
        if (!!localStorage.getItem("accessToken")) {
          setLoginIsState(true);
        }
      },[loginIsState])
    if(authority.isLoading){
      return <>로딩중</>;
    }
    return (
        <>
            <div css={mainHeader}>
            <img src={impact} alt="logo" css={img} onClick={() => onClickLogo()} />
            {loginIsState ? (
                <>
                <ul css={headerList}>
                    <li css={list} onMouseOver={() => setsbheader(0)}>
                    SHOP
                    </li>
                    <li css={list} onMouseOver={() => setsbheader(1)}>
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
                    <li css={list} onClick={logoutClickHandle}>
                    LOGOUT
                    </li>
                    <li css={list} onClick={() => navigate("/mypage")}>
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
                    <li css={list} onMouseOver={() => setsbheader(false)}>
                    SHOP
                    </li>
                    <li css={list} onMouseOver={() => setsbheader(true)}>
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
                    <Link to="/login">LOGIN</Link>
                    </li>
                    <li css={list} onClick={cartOpen}>
                    BAG
                    </li>
                </ul>
                </>
            )}
            </div>
            <CommonUserSubHeader sbheader={sbheader}/>
            </>
    )

};

export default CommonUserHeader;