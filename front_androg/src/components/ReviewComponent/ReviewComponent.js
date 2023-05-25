/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import ReviewUpdateModal from "./ReviewUpdateModal";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { SetAdminReviews } from "../../atoms/Product/ProductAtoms";

const reviewContainer = css`
  margin: 10px 0px 10px 0px;
  border: 1px solid black;
  padding-bottom: 10px;
  width: 100%;
  height: 100%;
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
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  font-size: 17px;
`;

const reviewUpdateButton = css`
  width: 100px;
  height: 30px;
  background-color: black;
  font-size: 15px;
  font-weight: 300;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: grey;
  }
`;

const reviewBtnBox = css`
  display: flex;
  justify-content: flex-end;
`;
const adminReviewContainer = css`
  border-top: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const adminReviewText = css`
  padding: 10px 20px;
`;
const ReviewComponent = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [adminReviews, setThisAdminReviews] = useRecoilState(SetAdminReviews);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const principal = useQuery(
    ["principal"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      //마이페이지 조회 url /user/{userId}/mypage -> /user/mypage로 변경
      const response = await axios.get("http://localhost:8080/auth/principal", option);
      return response;
    },
    {
      onSuccess: (response) => {},
      enabled: !!localStorage.getItem("accessToken"),
    }
  );

  if (principal.isLoading) {
    return <></>;
  }
  console.log(review);
  return (
    <div css={reviewContainer}>
      <div css={reviewTitle}>
        <div css={reviewUser}>작성자 : {review.userName} </div>
        <div css={reviewDate}> 등록일 : {review.reviewDate}</div>
      </div>
      <div css={reviewContent}>내용 : {review.content}</div>
      <div css={reviewBtnBox}>
        {principal.data.data.userId === review.userId ? (
          <button css={reviewUpdateButton} onClick={handleOpenModal}>
            리뷰 수정
          </button>
        ) : (
          ""
        )}

        {isModalOpen && <ReviewUpdateModal onClose={() => setIsModalOpen(false)} review={review} />}
      </div>

      <div css={adminReviewContainer}>
        {adminReviews.map((adminReview) =>
          adminReview.reviewId === review.adminReviewId ? (
            <div css={adminReviewText}> ↪관리자 : {adminReview.reviewContent}</div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
