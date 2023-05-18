/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from 'react';
import impact from "../../../img/impact (1).png";
import {  useNavigate } from "react-router-dom";
import CommonHeaderSubHeader from "../CommonAdminSubHeader.js/CommonAdminSubHeader";
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


const CommonAdminHeader = () => {
    const navigate = useNavigate();
    const [ subHeaderIndex , SetSubHeaderIndex ]= useState(0);
    const onClickLogo = () => {
        navigate("/");
      };

    return (
            <>
        <div css={mainHeader}>
          <img src={impact} alt="logo" css={img} onClick={() => onClickLogo()} />

              <ul css={headerList}>
                <li css={list} onMouseOver={() => SetSubHeaderIndex(0)} >
                  상품관리
                </li>
                <li css={list} onMouseOver={() => SetSubHeaderIndex(1)}>
                  리뷰관리
                </li>
                <li css={list} onMouseOver={() => SetSubHeaderIndex(2)}>
                  공지관리
                </li>
                <li css={list} onMouseOver={() => SetSubHeaderIndex(3)}>
                  문의관리
                </li>
              </ul>
        </div>
        <CommonHeaderSubHeader subHeaderIndex={subHeaderIndex}/>
        

    </>

    );
};

export default CommonAdminHeader;