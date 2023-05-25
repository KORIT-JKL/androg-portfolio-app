/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import CommonHeader from '../../../components/CommonHeader/CommonHeader';
import CommonFooter from '../../../components/CommonFooter/CommonFooter';
import { useQuery } from "react-query";
import axios from "axios";

const container = css`
    display: flex;
    justify-content: center;

    height: 500px;
    width: 100%;
    
    `;

const header = css`
    width: 50%;
    height: 5%;
    display: flex;
    align-items: center;
    border: 1px solid black;
`;

const subHeader = css`
    display: flex;
    justify-content: space-between;
    width: 15%;
    margin-right: 100px;
    margin-left: 30px;
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
          enabled: principalState
        });

    const getResponse = useQuery(
        ["getResponse"],
        async () => {
          const option = {
            headers: {
              Authorization: `${localStorage.getItem("accessToken")}`,
            },
          };
          const response = await axios.get(`http://localhost:8080/user/inquiry/answer/${principal.data.data.userId}`, option);
          return response;
        },
        {
          onSuccess: (response) => {
            setResponses(response.data)
          },
        }
      );



    return (
        <>
          <CommonHeader />
            <div css={container}>
                <header css={header}>
                    <div css={subHeader}>
                        <div>순번</div>
                        <div>주문번호</div>
                    </div>
                    <div>답변내용</div>
                </header>
                <main>
                    {!!responses ? (
                        <>
                            {responses.map((response) => (
                                
                                
                                <header css={header}>
                                <div css={subHeader}>
                                    <div>{response.inquiryRespId}</div>
                                    <div>{response.inquiryId}</div>
                                </div>
                                <div>{response.answer}</div>
                                </header>
                                
                            ))}
                        </>
                    ) : ("")}
                </main>
            </div>
          <CommonFooter/>  
        </>
    );
};

export default InquiryResponse;