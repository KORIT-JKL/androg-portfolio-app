/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import { async } from "q";
import React, { useState } from "react";
import { useQuery } from "react-query";
const Cotainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  height: 100%;
  width: 90%;
  border: 1px solid black;
`;

const reviewContainer = css`
  display: flex;
  width: 100%;
  height: 40px;
  border: 1px solid #dbdbdb;
`;
const reviewId = css`
  width: 10%;
  text-align: center;
`;
const reviewName = css`
  width: 10%;
  text-align: center;
`;
const reviewProductName = css`
  width: 20%;
  text-align: center;
`;
const reviewContent = css`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
`;
const reviewDate = css`
  width: 10%;
  text-align: center;
`;
const reviewDelteButton = css`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #fafafa;
  }
`;
const AdminReviewDelete = () => {
  const [refresh, setRefresh] = useState(true);
  const [reviews, setReviews] = useState([]);
  const getreviews = useQuery(
    ["getreviews"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://localhost:8080/admin/reviews", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setReviews(response.data);
        setRefresh(false);
      },
    }
  );
  const reviewDelete = async (e) => {
    const option = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
      params: {
        reviewID: e,
      },
    };
    if (window.confirm("삭제하시겠습니까?")) {
      const response = await axios.delete("http://localhost:8080/admin/reviews/delete", option);
      setRefresh(true);
      alert("삭제 완료");
      return response;
    } else {
      alert("삭제 취소");
      return null;
    }
  };
  return (
    <div css={Cotainer}>
      <div css={reviewContainer}>
        <div css={reviewId}>리뷰 Id</div>
        <div css={reviewName}>작성자</div>
        <div css={reviewProductName}>상품 이름</div>
        <div css={reviewContent}>리뷰 내용</div>
        <div css={reviewDate}>작성 날짜</div>
        {/* <button css={reviewDelteButton}>X</button> */}
      </div>
      {!!reviews ? (
        <>
          {reviews.map((review) => (
            <div css={reviewContainer}>
              <div css={reviewId}>{review.reviewId}</div>
              <div css={reviewName}>{review.name}</div>
              <div css={reviewProductName}>{review.productName}</div>
              <div css={reviewContent}>{review.content}</div>
              <div css={reviewDate}>{review.date}</div>
              <button onClick={(e) => reviewDelete(e.target.value)} value={review.reviewId} css={reviewDelteButton}>
                X
              </button>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminReviewDelete;
