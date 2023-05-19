/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const input = css`
  height: 50px;
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 15px;
  text-align: left;
  margin-bottom: 20px;
`;

const AddressInput = ({ type, placeholder, onChange, name, value }) => {
  return (
    <>
      <input css={input} type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} />
    </>
  );
};

export default AddressInput;
