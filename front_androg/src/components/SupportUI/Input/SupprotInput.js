/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const input = css`
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  padding: 10px 5px;
  width: 400px;
  height: 30px;
  outline: none;
`;
const SupprotInput = ({ type, placeholder }) => {
  return (
    <>
      <input css={input} type={type} placeholder={placeholder} />
    </>
  );
};

export default SupprotInput;
