/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const oauth2 = (provider) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  margin: 10px;
  border: 1px solid black;
  width: 400px;
  height: 40px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const oauth2Text = css`
  padding-right: 20px;
`;

const OAuth2Button = ({ provider, onclick, children }) => {
  return (
    <div css={oauth2(provider)} onClick={onclick}>
      {children}
      <div css={oauth2Text}> Sign in with {provider}</div>
    </div>
  );
};

export default OAuth2Button;
