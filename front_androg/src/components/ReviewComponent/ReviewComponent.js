/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const reviewContainer = css`
  margin: 10px 0px 10px 0px;
  border: 1px solid black;
  padding-bottom: 10px;
  width: 100%;
  height: 100px;
  padding-left: 10px;
`;
const reviewTitle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  margin-top: 5px;
`;
const reviewUser = css`
  font-size: 15px;
  padding: 5px;
  padding-top: 15px;
`;
const reviewDate = css`
  padding: 20px;
`;

const reviewContent = css`
  padding: 10px 5px;
  font-size: 17px;
`;

const ReviewComponent = ({ review }) => {
  return (
    <div css={reviewContainer}>
      <div css={reviewTitle}>
        <div css={reviewUser}>작성자 : {review.userName} </div>
        <div css={reviewDate}> 등록일 : 2023-05-18</div>
      </div>
      <div css={reviewContent}>내용 : {review.content}</div>
    </div>
  );
};

export default ReviewComponent;
