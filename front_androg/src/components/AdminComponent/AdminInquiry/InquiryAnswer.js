/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { InquiryAnswerState } from "../../../atoms/Admin/AdminAtoms";
import axios from "axios";
import { QueryClient, useMutation, useQueryClient } from "react-query";


const answerContainer = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: normal;
  z-index: 999;
  background-color: #00000099;
  width: 100%;
  height: 100%;
`;

const answerBox = css`
  width: 30%;
  height: 50%;
  margin-top: 50px;
  background-color: white;
  border: 1px solid black;
`;

const header = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  background-color: #dbdbdb;
  font-size: 30px;
  font-weight: 500;
`;

const main = css`
  display: flex;
  flex-direction: column;
  height: 70%;
`;

const text = css`
  height: 100%;
  border-radius: 0;
  outline: none;
  border-left: 0;
  border-right: 0;
  resize: none;
`;

const footer = css`
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
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
const InquiryAnswer = ({ inquiryId }) => {
  const [answerState, setAnswerState] = useRecoilState(InquiryAnswerState);
  const [answerContent, setAnswerContent] = useState("");
  const queryClient = useQueryClient();

  const inquiryResponse = useMutation(
    ["inquiryResponse"],
    async () => {
      const data = {
        inquiryId: inquiryId,
        answer: answerContent,
      };
      const option = {
        headers: {
          "content-type": "application/json",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.post(
        "http://localhost:8080/admin/inquiries/answer",
        data,
        option
      );
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          
          alert("문의답변 완료");
          queryClient.fetchQuery('getInquiries');
        }
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    }
  );

  const getAnswer = (e) => {
    setAnswerContent(e.target.value);
  };

  const submitAnswer = () => {
    inquiryResponse.mutate();
    setAnswerState(false);
  };

  return (
    <div>
      <div css={answerContainer}>
        <div css={answerBox}>
          <header css={header}>문의 답변</header>
          <main css={main}>
            <textarea css={text} placeholder="답변을 입력해주세요...200자" onChange={getAnswer} />
          </main>
          <footer css={footer}>
            <button css={modalButtonStyle} onClick={submitAnswer}>
              보내기
            </button>
            <button
              css={modalButtonStyle}
              onClick={() => {
                setAnswerState(false);
              }}
            >
              취소
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InquiryAnswer;
