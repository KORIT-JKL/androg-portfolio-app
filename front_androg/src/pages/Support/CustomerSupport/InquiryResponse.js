/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import CommonHeader from "../../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../../components/CommonFooter/CommonFooter";
import { useQuery } from "react-query";
import axios from "axios";

const container = css`
  display: flex;
  justify-content: center;
`;

const mainContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
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
      line-height: 16.5px;
    }
  }
  th {
    background-color: #f2f2f2;
    font-weight: normal;
  }
`;

const inquiryResponseId = css`
  width: 10%;
`;

const orderId = css`
  width: 10%;
`;

const InquiryResponse = () => {
  const [principalState, setPrincipalState] = useState(false);
  const [responses, setResponses] = useState([]);

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
      onSuccess: () => {
        setPrincipalState(false);
      },
      enabled: principalState,
    }
  );

  const getResponse = useQuery(
    ["getResponse"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/user/inquiry/answer/${principal.data.data.userId}`,
        option
      );
      return response;
    },
    {
      onSuccess: (response) => {
        setResponses(response.data);
      },
    }
  );

  return (
    <>
      <CommonHeader />
      <div css={container}>
        <div css={mainContainer}>
          <header css={header}>
            <h2>문의 답변</h2>
          </header>
          <main css={main}>
            <table css={tableStyle}>
              <thead>
                <tr>
                  <th css={inquiryResponseId}>순번</th>
                  <th css={orderId}>주문번호</th>
                  <th>답변내용</th>
                </tr>
              </thead>
              <tbody>
                {!!responses ? (
                  <>
                    {responses.map((response) => (
                      <>
                        <tr>
                          <td>{response.inquiryRespId}</td>
                          <td>{response.inquiryId}</td>
                          <td>{response.answer}</td>
                        </tr>
                      </>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>

      <CommonFooter />
    </>
  );
};

export default InquiryResponse;
