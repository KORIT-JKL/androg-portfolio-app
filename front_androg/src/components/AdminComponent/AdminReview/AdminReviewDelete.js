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
  width: 70%;
  border: 1px solid black;
`;

const reviewContainer = css`
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    &:first-of-type {
      font-weight: bold;
      line-height: 16.5px;
    }
    &:nth-of-type(2n) {
      color: #757575;
    }
  }
  th {
    background-color: #f2f2f2;
    font-weight: normal;
  }
`;

const reviewDelteButton = css`
  width: 70px;
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
      <table css={reviewContainer}>
        <thead>
          <tr>
            <th>리뷰 Id</th>
            <th>작성자</th>
            <th>상품 이름</th>
            <th>리뷰 내용</th>
            <th>작성 날짜</th>
            <th>리뷰 삭제</th>
          </tr>
        </thead>

        {!!reviews ? (
          <>
            {reviews.map((review) => (
              <tbody>
                <tr>
                  <td>{review.reviewId}</td>
                  <td>{review.userName}</td>
                  <td>{review.productName}</td>
                  <td>{review.content}</td>
                  <td>{review.date}</td>
                  <td>
                    <button
                      onClick={(e) => reviewDelete(e.target.value)}
                      value={review.reviewId}
                      css={reviewDelteButton}
                    >
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </>
        ) : (
          ""
        )}
      </table>
    </div>
  );
};

export default AdminReviewDelete;
