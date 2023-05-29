/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';

const select = css`
  width: 600px;
  padding: 10px;
  outline: none;
  font-size: 12px;
`;

const Select = ({sido}) => {
    return (
        <>
            <select name="" id="" css={select} value={sido}>
                <option value="" disabled>시/도</option>
                <option value="강원">강원도</option>
                <option value="경기">경기도</option>
                <option value="경남">경상남도</option>
                <option value="경북">경상북도</option>
                <option value="광주">광주광역시</option>
                <option value="대구">대구광역시</option>
                <option value="대전">대전광역시</option>
                <option value="부산">부산광역시</option>
                <option value="서울">서울특별시</option>
                <option value="세종">세종특별자치시</option>
                <option value="울산">울산광역시</option>
                <option value="인천">인천광역시</option>
                <option value="전남">전라남도</option>
                <option value="전북">전라북도</option>
                <option value="제주">제주특별자치도</option>
                <option value="충남">충청남도</option>
                <option value="충북">충청북도</option>
            </select>
        </>
    );
};

export default Select;