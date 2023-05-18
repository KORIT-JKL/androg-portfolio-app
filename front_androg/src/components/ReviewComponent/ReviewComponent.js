/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const reviewContainer = css`
  margin: 10px 0px 10px 0px;
  padding-bottom: 10px;
  border: 1px solid black;
  width: 100%;
  height: 100px;
`;

const ReviewComponent = ({ review }) => {
  return (
    <div css={reviewContainer}>
      <div>작성자 : {review.userName} </div>
      <div>내용 : {review.content}</div>
    </div>
  );
};

export default ReviewComponent;
