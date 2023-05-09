/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const containerStyle = css`
  padding-bottom: 20px;
`;

const titleStyle = css`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const messageStyle = css`
  font-size: 13px;
  margin-bottom: 10px;
`;

const listItemStyle = css`
  margin-left: 20px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  font-size: 10px;
  list-style-type: circle;
`;

const Information = ({ title, message, listItems }) => {
  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>{title}</h2>
      <p css={messageStyle}>{message}</p>
      <ul>
        {listItems.map((item, index) => (
          <li key={index} css={listItemStyle}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Information;
