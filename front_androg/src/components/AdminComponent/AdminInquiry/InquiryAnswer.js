/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { InquiryAnswerState, answerComplete } from "../../../atoms/Admin/AdminAtoms";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

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
    height: 75%;
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
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const InquiryAnswer = ({inquiryId}) => {
  const [answerState, setAnswerState] = useRecoilState(InquiryAnswerState);
  const [answerContent, setAnswerContent] = useState("");


  const navigate = useNavigate();
  console.log(inquiryId);

    const inquiryResponse = useMutation(["inquiryResponse"], async () => {
      const data = {
        inquiryId: inquiryId,
        answer: answerContent,
      };
      const option = {
        headers: {
          "content-type":"application/json",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.post("http://localhost:8080/admin/inquiries/answer", data, option);
      return response;
    });

    const getAnswer = (e) => {
      setAnswerContent(e.target.value);
    }

    const submitAnswer = () => {
      inquiryResponse.mutate();
      alert("답변완료!")
      setAnswerState(false);
    }

  return (
    <div>
      <div css={answerContainer}>
        <div css={answerBox}>
          <header css={header}>
            문의 답변
          </header>
          <main css={main}>
            <textarea css={text} placeholder="답변을 입력해주세요..." onChange={getAnswer}/>
          </main>
          <footer css={footer}>
            <button onClick={submitAnswer}>보내기</button>
            <button onClick={()=>{setAnswerState(false)}}>취소</button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InquiryAnswer;