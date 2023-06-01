/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const oauth2 = (provider) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 40px;
    margin: 10px;
    border: 1px solid black;
    width: 400px;
    height: 40px;
    font-size: 15px;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
        background-color: #848484;
        font-weight: 600;
    }
`;

const oauth2Text = css`
    padding-right: 20px;
`;

const OAuth2Button = ({ provider, children }) => {
    const onClickHandle = (provider) => {
        if (provider === "google") {
            window.location.href = "http://localhost:8080/oauth2/authorization/google";
        } else if (provider === "naver") {
            window.location.href = "http://localhost:8080/oauth2/authorization/naver";
        } else if (provider === "kakao") {
            window.location.href = "http://localhost:8080/oauth2/authorization/kakao";
        }
    };

    return (
        <div css={oauth2(provider)} onClick={() => onClickHandle(provider)}>
            {children}
            <div css={oauth2Text}> Sign in with {provider}</div>
        </div>
    );
};

export default OAuth2Button;
