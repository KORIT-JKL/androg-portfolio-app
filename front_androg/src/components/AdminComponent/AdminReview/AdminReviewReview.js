/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
const cotainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  height: 100%;
  width: 80%;
`;
const reviewReviewContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 20px;
`;
const reveiwSelectButton = css`
  font-size: 50px;
  line-height: 50px; /* 텍스트 수직 가운데 정렬 */
  padding: 10px 30px;
  border: none;
  border-radius: 15px;
  background-color: white;
  margin: 0px 20px;
  &:hover {
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #fafafa;
  }
`;
const reviewContainer = css`
  display: flex;
  width: 100%;
  height: 40px;
  border: 1px solid black;
`;

const reviewName = css`
  text-align: center;
  width: 15%;
`;
const reviewProductName = css`
  text-align: center;
  width: 15%;
`;
const reviewContent = css`
  text-align: center;
  width: 55%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;
const reviewDate = css`
  text-align: center;
  width: 15%;
`;
const AdminReviewReview = () => {
  const [reviewTextSelect, SetReviewTextSelect] = useState(0);
  console.log(reviewTextSelect);
  return (
    <div css={cotainer}>
      <div css={reviewReviewContainer}>
        <button css={reveiwSelectButton} onClick={() => SetReviewTextSelect(0)}>
          답변
        </button>
        <button css={reveiwSelectButton} onClick={() => SetReviewTextSelect(1)}>
          미답변
        </button>
      </div>
      {reviewTextSelect === 0 ? (
        <div css={reviewContainer}>
          <div css={reviewName}>작성자</div>
          <div css={reviewProductName}>상품 이름</div>
          <div css={reviewContent}>리뷰 내용</div>
          <div css={reviewContent}>답변 내용</div>
          <div css={reviewDate}>작성 날짜</div>
        </div>
      ) : (
        <div css={reviewContainer}>
          <div css={reviewName}>작성자</div>
          <div css={reviewProductName}>상품 이름</div>
          <div css={reviewContent}>리뷰 내용</div>
          <div css={reviewDate}>작성 날짜</div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewReview;
