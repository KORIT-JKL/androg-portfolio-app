/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import impact from '../../img/impact (1).png';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartIsOpenState, setCategoryId } from "../../atoms/authAtoms";
import Cart from "../../pages/Cart/cart";

const header =css`
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
const subHeader =css`
    background-color: white;
    display: flex;
    width: 100%;
    height: 50px;
`;
const subHeaderList =css`
    display: flex;
    margin-left: 100px;
    align-items: center;

`;
const sublist =css`
    padding-left: 10px;
    padding-right: 60px;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        font-weight: 600;
    }
`;

const CommonHeader = () => {
  const [sbheader, setsbheader] = useState();
  const [CartIsOpen , setCartIsOpen] =useRecoilState(cartIsOpenState);
  const [categoryId, thisSetCategoryId] = useRecoilState(setCategoryId);
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  }
  const onClickNotice = () => {
    navigate("/page/notice");
    setsbheader(false);
  };
  const onClickCoustomer = () => {
    navigate("/page/customer");
    setsbheader(false);
  };
  const onClickShipping = () => {
    navigate("/page/shipping");
    setsbheader(false);
  };
  const onClickSizeGuide = () => {
    navigate("/page/sizeguide");
    setsbheader(false);
  };
  const onClickLegal = () => {
    navigate("/page/legal");
    setsbheader(false);
  };

  const onClickTees = (e) => {
    navigate(`/category/${e}`);
  }
  const onClickSwaets = (e) => {
    navigate(`/category/${e}`);
  }
  const onClickOuterwear = (e) => {
    navigate(`/category/${e}`);
  }
  const onClickPants = (e) => {
    navigate(`/category/${e}`);
  }
  const onClickHeadwear = (e) => {
    navigate(`/category/${e}`);
  }
  const onClickShoes = (e) => {
    navigate(`/category/${e}`);
  }

  return (
    <>
        {CartIsOpen ? <Cart /> : ""}
        
      <div css={header}>
        <div css={mainHeader}>
          <img src={impact} alt="logo" css={img} onClick={() => onClickLogo()} />
          <ul css={headerList}>
            <li css={list} onMouseOver={() => setsbheader(true)} onClick={() => setsbheader(true)}>
              SHOP
            </li>
            <li css={list} onMouseOver={() => setsbheader(false)} onClick={() => setsbheader(false)}>
              SUPPORT
            </li>
          </ul>
          <ul css={headerList2}>
            <li css={list}>SEARCH</li>
            <li css={list} onClick={() => setCartIsOpen(true)}>BAG</li>
          </ul>
        </div>
        <div css={subHeader}>
          {sbheader ? (
            <ul css={subHeaderList}>
              <li css={sublist}  onClick={() => onClickTees(1)}>tees</li>
              <li css={sublist}  onClick={() => onClickSwaets(2)}>swaets</li>
              <li css={sublist}  onClick={() => onClickOuterwear(3)}>outerwear</li>
              <li css={sublist}  onClick={() => onClickPants(4)}>pants</li>
              <li css={sublist}  onClick={() => onClickHeadwear(5)}>headwear</li>
              <li css={sublist}  onClick={() => onClickShoes(6)}>shoes</li>
              <li css={sublist}>all</li>
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
