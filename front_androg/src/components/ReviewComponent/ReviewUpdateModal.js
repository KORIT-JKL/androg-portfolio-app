/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { setRefresh } from "../../atoms/Common/CommonAtoms";

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalContentStyle = css`
  width: 400px;
  height: 200px;
  background-color: white;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const modalButtonStyle = css`
  margin-left: 5px;

  font-size: 15px;
  font-weight: 300;

  width: 100px;
  height: 30px;

  background-color: black;
  color: white;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;

const reviewContent = css`
  width: 380px;
  height: 140px;
  resize: none;
  border: 1px solid black;
`;

const modalfooter = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReviewUpdateModal = ({ onClose, review }) => {
  const [updateContent, setUpdateContent] = useState("");
  const [reviews, setReviews] = useRecoilState(setRefresh);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month}-${day}`;

  const reviewUpdate = useMutation(
    async (review) => {
      const data = {
        reviewId: review.reviewId,
        reviewDate: formattedDate,
        content: updateContent,
      };
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.put("http://localhost:8080/product/review/modify", data, option);
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          onClose();
          setReviews(true);
        }
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    }
  );

  const onChangeHandle = (e) => {
    setUpdateContent(e.target.value);
  };

  return (
    <div>
      <div css={modalOverlayStyle}>
        <div css={modalContentStyle}>
          <textarea
            css={reviewContent}
            defaultValue={review.content}
            onChange={onChangeHandle}
            placeholder="내용을 입력해주세요(최소5자이상 최대20자이하)"
          ></textarea>
          <div css={modalfooter}>
            <span>수정일 : {formattedDate}</span>
            <button
              css={modalButtonStyle}
              onClick={() => {
                reviewUpdate.mutate(review);
              }}
            >
              수정
            </button>
            <button css={modalButtonStyle} onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewUpdateModal;
