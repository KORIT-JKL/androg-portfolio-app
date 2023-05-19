/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const checkbox = css`
  width: 20px;
  height: 20px;
`;

const Checkbox = ({ onChange, id }) => {
  return (
    <>
      <input type="checkbox" id={id} onChange={onChange} css={checkbox} />
    </>
  );
};

export default Checkbox;
