/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import impact from "../../img/impact (1).png";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartIsOpenState, setRefresh } from "../../atoms/authAtoms";
import { loginState } from "../../atoms/Auth/AuthAtoms";
import Cart from "../../pages/Cart/cart";

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
    /* text-decoration: underline; */
  }
`;

const img = css`
    cursor: pointer;
    width: 70px;
    height: 50px;
`;
const subHeader = css`
  background-color: white;
  display: flex;
  width: 100%;
  height: 50px;
`;
const subHeaderList = css`
  display: flex;
  margin-left: 100px;
  align-items: center;
`;
const sublist = css`
  padding-left: 10px;
  padding-right: 60px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const CommonHeader = () => {


  const [loginIsState, setLoginIsState] = useRecoilState(loginState);
  const [sbheader, setsbheader] = useState(false);
  const [refresh , setThiRefresh ] = useRecoilState(setRefresh);
  const [CartIsOpen , setCartIsOpen] =useRecoilState(cartIsOpenState);

  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  }
  const onClickNotice = () => {
    navigate("/page/notice");
    setsbheader(true);

  };
  const onClickCoustomer = () => {
    navigate("/page/customer");
    setsbheader(true);
  };
  const onClickShipping = () => {
    navigate("/page/shipping");
    setsbheader(true);
  };
  const onClickSizeGuide = () => {
    navigate("/page/sizeguide");
    setsbheader(true);
  };
  const onClickLegal = () => {
    navigate("/page/legal");
    setsbheader(true);
  };

 
          
  const onClickCategory = (e) => {
    navigate(`/category/${e}`);
    setThiRefresh(true);
  };
  
  return (
    <>  
    
        {CartIsOpen ? <Cart /> : ""}
        
      <div css={header}>
        <div css={mainHeader}>
          <img src={impact} alt="logo" css={img} onClick={() => onClickLogo()} />
          {loginIsState ? (
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
                <li css={list}>SEARCH</li>
                <li css={list} onClick={() => setLoginIsState(false)}>
                  LOGOUT
                </li>
                <li css={list} onClick={() => navigate("/page/mypage")}>
                  MYPAGE
                </li>
                <li css={list} onClick={() => setCartIsOpen(true)}>
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
                <li css={list}>SEARCH</li>
                <li css={list} onClick={() => setLoginIsState(true)}>
                  LOGIN
                </li>
                <li css={list} onClick={() => setCartIsOpen(true)}>
                  BAG
                </li>
              </ul>
            </>
          )}
        </div>
        <div css={subHeader}>
          {!sbheader ? (
            <ul css={subHeaderList}>
              <li css={sublist}  onClick={() => onClickCategory(1)}>tees</li>
              <li css={sublist}  onClick={() => onClickCategory(2)}>swaets</li>
              <li css={sublist}  onClick={() => onClickCategory(3)}>pants</li>
              <li css={sublist}  onClick={() => onClickCategory(4)}>outerwear</li>
              <li css={sublist}  onClick={() => onClickCategory(5)}>headwear</li>
              <li css={sublist}  onClick={() => onClickCategory(6)}>shoes</li>
              <li css={sublist}  onClick={() => onClickCategory(7)}>all</li>
            </ul>
          ) : (
            <ul css={subHeaderList}>
              <li css={sublist} onClick={onClickNotice}>
                NOTICE
              </li>
              <li css={sublist} onClick={onClickCoustomer}>
                CUSTOMER SUPPORT
              </li>
              <li css={sublist} onClick={onClickShipping}>
                SHIPPING & RETURNS
              </li>
              <li css={sublist} onClick={onClickSizeGuide}>
                SIZE GUIDE
              </li>
              <li css={sublist} onClick={onClickLegal}>
                LEGAL
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default CommonHeader;
