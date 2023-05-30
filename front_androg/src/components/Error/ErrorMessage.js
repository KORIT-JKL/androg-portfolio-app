/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const errorMsg = css`
  position: relative;
  font-size: 12px;
  color: red;
`;

const ErrorMessage = ({ children }) => {
  return <div css={errorMsg}>{children}</div>;
};

export default ErrorMessage;
