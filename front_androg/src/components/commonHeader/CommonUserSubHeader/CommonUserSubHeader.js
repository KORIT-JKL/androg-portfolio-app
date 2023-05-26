/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { setRefresh, setsbheader } from "../../../atoms/Common/CommonAtoms";
import { setPage, setProducts } from "../../../atoms/Product/ProductAtoms";
/*
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
`;*/
const subHeader = css`
  background-color: white;
  display: flex;
  width: 100%;
  height: 50px;
  z-index: 100;
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
const CommonUserSubHeader = ({ sbheader }) => {
  const [, setThiRefresh] = useRecoilState(setRefresh);
  const [, setThisProducts] = useRecoilState(setProducts);
  const [, setThisPage] = useRecoilState(setPage);
  const [, setThissbheader] = useRecoilState(setsbheader);
  const navigate = useNavigate();
  const onClickNotice = () => {
    navigate("/page/notice");
    setThissbheader(0);
  };
  const onClickCoustomer = () => {
    navigate("/page/customer");
    setThissbheader(0);
  };
  const onClickShipping = () => {
    navigate("/page/shipping");
    setThissbheader(0);
  };
  const onClickSizeGuide = () => {
    navigate("/page/sizeguide");
    setThissbheader(0);
  };
  const onClickLegal = () => {
    navigate("/page/legal");
    setThissbheader(0);
  };

  const onClickCategory = (e) => {
    navigate(`/category/${e}`);
    setThisProducts([]);
    setThisPage(1);
    setThiRefresh(true);
  };

  return (
    <>
      <div css={subHeader}>
        {sbheader === 1 ? (
          <ul css={subHeaderList}>
            <li css={sublist} onClick={() => onClickCategory(1)}>
              TEES
            </li>
            <li css={sublist} onClick={() => onClickCategory(2)}>
              SWEATS
            </li>
            <li css={sublist} onClick={() => onClickCategory(3)}>
              PANTS
            </li>
            <li css={sublist} onClick={() => onClickCategory(4)}>
              OUTERWEAR
            </li>
            <li css={sublist} onClick={() => onClickCategory(5)}>
              HEADWEAR
            </li>
            <li css={sublist} onClick={() => onClickCategory(6)}>
              SHOES
            </li>
            <li css={sublist} onClick={() => onClickCategory(7)}>
              ALL
            </li>
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
    </>
  );
};

export default CommonUserSubHeader;
