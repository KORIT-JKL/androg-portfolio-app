/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import ReviewUpdateModal from "./ReviewUpdateModal";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { SetAdminReviews } from "../../atoms/Product/ProductAtoms";
import { authenticationState } from "../../atoms/Auth/AuthAtoms";
import { FiCornerDownRight } from "react-icons/fi";

const reviewContainer = css`
  margin: 10px 0px 10px 0px;
  padding: 0px 10px 10px 10px;
  width: 100%;
  height: 100%;
  background-color: #aaa;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  width: 30%;
`;
const reviewDate = css`
  padding: 20px;
`;

const reviewContent = css`
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  font-size: 17px;
  background-color: #dbdbdb;
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
  display: flex;
  align-items: center;
`;
const adminReviewText = css`
  border-radius: 5px;
  margin: 5px 0px 10px 20px;
  width: 100%;
  background-color: #dbdbdb;
`;

const imgBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  overflow: hidden;
`;
const img = css`
  width: 100%;
  object-fit: cover;
`;

const ReviewComponent = ({ review }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminReviews] = useRecoilState(SetAdminReviews);
  const [authState] = useRecoilState(authenticationState);
  const [userId, setUserId] = useState(0);
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
      const response = await axios.get("http://localhost:8080/auth/principal", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setUserId(response.data.userId);
      },
      onError: () => {
        setUserId(0);
      },
      enabled: !!localStorage.getItem("accessToken"),
    }
  );
  if (principal.isLoading) {
    return <></>;
  }
  return (
    <div css={reviewContainer}>
      <div css={reviewTitle}>
        <div css={reviewUser}>
          <div css={imgBox}>
            <img
              css={img}
              src={"http://localhost:8080/image/profile/" + review.profileImg}
              alt=""
            />
          </div>
          {review.userName}
        </div>
        <div css={reviewDate}>{review.reviewDate}</div>
      </div>
      <div css={reviewContent}>
        {review.content}
        <div css={reviewBtnBox}>
          {userId === review.userId && authState ? (
            <button css={reviewUpdateButton} onClick={handleOpenModal}>
              리뷰 수정
            </button>
          ) : (
            ""
          )}

          {isModalOpen && (
            <ReviewUpdateModal onClose={() => setIsModalOpen(false)} review={review} />
          )}
        </div>
      </div>

      <div css={adminReviewContainer}>
        {adminReviews.map((adminReview) =>
          adminReview.reviewId === review.reviewId ? (
            <div css={adminReviewText}>
              {" "}
              <FiCornerDownRight /> 관리자 : {adminReview.reviewContent}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
