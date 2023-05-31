/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Input from "../../Input/Input";

const registerInput = css`
  position: relative;
  margin-bottom: 20px;
`;

const RegisterInput = ({ type, placeholder, onChange, name, disabled, value }) => {
  return (
    <div css={registerInput}>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default RegisterInput;
