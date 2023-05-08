/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const containerStyle = css`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const titleStyle = css`
  font-size: 24px;
  margin-bottom: 10px;
`;

const messageStyle = css`
  font-size: 18px;
  margin-bottom: 10px;
`;

const listItemStyle = css`
  margin-left: 20px;
  font-size: 16px;
  margin-bottom: 5px;
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
