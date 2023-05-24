/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
const cotainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  height: 100%;
  width: 70%;
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
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #fafafa;
  }
`;
const reviewTitleContainer = css`
  display: flex;
  width: 100%;
  height: 25px;
  border: 1px solid black;
`;

const reviewNameTitle = css`
  text-align: center;
  width: 15%;
`;
const reviewProductNameTitle = css`
  text-align: center;
  width: 15%;
`;
const reviewContentTitle = css`
  text-align: center;
  width: 55%;
  text-align: center;
`;
const reviewDate = css`
  text-align: center;
  width: 15%;
`;
const reviewContainer = css`
  display: flex;
  width: 100%;
  height: 40px;
  border: 1px solid #dbdbdb;
`;
const reviewName = css`
  width: 15%;
  text-align: center;
`;
const reviewProductName = css`
  width: 15%;
  text-align: center;
`;
const reviewContent = css`
  width: 55%;
  text-align: center;
`;
const inputButton = css`
  text-align: center;
  width: 10%;
  background-color: white;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #fafafa;
  }
`;
const inputButtonTitle = css`
  text-align: center;
  width: 10%;
`;
const adminReviewModalContainer = css`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00000099;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const adminReviewModal = css`
  height: 70%;
  width: 40%;
  background-color: white;
`;
const modalTitle = css`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
`;
const modalname = css`
  width: 100%;
  height: 40px;
  font-size: 25px;
  text-align: center;
`;
const modalProductName = css`
  width: 100%;
  height: 40px;
  font-size: 25px;
  text-align: center;
`;
const modalContent = css`
  width: 100%;
  height: 40px;
  font-size: 20px;
  text-align: center;
`;

const modalbody = css`
  display: flex;
  width: 100%;
  height: 60%;
  border-bottom: 1px solid #dbdbdb;
`;

const modalreviewContent = css`
  height: 100%;
  width: 100%;
  font-size: 30px;
  display: flex;
  flex-wrap: wrap;
  border: none;
`;
const modalFooter = css`
  display: flex;
  justify-content: space-between;

  align-items: center;
  width: 100%;
  height: 20%;
`;
const reviewbutton = css`
  margin: 10px 20px;
  height: 100px;
  width: 200px;
  background-color: white;
  cursor: pointer;
  font-size: 25px;
  &:hover {
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #fafafa;
  }
`;
const AdminReviewReview = () => {
  const [reviewTextSelect, SetReviewTextSelect] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reviewParams, setReviewParams] = useState({ reviewId: 0, content: "" });
  const [selectReview, setSelectReivew] = useState({ reviewId: 0, name: "", productName: "", content: "" });
  const [modifyModalIsOpen, setModifyModalIsOpen] = useState(false);
  const [reviewModifyParams, setReviewModifyParams] = useState({ reviewId: 0, content: "" });
  const [selectModifyReview, setSelectModifyReview] = useState({
    reviewId: 0,
    name: "",
    productName: "",
    content: "",
    reviewContent: "",
  });
  const registerReview = async () => {
    const option = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
      params: {
        reviewId: reviewParams.reviewId,
        content: reviewParams.content,
      },
    };
    const response = await axios.post("http://localhost:8080/admin/reviews/review/register", "", option);
    setSelectReivew({ reviewId: 0, name: "", productName: "", content: "" });
    setReviewParams({ reviewId: 0, content: "" });
    setModalIsOpen(false);
    alert("리뷰 등록 완료");
    setRefresh(true);
    return response;
  };
  const modifyReview = async () => {
    const option = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
      params: {
        reviewId: reviewModifyParams.reviewId,
        content: reviewModifyParams.content,
      },
    };
    const response = await axios.put("http://localhost:8080/admin/reviews/review/modify", "", option);
    setReviewModifyParams({ reviewId: 0, name: "", productName: "", content: "" });
    setReviewModifyParams({ reviewId: 0, content: "" });
    setModifyModalIsOpen(false);
    alert("리뷰 수정 완료");
    setRefresh(true);
    return response;
  };
  const getReviews = useQuery(
    ["getReviews"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
        params: {
          answer: reviewTextSelect,
        },
      };
      const response = await axios.get("http://localhost:8080/admin/reviews/review", option);
      return response;
    },
    {
      enabled: refresh,
      onSuccess: (response) => {
        setReviews(response.data);
        setRefresh(false);
      },
    }
  );
  const reviewSelectButtonClick = (e) => {
    SetReviewTextSelect(e);
    setRefresh(true);
  };
  const reviewButtonClick = (review) => {
    setSelectReivew({
      reviewId: review.reviewId,
      name: review.name,
      productName: review.productName,
      content: review.content,
    });
    setReviewParams({ reviewId: review.reviewId });

    setModalIsOpen(true);
  };
  const modifyButtonClick = (review) => {
    setSelectModifyReview({
      reviewId: review.reviewId,
      name: review.name,
      productName: review.productName,
      content: review.content,
      reviewContent: review.reviewContent,
    });
    setReviewModifyParams({ reviewId: review.reviewId });

    setModifyModalIsOpen(true);
  };
  const modalCancleClick = () => {
    setSelectReivew({ reviewId: 0, name: "", productName: "", content: "" });
    setReviewParams({ reviewId: 0, content: "" });
    setModifyModalIsOpen(false);
  };
  const modifyModalCancleClick = () => {
    setSelectModifyReview({ reviewId: 0, name: "", productName: "", content: "" });
    setReviewModifyParams({ reviewId: 0, content: "" });
    setModifyModalIsOpen(false);
  };
  const modalReviewContentInput = (e) => {
    setReviewParams({ ...reviewParams, content: e.target.value });
  };
  const modifyModalReviewContentInput = (e) => {
    setReviewModifyParams({ ...reviewModifyParams, content: e.target.value });
  };
  return (
    <>
      {modalIsOpen ? (
        <div css={adminReviewModalContainer}>
          <div css={adminReviewModal}>
            <div css={modalTitle}>
              <div css={modalname}>작성자 : {selectReview.name}</div>
              <div css={modalProductName}>상품명 : {selectReview.productName}</div>
              <div css={modalContent}>리뷰 내용 :{selectReview.content}</div>
            </div>
            <div css={modalbody}>
              <input css={modalreviewContent} onChange={modalReviewContentInput} type="text"></input>
            </div>
            <div css={modalFooter}>
              <button css={reviewbutton} onClick={() => registerReview()}>
                작성
              </button>
              <button css={reviewbutton} onClick={() => modalCancleClick()}>
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {modifyModalIsOpen ? (
        <div css={adminReviewModalContainer}>
          <div css={adminReviewModal}>
            <div css={modalTitle}>
              <div css={modalname}>작성자 : {selectModifyReview.name}</div>
              <div css={modalProductName}>상품명 : {selectModifyReview.productName}</div>
              <div css={modalContent}>리뷰 내용 :{selectModifyReview.content}</div>
              <div css={modalContent}>답변 내용 :{selectModifyReview.reviewContent} </div>
            </div>
            <div css={modalbody}>
              <input css={modalreviewContent} onChange={modifyModalReviewContentInput} type="text"></input>
            </div>
            <div css={modalFooter}>
              <button css={reviewbutton} onClick={() => modifyReview()}>
                수정
              </button>
              <button css={reviewbutton} onClick={() => modifyModalCancleClick()}>
                취소
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div css={cotainer}>
        <div css={reviewReviewContainer}>
          <button css={reveiwSelectButton} onClick={() => reviewSelectButtonClick(0)}>
            답변
          </button>
          <button css={reveiwSelectButton} onClick={() => reviewSelectButtonClick(1)}>
            미답변
          </button>
        </div>
        {reviewTextSelect === 0 ? (
          <>
            <div css={reviewTitleContainer}>
              <div css={reviewNameTitle}>작성자</div>
              <div css={reviewProductNameTitle}>상품 이름</div>
              <div css={reviewContentTitle}>리뷰 내용</div>
              <div css={reviewContentTitle}>답변 내용</div>
              <div css={reviewDate}>작성 날짜</div>
              <div css={inputButtonTitle}>리뷰 수정</div>
            </div>
            {!!reviews ? (
              <>
                {reviews.map((review) => (
                  <div css={reviewContainer}>
                    <div css={reviewName}>{review.name}</div>
                    <div css={reviewProductName}>{review.productName}</div>
                    <div css={reviewContent}>{review.content}</div>
                    <div css={reviewContent}>{review.reviewContent}</div>
                    <div css={reviewDate}>{review.date}</div>
                    <button css={inputButton} onClick={() => modifyButtonClick(review)}>
                      수정
                    </button>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <div css={reviewTitleContainer}>
              <div css={reviewNameTitle}>작성자</div>
              <div css={reviewProductNameTitle}>상품 이름</div>
              <div css={reviewContentTitle}>리뷰 내용</div>
              <div css={reviewDate}>작성 날짜</div>
              <div css={inputButtonTitle}>리뷰 답변</div>
            </div>
            {reviews.map((review) => (
              <div css={reviewContainer}>
                <div css={reviewName}>{review.name}</div>
                <div css={reviewProductName}>{review.productName}</div>
                <div css={reviewContent}>{review.content}</div>
                <div css={reviewDate}>{review.date}</div>
                <button
                  css={inputButton}
                  onClick={() => {
                    reviewButtonClick(review);
                  }}
                >
                  리뷰 작성
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default AdminReviewReview;
