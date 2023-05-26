/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useRef, useState } from "react";
import FAQItem from "./../../SupportUI/Button/FAQItem";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { AdminInquiries, InquiryAnswerState, answerComplete, disabledState } from "../../../atoms/Admin/AdminAtoms";
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

const AdminInquiry = () => {
  const [inquiries, setInquiries] = useRecoilState(AdminInquiries);
  const [answerState, setAnswerState] = useRecoilState(InquiryAnswerState);
  const [selectedInquiryId, setSelectedInquiryId] = useState(0);
  const [disabled1, setDisabled] = useRecoilState(disabledState);

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
      {answerState ? <InquiryAnswer inquiryId={selectedInquiryId} /> : ""}
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
                            setSelectedInquiryId(inquiry.inquiryId);
                            setAnswerState(true);
                            setDisabled({ ...disabled1, id: inquiry.inquiryId });
                          }}
                          disabled={inquiry.inquiryId === disabled1.id ? true : false}
                        >
                          답변하기
                        </button>
                        <button disabled>삭제</button>
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
      </div>
    </>
  );
};

export default AdminInquiry;
