/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import FAQItem from "./../../SupportUI/Button/FAQItem";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { AdminInquiries, InquiryAnswerState } from "../../../atoms/Admin/AdminAtoms";
import InquiryAnswer from "./InquiryAnswer";

const mainContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const header = css`
  padding: 10px;
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const main = css`
  padding: 10px;
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

const tableStyle = css`
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

const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
  border: 1px solid black;
`;

const inquiryHeader = css`
  display: flex;
  width: 100%;
  height: 20px;
  border: 1px solid #dbdbdb;
`;

const inquiryHeaderSub1 = css`
  display: flex;
  justify-content: space-around;
  width: 40%;
  text-align: center;
`;

const inquiryHeaderSub2 = css`
  display: flex;
  justify-content: space-between;
  width: 53%;
  margin-left: 20px;
`;

const AdminInquiry = () => {
  const [inquiries, setInquiries] = useRecoilState(AdminInquiries);
  const [answerState, setAnswerState] = useRecoilState(InquiryAnswerState);

  const getInquiries = useQuery(
    ["getInquiries"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://localhost:8080/admin/inquiries", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setInquiries(response.data);
      },
    }
  );

  return (
    <>
      {answerState ? <InquiryAnswer /> : ""}
      <div css={mainContainer}>
        <header css={header}>
          <h2>접수문의</h2>
        </header>
        <main css={main}>
          <table css={tableStyle}>
            <thead>
              <tr>
                <th>번호</th>
                <th>회원ID</th>
                <th>주문번호</th>
                <th>문의사항</th>
                <th>문의내용</th>
                <th>접수일시</th>
                <th>답변</th>
              </tr>
            </thead>
            <tbody>
              {!!inquiries ? (
                <>
                  {inquiries.map((inquiry) => (
                    <tr>
                      <td>{inquiry.inquiryId}</td>
                      <td>{inquiry.email}</td>
                      <td>{inquiry.orderId}</td>
                      <td>{inquiry.category}</td>
                      <td>{inquiry.inquiryContent}</td>
                      <td>{inquiry.date}</td>
                      <td>
                        <button
                          onClick={() => {
                            setAnswerState(true);
                          }}
                        >
                          답변하기
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                ""
              )}
            </tbody>
          </table>
        </main>

        {/* <div css={container}>
        <div css={inquiryHeader}>
          <div css={inquiryHeaderSub1}>
            <div>순번</div>
            <div>회원ID</div>
            <div>주문번호</div>
            <div>문의사항</div>
          </div>
          <div css={inquiryHeaderSub2}>
            <div>문의내용</div>
            <div>접수일시</div>
          </div>
        </div>
        {!!inquiries ? (
          <>
            {inquiries.map((inquiry) => (
              <div css={inquiryHeader}>
                <div css={inquiryHeaderSub1}>
                  <div>{inquiry.inquiryId}</div>
                  <div>{inquiry.email}</div>
                  <div>{inquiry.orderId}</div>
                  <div>{inquiry.category}</div>
                </div>
                <div css={inquiryHeaderSub2}>
                  <div>{inquiry.inquiryContent}</div>
                  <div>{inquiry.date}</div>
                </div>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div> */}
      </div>
    </>
  );
};

export default AdminInquiry;
